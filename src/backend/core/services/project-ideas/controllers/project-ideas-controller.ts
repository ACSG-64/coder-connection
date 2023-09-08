import { inject, injectable } from 'inversify'
import type { IProjectIdeaProposalsRepository } from '../repositories/i-project-idea-proposals-repository'
import TYPES from '@/backend/configuration/di-types/project-ideas/TYPES'
import type { IProjectIdeasRepository } from '../repositories/i-project-ideas-repository'
import { SlackApp } from '@/backend/infrastructure/connectors/network/slack-app'
import { TopicsDAO } from '@/backend/infrastructure/daos/topics-dao'
import { ProjectIdeaAttributes } from '../models/ideas/project-idea-attributes'
import { ProjectIdeaGH } from '../models/ideas/project-idea-gh'
import { ProjectIdeaDetails } from '../models/ideas/project-idea-details'
import {
    EVENTS,
    ManageProjectIdeaUseCase
} from '../use-cases/manage-project-idea-use-case'

@injectable()
export class ProjectIdeasController implements ManageProjectIdeaUseCase {
    constructor(
        @inject(TYPES.IProjectIdeaProposalsRepository)
        private readonly projectIdeaProposalsRepo: IProjectIdeaProposalsRepository,
        @inject(TYPES.IProjectIdeasRepository)
        private readonly projectIdeasRepo: IProjectIdeasRepository
    ) {}

    async manage(event: EVENTS, idea: ProjectIdeaGH): Promise<void> {
        switch (event) {
            case EVENTS.CREATE_OR_UNHIDE:
                if (await this.projectIdeasRepo.checkIfExists(idea.ghId)) {
                    this.makeVisible(idea)
                } else this.publish(idea)
                break
            case EVENTS.CRATE:
                this.publish(idea)
                break
            case EVENTS.DELETE:
                this.delete(idea)
                break
            case EVENTS.UPDATE:
                this.update(idea)
                break
            case EVENTS.HIDE:
                this.makeHidden(idea)
                break
            case EVENTS.UNHIDE:
                this.makeVisible(idea)
                break
        }
    }

    private async publish(idea: ProjectIdeaGH) {
        const { ghId, ghNodeId, summary } = idea
        const title = this.formatName(idea.title)
        // Check if there is already a draft
        if (!(await this.projectIdeaProposalsRepo.get(idea.ghId))) return
        // Check if the idea doesn't exist yet
        if (
            (await this.projectIdeasRepo.checkIfExists(ghId)) ||
            (await this.projectIdeasRepo.checkIfExists(title))
        ) {
            return
        }
        // Create the Slack channel
        const CHANNEL_NAME = `pj-${idea.title}-${idea.ghId}`
            .toLowerCase()
            .replace(' ', '-')
        const channelRes = await SlackApp.instance.conversations.create({
            name: CHANNEL_NAME
        })
        if (!channelRes.channel || !channelRes.channel.id) return
        // Create the project idea
        const topics = await new TopicsDAO().getByNames(idea.topics)
        const project = new ProjectIdeaDetails(
            ghId,
            ghNodeId,
            title,
            summary,
            topics,
            channelRes.channel.id
        )
        try {
            await this.projectIdeasRepo.create(project)
        } catch (e) {
            await SlackApp.instance.conversations.archive({
                channel: channelRes.channel.id
            })
        }
    }

    private async update(idea: ProjectIdeaGH) {
        const { ghId, summary } = idea
        const title = this.formatName(idea.title)
        // Create the project idea
        const topics = await new TopicsDAO().getByNames(idea.topics)
        const project = new ProjectIdeaAttributes(title, summary, topics)
        await this.projectIdeasRepo.update(ghId, project)
    }

    private async delete(idea: ProjectIdeaGH) {
        const slackId = await this.projectIdeasRepo.getSlackId(idea.ghId)
        // Delete the project
        const success = await this.projectIdeasRepo.delete(idea.ghId)
        if (!success) {
            // Delete the project proposal
            await this.projectIdeaProposalsRepo.delete(idea.ghId)
            return
        }
        // Archive the associated Slack channel (manual deletion is required)
        if (!slackId) return
        SlackApp.instance.conversations.archive({ channel: slackId })
    }

    private async makeVisible(idea: ProjectIdeaGH) {
        const slackId = await this.projectIdeasRepo.getSlackId(idea.ghId)
        await this.projectIdeasRepo.unhide(idea.ghId)
        // Unarchive the associated Slack channel
        if (!slackId) return
        SlackApp.instance.conversations.unarchive({ channel: slackId })
    }

    private async makeHidden(idea: ProjectIdeaGH) {
        const slackId = await this.projectIdeasRepo.getSlackId(idea.ghId)
        await this.projectIdeasRepo.hide(idea.ghId)
        // Archive the associated Slack channel
        if (!slackId) return
        SlackApp.instance.conversations.archive({ channel: slackId })
    }

    private formatName(name: string) {
        return name.replaceAll('-', ' ').replaceAll(/\s+/g, ' ')
    }
}
