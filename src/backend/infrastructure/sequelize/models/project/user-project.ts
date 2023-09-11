import { Column, ForeignKey, Model, Table } from 'sequelize-typescript'
import { Project } from '.'
import { User } from '..'

@Table
export class UserProject extends Model {
    @ForeignKey(() => User)
    @Column
    userId!: string

    @ForeignKey(() => Project)
    @Column
    project!: number
}
