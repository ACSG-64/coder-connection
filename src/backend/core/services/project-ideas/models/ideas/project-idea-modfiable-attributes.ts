import { TopicDTO } from '@/backend/core/shared/dtos/topic-dto'

export class ProjectIdeaModifiableAttributes {
    constructor(
        public readonly title: string,
        public readonly summary: string,
        public readonly topics: TopicDTO[]
    ) {}
}
