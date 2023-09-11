import { Column, Model, Table, Unique } from 'sequelize-typescript'

@Table
export class ProjectIdeaDraft extends Model {
    @Unique
    @Column({ primaryKey: true })
    ghId!: number

    @Unique
    @Column
    nodeId!: string
}
