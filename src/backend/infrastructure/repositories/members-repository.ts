import { UserResult } from '@/backend/core/services/members-search/models/user-result'
import orm from '@/backend/infrastructure/connectors/database/sequelize'
import { QueryTypes } from 'sequelize'
import { User, UserCompetency, UserInterest } from '../sequelize/models'

type queryResult = {
    username: string
    name: string
    surname: string
    score: number
}

export class MembersRepository {
    constructor() {
        orm.addModels([User, UserCompetency, UserInterest])
    }

    async getByCompetency(userId: string) {
        const userSkillsCount = await UserCompetency.count({
            where: { userId }
        })
        const results = (await orm.query(
            `          
            SELECT 
                userId, 
                u.username,
                u.name,
                u.surname,
                ROUND(
                    (SUM(
                        CASE 
                            WHEN suc.skillId IS NOT NULL THEN 1 
                            ELSE 0 
                        END
                    ) * 100) / :userSkillsCount
                    , 2
                ) AS score                
            FROM UserCompetencies uc
            LEFT JOIN (
                SELECT DISTINCT skillId
                FROM UserCompetencies
                WHERE userId = :userId
            ) AS suc ON uc.skillId = suc.skillId
            LEFT JOIN Users as u ON uc.userId = u.id
            WHERE userId IS NOT :userId
            GROUP BY userId
            ORDER BY score DESC;`,
            {
                replacements: { userId, userSkillsCount },
                type: QueryTypes.SELECT
            }
        )) as queryResult[]

        return results.map(
            ({ username, name, surname, score }) =>
                new UserResult(username, name, surname, score)
        )
    }

    async getByInterests(userId: string) {
        const userSkillsCount = await UserInterest.count({
            where: { userId }
        })
        const results = (await orm.query(
            `          
            SELECT 
                userId, 
                u.username,
                u.name,
                u.surname,
                ROUND(
                    (SUM(
                        CASE 
                            WHEN suc.skillId IS NOT NULL THEN 1 
                            ELSE 0 
                        END
                    ) * 100) / :userSkillsCount
                    , 2
                ) AS score                
            FROM UserInterest uc
            LEFT JOIN (
                SELECT DISTINCT skillId
                FROM UserInterest
                WHERE userId = :userId
            ) AS suc ON uc.skillId = suc.skillId
            LEFT JOIN Users as u ON uc.userId = u.id
            WHERE userId IS NOT :userId
            GROUP BY userId
            ORDER BY score DESC;`,
            {
                replacements: { userId, userSkillsCount },
                type: QueryTypes.SELECT
            }
        )) as queryResult[]

        return results.map(
            ({ username, name, surname, score }) =>
                new UserResult(username, name, surname, score)
        )
    }
}
