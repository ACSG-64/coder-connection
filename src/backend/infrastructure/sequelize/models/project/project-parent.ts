import {
    BelongsTo,
    Column,
    ForeignKey,
    Model,
    Table
} from 'sequelize-typescript'
import { Project } from '.'

@Table
export class ProjectParent extends Model {
    @ForeignKey(() => Project)
    @Column
    projectId!: number

    @ForeignKey(() => Project)
    @Column
    parentProjectId!: number

    @BelongsTo(() => Project)
    project!: any
}
