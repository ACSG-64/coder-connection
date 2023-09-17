import { ProjectIdeaTagDTO } from '@/backend/core/shared/dtos/project-idea-tag-dto'
import { SkillDTO } from '@/backend/core/shared/dtos/skill-dto'
import { Match } from '../models/match'
import { Applicant } from '../models/applicant'

export interface IGroupMatchingApplicationsRepository {
    add(
        userId: string,
        projectIdeas: ProjectIdeaTagDTO[],
        skills: SkillDTO[]
    ): Promise<number>

    getMatches(
        applicationId: number,
        minimumProjects: number,
        minimumSkills: number,
        groupSize: number
    ): Promise<Match[]>

    getApplicant(applicationId: string): Promise<Applicant | null>
    getApplicants(): Promise<Applicant[]>

    checkApplicantExistence(userId: string): Promise<boolean>

    update(
        applicationId: string,
        projectIdeas: ProjectIdeaTagDTO[],
        skills: SkillDTO[]
    ): Promise<void>

    delete(applicationId: string): Promise<void>
}
