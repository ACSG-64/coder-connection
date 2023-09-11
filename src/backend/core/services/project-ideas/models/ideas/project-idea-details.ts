import { TopicDTO } from '@/backend/core/shared/dtos/topic-dto'
import { ProjectIdeaCommon } from './abstract/project-idea-common'

export class ProjectIdeaDetails extends ProjectIdeaCommon<TopicDTO> {
    constructor(
        ghId: number,
        ghNodeId: string,
        title: string,
        summary: string,
        topics: TopicDTO[],
        public readonly slackChannelId: string
    ) {
        super(ghId, ghNodeId, title, summary, topics)
    }
}
