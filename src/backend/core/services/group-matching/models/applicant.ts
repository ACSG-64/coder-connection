import { ProjectIdeaTagDTO } from '@/backend/core/shared/dtos/project-idea-tag-dto'
import { SkillDTO } from '@/backend/core/shared/dtos/skill-dto'

type params = {
    applicationId: string
    userId: string
    name: string
    surname: string
    username: string
    slackId: string
    projectIdeas: ProjectIdeaTagDTO[]
    skills: SkillDTO[]
}

export class Applicant {
    public readonly applicationId: string
    public readonly userId: string
    public readonly name: string
    public readonly surname: string
    public readonly username: string
    public readonly slackId: string
    public readonly projectIdeas: ProjectIdeaTagDTO[]
    public readonly skills: SkillDTO[]

    constructor({
        applicationId,
        userId,
        name,
        surname,
        username,
        slackId,
        projectIdeas,
        skills
    }: params) {
        this.applicationId = applicationId
        this.userId = userId
        this.name = name
        this.surname = surname
        this.username = username
        this.slackId = slackId
        this.projectIdeas = projectIdeas
        this.skills = skills
    }
}
