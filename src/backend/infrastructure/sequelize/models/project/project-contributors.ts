import { Column, ForeignKey, Model, Table } from 'sequelize-typescript'
import { Project } from '.'
import { User } from '..'

@Table
export class ProjectContributors extends Model {
    @ForeignKey(() => User)
    @Column
    userId!: string

    @ForeignKey(() => Project)
    @Column
    projectId!: number
}
