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

    /*
    Since this field is synced with GitHub, it will 
    accept duplicated values on the basis of avoiding conflicts
    in case our application goes out of sync with GitHub
    */
    @Column
    name!: string

    @Column
    summary?: string

    @Column
    repositoryUrl!: string

    @Unique
    @Column
    slackChannelId!: string

    @BelongsToMany(() => Topic, () => TopicProject)
    topics!: Topic[]

    @Default(true)
    @Column
    isPublic!: boolean

    @CreatedAt
    createdAt!: Date

    @UpdatedAt
    updatedAt!: Date
}
