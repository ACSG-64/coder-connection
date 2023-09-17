import { inject, injectable } from 'inversify'
import { ManageApplicationUseCase } from '../use-cases/manage-application-use-case'
import type { IGroupMatchingApplicationsRepository } from '../repositories/i-group-matching-application-repository'
import TYPES from '@/backend/configuration/di-types/group-matching/TYPES'
import { CreateApplicationCommand } from '../models/create-application-command'
import { SlackApp } from '@/backend/infrastructure/connectors/network/slack-app'
import { Match } from '../models/match'
import { customAlphabet } from 'nanoid'
import { Applicant } from '../models/applicant'
import { GetApplicantsUseCase } from '../use-cases/get-applicants-use-case'
import { RetireApplicationCommand } from '../models/retire-application-command'
const nanoid = customAlphabet('123456789qwertyuiopasdfghjklzxcvbnm', 10)

@injectable()
export class GroupMatchingController
    implements ManageApplicationUseCase, GetApplicantsUseCase
{
    constructor(
        @inject(TYPES.IGroupMatchingApplicationsRepository)
        private readonly groupMatchingRepo: IGroupMatchingApplicationsRepository
    ) {}

    async apply(cmd: CreateApplicationCommand) {
        const { userId, skills, projectIdeas } = cmd
        const applicantId = await this.groupMatchingRepo.add(
            userId,
            projectIdeas,
            skills
        )
        await this.pairApplicant(applicantId)
        return applicantId
    }

    retrieve() {
        return this.groupMatchingRepo.getApplicants()
    }

    async retire({ userId, applicationId }: RetireApplicationCommand) {
        if (await this.groupMatchingRepo.checkApplicantExistence(userId)) {
            await this.groupMatchingRepo.delete(applicationId)
        }
    }

    private async pairApplicant(applicantId: number) {
        const GROUP_SIZE = Number(process.env.GROUP_MATCHING_GROUP_SIZE) ?? 4
        const MINIMUM_SKILLS =
            Number(process.env.GROUP_MATCHING_MINIMUM_SKILLS) ?? 3
        const MINIMUM_PROJECTS =
            Number(process.env.GROUP_MATCHING_MINIMUM_PROJECTS) ?? 1
        const matches = await this.groupMatchingRepo.getMatches(
            applicantId,
            MINIMUM_PROJECTS,
            MINIMUM_SKILLS,
            GROUP_SIZE
        )
        try {
            if (matches.length >= GROUP_SIZE) {
                await this.onboardCandidates(matches.slice(0, GROUP_SIZE))
            }
        } catch (error) {
            console.error(error)
        }
    }

    private async onboardCandidates(matches: Match[]) {
        // Get users
        const applicants = await Promise.all(
            matches.map((match) =>
                this.groupMatchingRepo.getApplicant(match.id)
            )
        )
        // Return if an applicant is not found
        if (applicants.some((applicant) => !applicant)) return
        // Create a private channel
        const CHANNEL_NAME = `group-matching-${nanoid()}`
        const channel = await SlackApp.instance.conversations.create({
            name: CHANNEL_NAME,
            is_private: true
        })
        if (!channel || !channel.channel) return
        const channelId = channel.channel.id!
        // Add users to that channel
        await SlackApp.instance.conversations.invite({
            channel: channelId,
            users: applicants.map((applicant) => applicant?.slackId).join(',')
        })

        /*
         * Since the critical steps were finished, the following steps are not
         * critical and can be done asynchronously
         */
        // Send a message in that channel commenting about the details of the application of each member
        sendNotificationToChannel(channelId, applicants as Applicant[])
        // Remove applicants
        matches.map((match) => this.groupMatchingRepo.delete(match.id!))
        return
    }
}

async function sendNotificationToChannel(
    channelId: string,
    applicants: Applicant[]
) {
    await SlackApp.instance.chat.postMessage({
        channel: channelId,
        text: `This is a group matching channel. The following are the details of the applicants:`,
        blocks: [
            {
                type: 'header',
                text: {
                    type: 'plain_text',
                    text: 'Team matching service'
                }
            },
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: '<!channel> You have been matched because you selected shared interests among yourselves. Listed below are the selections that each of you selected:'
                }
            },
            ...applicants.map((applicant) => ({
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text:
                        `*${applicant?.name} ${applicant?.surname} (${applicant?.username}):* \n` +
                        `_Project ideas:_ ${applicant?.projectIdeas
                            .map((project) => project.name)
                            .join(', ')} \n` +
                        `_Skills:_ ${applicant?.skills
                            .map((skill) => skill.name)
                            .join(', ')}`
                }
            })),
            { type: 'divider' },
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text:
                        'We suggest that you introduce yourselves and get to know each ' +
                        'other better. Then decide which project idea to work on and finally ' +
                        'one of you create a group to start implementing the project.'
                }
            },
            {
                type: 'divider'
            },
            {
                type: 'context',
                elements: [
                    {
                        type: 'mrkdwn',
                        text: '_This an automated message._'
                    }
                ]
            }
        ]
    })
}
