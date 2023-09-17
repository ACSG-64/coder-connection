import * as z from 'zod'

const projectIdeasSchema = z.object({
    id: z.number().int().nonnegative(),
    name: z.string().trim().max(200)
})

const skillsSchema = z.object({
    id: z.number().int().nonnegative(),
    name: z.string().trim().max(50)
})

export const groupMatchingFormSchema = z.object({
    projectIdeas: z.array(projectIdeasSchema).min(1).max(3),
    skills: z.array(skillsSchema).length(5)
})
