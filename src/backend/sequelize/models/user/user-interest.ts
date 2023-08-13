import { Column, ForeignKey, Model, Table } from 'sequelize-typescript'
import { User } from '.'
import { Skill } from '..'

@Table
export class UserInterest extends Model {
    @ForeignKey(() => User)
    @Column
    userId!: string

    @ForeignKey(() => Skill)
    @Column
    skillId!: number
}
