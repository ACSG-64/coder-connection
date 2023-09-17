import { SkillDTO } from '@/backend/core/shared/dtos/skill-dto'
import { TimeZoneDTO } from '@/backend/core/shared/dtos/time-zone-dto'

type params = {
    name: string
    surname: string
    description: string
    timeZone: TimeZoneDTO
    linkedInUrl?: string
    competencies: SkillDTO[]
    interests: SkillDTO[]
}

export class ProfileInternalAttributes {
    public readonly name: string
    public readonly surname: string
    public readonly description: string
    public readonly timeZone: TimeZoneDTO
    public readonly linkedInUrl?: string
    public readonly competencies: SkillDTO[]
    public readonly interests: SkillDTO[]

    constructor({
        name,
        surname,
        description,
        timeZone,
        linkedInUrl = '',
        competencies = [],
        interests = []
    }: params) {
        this.name = name
        this.surname = surname
        this.description = description
        this.timeZone = timeZone
        this.linkedInUrl = linkedInUrl
        this.competencies = competencies
        this.interests = interests
    }
}
