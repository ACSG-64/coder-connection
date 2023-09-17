import orm from '@/backend/infrastructure/connectors/database/sequelize'
import { Op } from 'sequelize'
import { SkillDTO } from '@/backend/core/shared/dtos/skill-dto'
import { Skill } from '../sequelize/models'
import { IDAO } from './i-dao'
import { cache } from 'react'

export class SkillsDAO implements IDAO<SkillDTO, number> {
    private static getAll = cache(async () => {
        const results = await Skill.findAll()
        return results.map(({ id, name }) => new SkillDTO(id, name))
    })

    private static getByIds = cache(async (ids: number[]) => {
        const results = await Skill.findAll({
            where: { id: { [Op.in]: ids } }
        })
        return results.map(({ id, name }) => new SkillDTO(id, name))
    })

    constructor() {
        orm.addModels([Skill])
    }

    async getAll() {
        return SkillsDAO.getAll()
    }

    async getByIds(ids: number[]) {
        return SkillsDAO.getByIds(ids)
    }
}
