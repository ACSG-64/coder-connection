import orm from '@/backend/infrastructure/connectors/database/sequelize'
import { Op } from 'sequelize'
import { SkillDTO } from '@/backend/core/shared/dtos/skill-dto'
import { Skill } from '../sequelize/models'
import { IDAO } from './i-dao'

export class SkillsDAO implements IDAO<SkillDTO, number> {
    constructor() {
        orm.addModels([Skill])
    }

    async getAll() {
        const results = await Skill.findAll()
        return results.map(({ id, name }) => new SkillDTO(id, name))
    }

    async getByIds(ids: number[]) {
        const results = await Skill.findAll({
            where: { id: { [Op.in]: ids } }
        })
        return results.map(({ id, name }) => new SkillDTO(id, name))
    }
}
