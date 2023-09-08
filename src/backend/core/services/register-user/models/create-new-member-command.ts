import * as z from 'zod'
import { newUserForm } from '../schemas/new-user-form'
import CustomError from '@/backend/constants/custom-error'
import { TimeZoneDTO } from '@/backend/core/shared/dtos/time-zone-dto'

const validator = newUserForm.extend({
    userId: z.string().trim().length(36)
})

export class CreateNewMemberCommand {
    public readonly userId: string
    public readonly name: string
    public readonly surname: string
    public readonly timeZone: TimeZoneDTO
    public readonly slackId: string
    public readonly verificationCode: string

    constructor(
        userId: string,
        name: string,
        surname: string,
        timeZone: TimeZoneDTO,
        slackId: string,
        verificationCode: string
    ) {
        const v = validator.safeParse({
            userId,
            name,
            surname,
            timeZone: { id: timeZone.id, name: timeZone.name },
            slackId,
            verificationCode
        })
        if (!v.success) throw new CustomError(400, 'Invalid fields')

        this.userId = v.data.userId
        this.name = v.data.name
        this.surname = v.data.surname
        this.timeZone = new TimeZoneDTO(
            v.data.timeZone.id,
            v.data.timeZone.name
        )
        this.slackId = v.data.slackId
        this.verificationCode = v.data.verificationCode
    }
}
