import CustomError from '@/backend/constants/custom-error'
import * as z from 'zod'

const validator = z.object({
    userId: z.string().trim().length(36),
    slackId: z.string().trim().min(1).max(20).startsWith('U')
})

export class GenerateCodeCommand {
    private fields: z.infer<typeof validator>

    constructor(userId: string, slackId: string) {
        const v = validator.safeParse({ userId, slackId })
        if (!v.success) throw new CustomError(400, 'Invalid fields')
        this.fields = v.data
    }

    get userId() {
        return this.fields.userId
    }

    get slackId() {
        return this.fields.slackId
    }
}
