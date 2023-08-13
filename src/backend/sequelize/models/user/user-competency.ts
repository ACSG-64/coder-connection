import { Column, ForeignKey, Model, Table } from 'sequelize-typescript'
import { Skill, User } from '..'

@Table
export class UserCompetency extends Model {
    @ForeignKey(() => User)
    @Column
    userId!: string

    @ForeignKey(() => Skill)
    @Column
    skillId!: number
}
