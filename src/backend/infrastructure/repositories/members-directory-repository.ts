import { UserResult } from '@/backend/core/services/members-search/models/user-result'
import orm from '@/backend/infrastructure/connectors/database/sequelize'
import { QueryTypes } from 'sequelize'
import { User, UserCompetency, UserInterest } from '../sequelize/models'
import { IMembersDirectoryRepository } from '../../core/services/members-search/repositories/i-members-repository'
import { injectable } from 'inversify'

type queryResult = {
    username: string
    name: string
    surname: string
    score: number
}

@injectable()
export class MembersDirectoryRepository implements IMembersDirectoryRepository {
    constructor() {
        orm.addModels([User, UserCompetency, UserInterest])
    }

    async getByCompetency(userId: string, userQuery?: string) {
        const results = await this.query('competencies', userId, userQuery)
        return results.map(
            ({ username, name, surname, score }) =>
                new UserResult(username, name, surname, score)
        )
    }

    async getByInterests(userId: string, userQuery?: string) {
        const results = await this.query('interests', userId, userQuery)
        return results.map(
            ({ username, name, surname, score }) =>
                new UserResult(username, name, surname, score)
        )
    }

    private async query(
        table: 'competencies' | 'interests',
        userId: string,
        search?: string
    ) {
        const TABLE =
            table == 'competencies' ? 'UserCompetencies' : 'UserInterests'
        const userSkillsCount = await (table == 'competencies'
            ? UserCompetency
            : UserInterest
        ).count({
            where: { userId }
        })

        return orm.query(
            `SELECT 
                "userId", 
                u.username,
                u.name,
                u.surname,
                CASE 
                    WHEN :userSkillsCount > 0 THEN
                        ROUND(
                            (SUM(
                                CASE 
                                    WHEN suc."skillId" IS NOT NULL THEN 1 
                                    ELSE 0 
                                END
                            ) * 100) / :userSkillsCount
                            , 0
                        )
                    ELSE 0
                END AS score                
            FROM "${TABLE}" uc
            LEFT JOIN (
                SELECT DISTINCT "skillId"
                FROM "${TABLE}"
                WHERE "userId" = :userId
            ) AS suc ON uc."skillId" = suc."skillId"
            LEFT JOIN "Users" as u ON uc."userId" = u.id
            WHERE 
                "userId" <> :userId
                ${
                    search
                        ? 'AND u.username LIKE :search ' +
                          "OR CONCAT(u.name, ' ', u.surname) LIKE :search"
                        : ''
                }
            GROUP BY "userId", u.username, u.name, u.surname
            ORDER BY score DESC;`,
            {
                replacements: {
                    userId,
                    userSkillsCount,
                    search: `%${search}%`
                },
                type: QueryTypes.SELECT
            }
        ) as Promise<queryResult[]>
    }
}
