import * as z from 'zod'
import { newUserForm } from '../schemas/new-user-form'
import CustomError from '@/backend/constants/custom-error'

const validator = newUserForm.extend({
    userId: z.string().trim().length(36)
})

export class CreateNewMemberCommand {
    private fields: z.infer<typeof validator>

    constructor(
        userId: string,
        name: string,
        surname: string,
        slackId: string,
        providedCode: string
    ) {
        const v = validator.safeParse({
            userId,
            name,
            surname,
            slackId,
            verificationCode: providedCode
        })
        if (!v.success) throw new CustomError(400, 'Invalid fields')

        this.fields = v.data
    }

    get userId() {
        return this.fields.userId
    }

    get name() {
        return this.fields.name
    }

    get surname() {
        return this.fields.surname
    }

    get slackId() {
        return this.fields.slackId
    }

    get providedCode() {
        return this.fields.verificationCode
    }
}
