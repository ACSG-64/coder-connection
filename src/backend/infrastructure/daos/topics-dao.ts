import orm from '@/backend/infrastructure/connectors/database/sequelize'
import { Topic } from '../sequelize/models/topic/topic'
import { TopicDTO } from '@/backend/core/shared/dtos/topic-dto'
import { Op } from 'sequelize'
import { IDAO } from './i-dao'
import { cache } from 'react'

export const revalidate = 3600
export class TopicsDAO implements IDAO<TopicDTO, number> {
    private static getAll = cache(async () => {
        const results = await Topic.findAll()
        return results.map(({ id, name }) => new TopicDTO(id, name))
    })

    private static getByIds = cache(async (ids: number[]) => {
        const results = await Topic.findAll({
            where: { id: { [Op.in]: ids } }
        })
        return results.map(({ id, name }) => new TopicDTO(id, name))
    })

    private static getByNames = cache(async (names: string[]) => {
        const results = await Topic.findAll({
            where: { name: { [Op.in]: names } }
        })
        return results.map(({ id, name }) => new TopicDTO(id, name))
    })

    constructor() {
        orm.addModels([Topic])
    }

    async getAll() {
        return TopicsDAO.getAll()
    }

    async getByIds(ids: number[]) {
        return TopicsDAO.getByIds(ids)
    }

    async getByNames(names: string[]) {
        return TopicsDAO.getByNames(names)
    }
}
