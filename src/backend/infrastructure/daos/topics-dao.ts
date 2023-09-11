import orm from '@/backend/infrastructure/connectors/database/sequelize'
import { Topic } from '../sequelize/models/topic/topic'
import { TopicDTO } from '@/backend/core/shared/dtos/topic-dto'
import { Op } from 'sequelize'
import { IDAO } from './i-dao'
import { cache } from 'react'

export const revalidate = 3600
const query = cache(async () => {
    const results = await Topic.findAll()
    return results
})

export class TopicsDAO implements IDAO<TopicDTO, number> {
    constructor() {
        orm.addModels([Topic])
    }

    async getAll() {
        const results = await query()
        return results.map(({ id, name }) => new TopicDTO(id, name))
    }

    async getByIds(ids: number[]) {
        const results = await Topic.findAll({
            where: { id: { [Op.in]: ids } }
        })
        return results.map(({ id, name }) => new TopicDTO(id, name))
    }

    async getByNames(names: string[]) {
        const results = await Topic.findAll({
            where: { name: { [Op.in]: names } }
        })
        return results.map(({ id, name }) => new TopicDTO(id, name))
    }
}
