import * as z from 'zod'
import { projectIdeaFormSchema } from '../schemas/project-idea-form'
import CustomError from '@/backend/constants/custom-error'
import { TopicDTO } from '@/backend/core/shared/dtos/topic-dto'

const schema = projectIdeaFormSchema
    .omit({
        features: true
    })
    .extend({
        authorId: z.string().length(36),
        features: z.array(z.string().trim().min(5).max(50)).min(3).max(10)
    })

export class CreateProjectIdeaProposalCommand {
    public readonly authorId: string
    public readonly title: string
    public readonly summary: string
    public readonly content: string
    public readonly features: string[]
    public readonly topics: TopicDTO[]

    constructor(
        authorId: string,
        title: string,
        summary: string,
        content: string,
        features: string[],
        topics: TopicDTO[]
    ) {
        const v = schema.safeParse({
            authorId,
            title,
            summary,
            content,
            features,
            topics: topics.map(({ id, name }) => ({ id, name }))
        })
        if (!v.success) throw new CustomError(400, 'Invalid fields')

        this.authorId = v.data.authorId
        this.title = v.data.title
        this.summary = v.data.summary
        this.content = v.data.content
        this.features = v.data.features
        this.topics = v.data.topics
    }
}
