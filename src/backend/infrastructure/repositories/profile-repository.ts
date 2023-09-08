import orm from '@/backend/infrastructure/connectors/database/sequelize'
import {
    Skill,
    User,
    UserCompetency,
    UserInterest
} from '@/backend/infrastructure/sequelize/models'
import { Op } from 'sequelize'
import { ProfileDetails } from '@/backend/core/services/profiles/models/profile-details'
import { IProfilesRepository } from '@/backend/core/services/profiles/repositories/i-profiles-repository'
import { SkillDTO } from '@/backend/core/shared/dtos/skill-dto'
import { injectable } from 'inversify'

@injectable()
export class ProfileRepository implements IProfilesRepository {
    constructor() {
        orm.addModels([User, UserCompetency, UserInterest, Skill])
    }

    async get(userId: string) {
        const user = await User.findByPk(userId, {
            include: [
                {
                    model: UserCompetency,
                    include: [Skill],
                    attributes: ['skillId'],
                    order: [[Skill, 'name', 'ASC']]
                },
                {
                    model: UserInterest,
                    include: [Skill],
                    attributes: ['skillId'],
                    order: [[Skill, 'name', 'ASC']]
                }
            ]
        })
        if (!user) return null

        const {
            name,
            surname,
            description,
            linkedInProfileUrl,
            userCompetencies,
            userInterests
        } = user

        const competencies = userCompetencies?.map(
            ({
                dataValues: {
                    skill: {
                        dataValues: { id, name }
                    }
                }
            }) => new SkillDTO(id, name)
        )
        const interests = userInterests?.map(
            ({
                dataValues: {
                    skill: {
                        dataValues: { id, name }
                    }
                }
            }) => new SkillDTO(id, name)
        )

        return new ProfileDetails(
            name,
            surname,
            description,
            linkedInProfileUrl ?? '',
            competencies,
            interests
        )
    }

    async update(userId: string, details: ProfileDetails) {
        const {
            name,
            surname,
            description,
            linkedInUrl: linkedInProfileUrl,
            competencies,
            interests
        } = details
        const competenciesIds = competencies.map(({ id }) => id)
        const interestsId = interests.map(({ id }) => id)

        /* Interests and skills to delete */
        // Queries
        const competenciesToDeletePromise = UserCompetency.findAll({
            where: { userId, skillId: { [Op.notIn]: competenciesIds } }
        })
        const interestsToDeletePromise = UserInterest.findAll({
            where: { userId, skillId: { [Op.notIn]: interestsId } }
        })
        // Results
        const [competenciesToDeleteRes, interestsToDeleteRes] =
            await Promise.all([
                competenciesToDeletePromise,
                interestsToDeletePromise
            ])
        // Selection
        const competenciesToDelete = competenciesToDeleteRes.map(
            ({ skillId }) => skillId
        )
        const interestsToDelete = interestsToDeleteRes.map(
            ({ skillId }) => skillId
        )

        /* Interests and skills to add */
        // Queries
        const sharedCompetenciesPromise = UserCompetency.findAll({
            where: { userId, skillId: { [Op.in]: competenciesIds } }
        })
        const sharedInterestsPromise = UserInterest.findAll({
            where: { userId, skillId: { [Op.in]: interestsId } }
        })
        // Results
        const [sharedCompetencies, sharedInterests] = await Promise.all([
            sharedCompetenciesPromise,
            sharedInterestsPromise
        ])
        // Union
        const sharedCompetenciesSet = new Set(
            sharedCompetencies.map(({ dataValues: { skillId } }) => skillId)
        )
        const sharedInterestsSet = new Set(
            sharedInterests.map(({ dataValues: { skillId } }) => skillId)
        )
        // Selection
        const competenciesToAdd = competenciesIds.filter(
            (id) => !sharedCompetenciesSet.has(id)
        )
        const interestsToAdd = interestsId.filter(
            (id) => !sharedInterestsSet.has(id)
        )

        console.log('IS EMPTY???????????', competenciesToDelete)

        /* Update data */
        await orm.transaction(async (t) => {
            const [user] = await Promise.all([
                // User
                User.update(
                    { name, surname, description, linkedInProfileUrl },
                    { where: { id: userId }, transaction: t }
                ),
                // Competencies
                UserCompetency.destroy({
                    where: {
                        userId,
                        skillId: { [Op.in]: competenciesToDelete }
                    },
                    transaction: t
                }),
                UserCompetency.bulkCreate(
                    competenciesToAdd.map((skillId) => ({ userId, skillId })),
                    { transaction: t }
                ),
                // Interests
                UserInterest.destroy({
                    where: {
                        userId,
                        skillId: { [Op.in]: interestsToDelete }
                    },
                    transaction: t
                }),
                UserInterest.bulkCreate(
                    interestsToAdd.map((skillId) => ({ userId, skillId })),
                    { transaction: t }
                )
            ])

            return user
        })
    }
}
