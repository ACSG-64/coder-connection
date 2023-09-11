import orm from '@/backend/infrastructure/connectors/database/sequelize'
import { TimeZoneDTO } from '@/backend/core/shared/dtos/time-zone-dto'
import { IDAO } from './i-dao'
import { TimeZone } from '../sequelize/models'
import { Op } from 'sequelize'

export class TimeZonesDAO implements IDAO<TimeZoneDTO, number> {
    constructor() {
        orm.addModels([TimeZone])
    }

    async getAll() {
        const results = await TimeZone.findAll()
        return this.resultsToDTO(results)
    }

    async getByIds(ids: number[]) {
        const results = await TimeZone.findAll({
            where: { id: { [Op.in]: ids } }
        })
        return this.resultsToDTO(results)
    }

    private resultsToDTO(results: TimeZone[]) {
        return results.map(
            ({ id, tzIdentifier }) => new TimeZoneDTO(id, tzIdentifier)
        )
    }
}
