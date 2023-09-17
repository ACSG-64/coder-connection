import { SkillDTO } from '@/backend/core/shared/dtos/skill-dto'
import { TimeZoneDTO } from '@/backend/core/shared/dtos/time-zone-dto'

type params = {
    name: string
    surname: string
    description: string
    linkedInUrl?: string
    competencies: SkillDTO[]
    interests: SkillDTO[]
    username: string
    gitHubProfileUrl: string
    profileImg?: string
    timeZone: TimeZoneDTO
    slackId: string
}

export class ProfileDetails {
    public readonly name: string
    public readonly surname: string
    public readonly description: string
    public readonly linkedInUrl?: string
    public readonly competencies: SkillDTO[]
    public readonly interests: SkillDTO[]
    public readonly username: string
    public readonly gitHubProfileUrl: string
    public readonly profileImg: string
    public readonly timeZone: TimeZoneDTO
    public readonly slackId: string

    constructor({
        name,
        surname,
        description,
        linkedInUrl = '',
        competencies = [],
        interests = [],
        username,
        gitHubProfileUrl,
        profileImg = '',
        timeZone,
        slackId
    }: params) {
        this.name = name
        this.surname = surname
        this.description = description
        this.linkedInUrl = linkedInUrl
        this.competencies = competencies
        this.interests = interests
        this.username = username
        this.gitHubProfileUrl = gitHubProfileUrl
        this.profileImg = profileImg
        this.timeZone = timeZone
        this.slackId = slackId
    }

    get slackProfileUrl() {
        return `${process.env.SLACK_WORKSPACE_URL}/team/${this.slackId}`
    }
}
