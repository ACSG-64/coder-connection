import { TopicDTO } from '@/backend/core/shared/dtos/topic-dto'
import orm from '../connectors/database/sequelize'
import {
    ProjectIdea as _ProjectIdea,
    TopicProject,
    User
} from '../sequelize/models'
import { IProjectIdeasRepository } from '@/backend/core/services/project-ideas/repositories/i-project-ideas-repository'
import { injectable } from 'inversify'
import { ProjectIdeaAttributes } from '@/backend/core/services/project-ideas/models/ideas/project-idea-attributes'
import { Op } from 'sequelize'
import { GitHubApp } from '../connectors/network/github-app'
import { ProjectIdeaDetails } from '@/backend/core/services/project-ideas/models/ideas/project-idea-details'

@injectable()
export class ProjectIdeasRepository implements IProjectIdeasRepository {
    constructor() {
        orm.addModels([User, _ProjectIdea, TopicProject])
    }

    async create(project: ProjectIdeaDetails): Promise<number> {
        const {
            ghId: id,
            ghNodeId: nodeId,
            title,
            summary,
            topics,
            slackChannelId
        } = project

        let projectIdeaId: number
        // Insert the records on the database
        const t = await orm.transaction()
        try {
            ;({ id: projectIdeaId } = await _ProjectIdea.create(
                {
                    id,
                    nodeId,
                    name: title,
                    summary,
                    slackChannelId
                },
                { transaction: t }
            ))
            // Assign the topics
            await TopicProject.bulkCreate(
                topics.map(({ id: topicId }) => ({ topicId, projectIdeaId })),
                { ignoreDuplicates: true, transaction: t }
            )
            await t.commit()
        } catch (e) {
            t.rollback()
            throw e
        }

        return projectIdeaId
    }

    async get(id: number) {}

    async getSummary(id: number) {}

    async getSlackId(ideaId: number) {
        const result = await _ProjectIdea.findByPk(ideaId, {
            attributes: ['slackChannelId']
        })
        return result?.slackChannelId
    }

    async update(id: number, attributes: ProjectIdeaAttributes) {
        if (!(await this.checkIfExists(id))) return
        const { title, summary, topics } = attributes
        const topicsIds = topics.map(({ id }) => id)
        console.log('topicsIds', topicsIds)

        /* Topics to delete */
        // Queries
        const topicsToDeleteRes = await TopicProject.findAll({
            where: {
                projectIdeaId: id,
                topicId: { [Op.notIn]: topicsIds }
            }
        })
        //console.log('topicsToDeleteRes', topicsToDeleteRes[0].)
        // Selection
        const topicsToDelete = topicsToDeleteRes.map(({ topicId }) => topicId)
        console.log('topicsToDelete', topicsToDelete)

        /* Topics to add */
        // Queries
        const sharedTopics = await TopicProject.findAll({
            where: {
                projectIdeaId: id,
                topicId: { [Op.in]: topicsIds }
            }
        })
        console.log('sharedTopics', sharedTopics, Object.keys(sharedTopics))
        // Union
        const sharedTopicsSet = new Set(
            sharedTopics.map(({ topicId }) => topicId)
        )
        // Selection
        const topicsToAdd = topicsIds.filter((id) => !sharedTopicsSet.has(id))
        console.log('topicsToAdd', topicsToAdd)

        /* Update data */
        await orm.transaction(async (t) => {
            await Promise.all([
                // Details
                _ProjectIdea.update(
                    { name: title, summary },
                    { where: { id }, transaction: t }
                ),
                // Topics
                TopicProject.destroy({
                    where: {
                        projectIdeaId: id,
                        topicId: { [Op.in]: topicsToDelete }
                    },
                    transaction: t
                }),
                TopicProject.bulkCreate(
                    topicsToAdd.map((topicId) => ({
                        projectIdeaId: id,
                        topicId
                    })),
                    { transaction: t }
                )
            ])
        })
    }

    async checkIfExists(id: number): Promise<boolean>
    async checkIfExists(name: string): Promise<boolean>
    async checkIfExists(search: string | number): Promise<boolean> {
        switch (typeof search) {
            case 'string': {
                const res = await _ProjectIdea.findOne({
                    attributes: ['id'],
                    where: { name: search }
                })
                return res != null
            }
            case 'number': {
                const res = await _ProjectIdea.findByPk(search, {
                    attributes: ['id']
                })
                return res != null
            }
            default:
                return false
        }
    }

    async delete(id: number) {
        const p = await _ProjectIdea.destroy({ where: { id }, force: true })
        return p > 0
    }

    async hide(id: number) {
        await _ProjectIdea.update({ isPublic: false }, { where: { id } })
    }

    async unhide(id: number) {
        await _ProjectIdea.update({ isPublic: true }, { where: { id } })
    }

    private async getReadme(ghNodeId: number) {
        const ghApp = await GitHubApp.instance
        const res = await ghApp.graphql<{ node: { object: { text: string } } }>(
            `
            query ($nodeId: ID!) {
                node(id: $nodeId) {
                    ... on Repository {
                        object(expression: "master:README.md") {
                            ... on Blob {
                                text
                            }
                        }
                    }
                }
            }`,
            { nodeId: ghNodeId }
        )
        const readmeBase64 = res.node.object.text ?? ''
        return Buffer.from(readmeBase64, 'base64').toString('utf-8')
    }
}
