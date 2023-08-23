import * as z from 'zod'

export const newUserForm = z.object({
    name: z.string().trim().min(2).max(25),
    surname: z.string().trim().min(2).max(25),
    slackId: z.string().trim().min(1).max(20).startsWith('U'),
    verificationCode: z.string().trim().min(1).max(10)
})
