import { SkillDTO } from '@/backend/core/shared/dtos/skill-dto'
import { profileFormSchema } from '../schemas/profile-form-schema'
import { TimeZoneDTO } from '@/backend/core/shared/dtos/time-zone-dto'

export class UpdateProfileCommand {
    public readonly name: string
    public readonly surname: string
    public readonly description: string
    public readonly timeZone: TimeZoneDTO
    public readonly linkedInUrl?: string
    public readonly competencies: SkillDTO[]
    public readonly interests: SkillDTO[]

    constructor(
        public readonly userId: string,
        name: string,
        surname: string,
        description: string,
        timeZone: TimeZoneDTO,
        linkedInUrl: string = '',
        skills: SkillDTO[] = [],
        interests: SkillDTO[] = []
    ) {
        const v = profileFormSchema.parse({
            name,
            surname,
            description,
            timeZone: { ...timeZone },
            linkedInUrl,
            skills: skills.map(({ id, name }) => ({ id, name })),
            interests: interests.map(({ id, name }) => ({ id, name }))
        })
        this.name = v.name
        this.surname = v.surname
        this.description = v.description
        this.timeZone = v.timeZone
        this.linkedInUrl = v.linkedInUrl
        this.competencies = v.skills
        this.interests = v.interests
    }
}
