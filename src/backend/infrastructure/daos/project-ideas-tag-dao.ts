import orm from '@/backend/infrastructure/connectors/database/sequelize'
import { ProjectIdeaTagDTO } from '@/backend/core/shared/dtos/project-idea-tag-dto'
import { IDAO } from './i-dao'
import { ProjectIdea } from '../sequelize/models'
import { Op } from 'sequelize'
import { cache } from 'react'

export class ProjectIdeasTagDAO implements IDAO<ProjectIdeaTagDTO, number> {
    private static getAll = cache(async () => {
        const results = await ProjectIdea.findAll({
            attributes: ['id', 'name']
        })
        return results.map(({ id, name }) => new ProjectIdeaTagDTO(id, name))
    })

    private static getByIds = cache(async (ids: number[]) => {
        const results = await ProjectIdea.findAll({
            where: { id: { [Op.in]: ids } }
        })
        return results.map(({ id, name }) => new ProjectIdeaTagDTO(id, name))
    })

    constructor() {
        orm.addModels([ProjectIdea])
    }

    async getAll() {
        return ProjectIdeasTagDAO.getAll()
    }

    async getByIds(ids: number[]) {
        return ProjectIdeasTagDAO.getByIds(ids)
    }
}
