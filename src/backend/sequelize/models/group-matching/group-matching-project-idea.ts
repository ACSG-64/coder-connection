import { Column, ForeignKey, Model, Table } from 'sequelize-typescript'
import { GroupMatchingApplication } from './group-matching-application'
import { ProjectIdea } from '..'

@Table
export class GroupMatchingProjectIdea extends Model {
    @ForeignKey(() => GroupMatchingApplication)
    @Column
    groupMatchingApplicationId!: number

    @ForeignKey(() => ProjectIdea)
    @Column
    projectIdeaId!: number
}
