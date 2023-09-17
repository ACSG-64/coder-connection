import {
    AutoIncrement,
    Column,
    DataType,
    HasMany,
    Model,
    PrimaryKey,
    Table,
    Unique
} from 'sequelize-typescript'
import { User } from '..'

@Table({ timestamps: false })
export class TimeZone extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number

    @Unique
    @Column
    tzIdentifier!: string

    @HasMany(() => User)
    users?: User[]
}
