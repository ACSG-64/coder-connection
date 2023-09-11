import {
    BelongsTo,
    Column,
    ForeignKey,
    Model,
    Table
} from 'sequelize-typescript'
import { Skill, User } from '..'

@Table({ timestamps: false })
export class UserCompetency extends Model {
    @ForeignKey(() => User)
    @Column
    userId!: string

    @ForeignKey(() => Skill)
    @Column
    skillId!: number

    @BelongsTo(() => User)
    user!: any

    @BelongsTo(() => Skill)
    skill!: any
}
