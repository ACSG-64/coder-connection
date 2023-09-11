import { TopicDTO } from '@/backend/core/shared/dtos/topic-dto'

export class ProjectIdeaProposal {
    constructor(
        public readonly title: string,
        public readonly summary: string,
        public readonly content: string,
        public readonly topics: TopicDTO[]
    ) {}
}
