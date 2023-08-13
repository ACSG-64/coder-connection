import {
    Column,
    DataType,
    HasMany,
    Model,
    PrimaryKey,
    Table,
    Unique
} from 'sequelize-typescript'
import { TimeZone } from '.'

@Table
export class Country extends Model {
    @PrimaryKey
    @Column(DataType.STRING(3))
    iso3!: string

    @Unique
    @Column
    name!: string

    @Unique
    @Column(DataType.STRING(2))
    iso2!: string

    @HasMany(() => TimeZone)
    timeZones!: TimeZone[]
}
