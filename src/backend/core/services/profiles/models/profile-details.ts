import { SkillDTO } from '@/backend/core/shared/dtos/skill-dto'
import { profileFormSchema } from '../schemas/profile-form-schema'

export class ProfileDetails {
    public readonly name: string
    public readonly surname: string
    public readonly description: string
    public readonly linkedInUrl?: string
    public readonly competencies: SkillDTO[]
    public readonly interests: SkillDTO[]

    constructor(
        name: string,
        surname: string,
        description: string,
        linkedInUrl: string = '',
        skills: SkillDTO[] = [],
        interests: SkillDTO[] = []
    ) {
        const v = profileFormSchema.parse({
            name,
            surname,
            description,
            linkedInUrl,
            skills: skills.map(({ id, name }) => ({ id, name })),
            interests: interests.map(({ id, name }) => ({ id, name }))
        })

        this.name = v.name
        this.surname = v.surname
        this.description = v.description
        this.linkedInUrl = v.linkedInUrl
        this.competencies = v.skills
        this.interests = v.interests
    }
}
