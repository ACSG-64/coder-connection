import { Column, HasMany, Model, Table, Unique } from 'sequelize-typescript'
import { User } from '..'

@Table({ timestamps: false })
export class TimeZone extends Model {
    @Unique
    @Column
    tzIdentifier!: string

    @HasMany(() => User)
    users?: User[]
}
