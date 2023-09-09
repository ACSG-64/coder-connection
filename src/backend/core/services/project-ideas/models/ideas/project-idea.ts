import { TopicDTO } from '@/backend/core/shared/dtos/topic-dto'
import { ProjectIdeaDetails } from './project-idea-details'

export class ProjectIdea extends ProjectIdeaDetails {
    constructor(
        ghId: number,
        ghNodeId: string,
        title: string,
        summary: string,
        topics: TopicDTO[],
        slackChannelId: string,
        public readonly isPublic: string,
        public readonly contents: string
    ) {
        super(ghId, ghNodeId, title, summary, topics, slackChannelId)
    }

    get slackUrl() {
        const baseUrl = process.env.SLACK_WORKSPACE_URL as string
        return `${baseUrl}/archives/${this.slackChannelId}`
    }
}
