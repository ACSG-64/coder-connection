import * as z from 'zod'

const featureSchema = z.object({
    feature: z.string().trim().min(5).max(50)
})

const topicSchema = z.object({
    id: z.number().int().nonnegative(),
    name: z.string()
})

export const projectIdeaFormSchema = z.object({
    title: z.string().trim().min(2).max(32),
    summary: z.string().trim().min(8).max(100),
    content: z.string().trim().min(10).max(500),
    features: z.array(featureSchema).min(3).max(10),
    topics: z.array(topicSchema).min(1).max(5)
})
