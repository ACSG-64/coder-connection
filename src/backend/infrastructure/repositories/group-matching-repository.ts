import { ProjectIdeaTagDTO } from '@/backend/core/shared/dtos/project-idea-tag-dto'
import { SkillDTO } from '@/backend/core/shared/dtos/skill-dto'
import orm from '@/backend/infrastructure/connectors/database/sequelize'
import { QueryTypes, Transaction } from 'sequelize'
import {
    GroupMatchingApplication,
    GroupMatchingProjectIdea,
    GroupMatchingSkill,
    ProjectIdea,
    Skill,
    User
} from '../sequelize/models'
import { CustomError } from '@/constants/custom-error'
import ErrorCodes from '@/constants/error-codes'
import { IGroupMatchingApplicationsRepository } from '@/backend/core/services/group-matching/repositories/i-group-matching-application-repository'
import { Match } from '@/backend/core/services/group-matching/models/match'
import { Applicant } from '@/backend/core/services/group-matching/models/applicant'
import { injectable } from 'inversify'

@injectable()
export class GroupMatchingApplicationsRepository
    implements IGroupMatchingApplicationsRepository
{
    constructor() {
        orm.addModels([
            GroupMatchingApplication,
            GroupMatchingProjectIdea,
            GroupMatchingSkill,
            User,
            ProjectIdea,
            Skill
        ])
    }

    async getApplicant(applicationId: string) {
        const result = await GroupMatchingApplication.findByPk(applicationId, {
            attributes: ['id', 'userId'],
            include: [
                {
                    model: User,
                    attributes: ['name', 'surname', 'username', 'slackId']
                },
                { model: ProjectIdea, attributes: ['id', 'name'] },
                { model: Skill, attributes: ['id', 'name'] }
            ]
        })
        if (!result) return null
        return this.formaResultToApplicant(result)
    }

    async getApplicants() {
        const result = await GroupMatchingApplication.findAll({
            attributes: ['id', 'userId'],
            include: [
                {
                    model: User,
                    attributes: ['name', 'surname', 'username', 'slackId']
                },
                { model: ProjectIdea, attributes: ['id', 'name'] },
                { model: Skill, attributes: ['id', 'name'] }
            ]
        })

        return result.map((result) => this.formaResultToApplicant(result))
    }

    async getMatches(
        applicationId: number,
        minimumProjects: number,
        minimumSkills: number,
        groupSize: number
    ) {
        const matchSkills = (await orm.query(
            `SELECT 
                gms."applicationId",
                gms."skillId"
            FROM "GroupMatchingSkills" gms
            INNER JOIN (
                SELECT DISTINCT "skillId"
                FROM "GroupMatchingSkills"
                WHERE "applicationId" = :applicationId
            ) AS ss ON gms."skillId" = ss."skillId"
            WHERE "applicationId" <> :applicationId;
            `,
            { replacements: { applicationId }, type: QueryTypes.SELECT }
        )) as { applicationId: number; skillId: number }[]
        if (matchSkills.length < minimumSkills) return []

        const matchProjects = (await orm.query(
            `SELECT 
                gmpi."applicationId",
                gmpi."projectIdeaId"
            FROM "GroupMatchingProjectIdeas" gmpi
            INNER JOIN (
                SELECT DISTINCT "projectIdeaId"
                FROM "GroupMatchingProjectIdeas"
                WHERE "applicationId" = :applicationId
            ) AS spi ON gmpi."projectIdeaId" = spi."projectIdeaId"
            WHERE "applicationId" <> :applicationId;             
            `,
            { replacements: { applicationId }, type: QueryTypes.SELECT }
        )) as { applicationId: number; projectIdeaId: number }[]
        if (matchProjects.length < minimumProjects) return []

        const matches = (await orm.query(
            `SELECT 
                id, 
                "userId"
            FROM "GroupMatchingApplications" gma
            WHERE 
                id IN (:matchProjects) AND 
                id IN (:matchSkills)`,
            {
                replacements: {
                    matchProjects: matchProjects.map(
                        ({ applicationId }) => applicationId
                    ),
                    matchSkills: matchSkills.map(({ applicationId }) => {
                        return applicationId
                    })
                },
                type: QueryTypes.SELECT
            }
        )) as { id: string; userId: string }[]
        return matches.map(({ id, userId }) => new Match(id, userId))
    }

    async checkApplicantExistence(userId: string) {
        const applicant = await GroupMatchingApplication.findOne({
            where: { userId },
            attributes: ['id']
        })
        return applicant ? true : false
    }

    async add(
        userId: string,
        projectIdeas: ProjectIdeaTagDTO[],
        skills: SkillDTO[]
    ) {
        // Verify if user has already applied
        const existingApplication = await GroupMatchingApplication.findOne({
            where: { userId },
            attributes: ['id']
        })
        if (existingApplication) {
            throw new CustomError(
                ErrorCodes.CONFLICT,
                'The user has already an active application'
            )
        }

        const transaction_p = orm.transaction(async (t) => {
            // Create application
            const { id: applicationId } = await GroupMatchingApplication.create(
                { userId },
                { transaction: t }
            )
            await this.insertProjectsAndSkills(
                applicationId,
                projectIdeas,
                skills,
                t
            )
            // Return application ID
            return applicationId as Promise<number>
        })

        try {
            return await transaction_p
        } catch (e) {
            throw new CustomError(
                ErrorCodes.TRANSACTION_FAILURE,
                "The application couldn't be created"
            )
        }
    }

    async update(
        applicationId: string,
        projectIdeas: ProjectIdeaTagDTO[],
        skills: SkillDTO[]
    ) {
        // Check if the application exists
        const application = await GroupMatchingApplication.findByPk(
            applicationId,
            { attributes: ['id'] }
        )
        if (!application) {
            throw new CustomError(
                ErrorCodes.RECORD_NOT_FOUND,
                "The selected application doesn't exist"
            )
        }
        // Update the application
        const transaction_p = orm.transaction(async (t) => {
            // Destroy old values
            await Promise.all([
                GroupMatchingProjectIdea.destroy({
                    where: { applicationId },
                    force: true,
                    transaction: t
                }),
                GroupMatchingSkill.destroy({
                    where: { applicationId },
                    force: true,
                    transaction: t
                })
            ])
            // Insert new values
            await this.insertProjectsAndSkills(
                applicationId,
                projectIdeas,
                skills,
                t
            )
        })

        try {
            await transaction_p
        } catch (e) {}
    }

    async delete(applicationId: string) {
        await GroupMatchingApplication.destroy({
            where: { id: applicationId },
            force: true
        })
    }

    private insertProjectsAndSkills(
        applicationId: string,
        projectIdeas: ProjectIdeaTagDTO[],
        skills: SkillDTO[],
        transaction: Transaction
    ) {
        return Promise.all([
            // Insert project ideas
            GroupMatchingProjectIdea.bulkCreate(
                projectIdeas.map(({ id }) => {
                    return { applicationId, projectIdeaId: id }
                }),
                { transaction }
            ),
            // Insert skills
            GroupMatchingSkill.bulkCreate(
                skills.map(({ id }) => ({ applicationId, skillId: id })),
                { transaction }
            )
        ])
    }

    private formaResultToApplicant(result: GroupMatchingApplication) {
        return new Applicant({
            applicationId: result.id,
            userId: result.userId,
            name: result.applicant.name,
            surname: result.applicant.surname,
            username: result.applicant.username,
            slackId: result.applicant.slackId,
            projectIdeas: result.desiredProjects.map(({ name, id }) => ({
                name,
                id
            })),
            skills: result.desiredSkills.map(({ name, id }) => ({ name, id }))
        })
    }
}
