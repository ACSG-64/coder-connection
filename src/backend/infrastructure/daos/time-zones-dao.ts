import orm from '@/backend/infrastructure/connectors/database/sequelize'
import { TimeZoneDTO } from '@/backend/core/shared/dtos/time-zone-dto'
import { IDAO } from './i-dao'
import { TimeZone } from '../sequelize/models'
import { Op } from 'sequelize'
import { cache } from 'react'

export class TimeZonesDAO implements IDAO<TimeZoneDTO, number> {
    private static getAll = cache(async () => {
        const results = await TimeZone.findAll()
        return this.resultsToDTO(results)
    })

    private static getByIds = cache(async (ids: number[]) => {
        const results = await TimeZone.findAll({
            where: { id: { [Op.in]: ids } }
        })
        return this.resultsToDTO(results)
    })

    constructor() {
        orm.addModels([TimeZone])
    }

    async getAll() {
        return TimeZonesDAO.getAll()
    }

    async getByIds(ids: number[]) {
        return TimeZonesDAO.getByIds(ids)
    }

    private static resultsToDTO(results: TimeZone[]) {
        return results.map(
            ({ id, tzIdentifier }) => new TimeZoneDTO(id, tzIdentifier)
        )
    }
}
