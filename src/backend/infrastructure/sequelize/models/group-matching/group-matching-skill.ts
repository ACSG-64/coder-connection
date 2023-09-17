import { Column, ForeignKey, Model, Table } from 'sequelize-typescript'
import { Skill } from '..'
import { GroupMatchingApplication } from './group-matching-application'

@Table
export class GroupMatchingSkill extends Model {
    @ForeignKey(() => GroupMatchingApplication)
    @Column
    applicationId!: number

    @ForeignKey(() => Skill)
    @Column
    skillId!: number
}
