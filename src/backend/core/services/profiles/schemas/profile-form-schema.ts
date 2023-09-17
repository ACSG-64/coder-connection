import * as z from 'zod'

const skillsSchema = z.object({
    id: z.number().int().nonnegative(),
    name: z.string()
})

const interestSchema = z.object({
    id: z.number().int().nonnegative(),
    name: z.string()
})

const linkedinUrlStart = 'https://www.linkedin.com/in/'
export const profileFormSchema = z.object({
    name: z.string().trim().min(2).max(25),
    surname: z.string().trim().min(2).max(25),
    description: z.string().trim().min(0).max(500),
    timeZone: z
        .object({
            id: z.number().int().nonnegative(),
            name: z.string().trim().min(5)
        })
        .required(),
    linkedInUrl: z
        .union([
            z
                .string()
                .url()
                .startsWith(linkedinUrlStart)
                .min(linkedinUrlStart.length + 1)
                .max(200),
            z.literal('')
        ])
        .optional(),
    skills: z.array(skillsSchema).max(15),
    interests: z.array(interestSchema).max(15)
})
