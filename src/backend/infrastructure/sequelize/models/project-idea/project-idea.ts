import {
    BelongsToMany,
    Column,
    CreatedAt,
    Default,
    HasMany,
    Model,
    PrimaryKey,
    Table,
    Unique,
    UpdatedAt
} from 'sequelize-typescript'
import { Project, Topic, TopicProject } from '..'
@Table
export class ProjectIdea extends Model {
    @Unique
    @Column
    nodeId!: string

    @Column
    name!: string

    @Column
    summary?: string

    @Unique
    @Column
    slackChannelId!: string

    @BelongsToMany(() => Topic, () => TopicProject)
    topics?: Topic[]

    @Default(true)
    @Column
    isPublic!: boolean

    @HasMany(() => Project)
    projects?: Project[]

    @CreatedAt
    createdAt!: Date

    @UpdatedAt
    updatedAt!: Date
}
