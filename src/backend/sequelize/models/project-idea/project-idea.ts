import { BelongsToMany, Column, CreatedAt,  HasMany,  Model, PrimaryKey, Table, Unique, UpdatedAt } from "sequelize-typescript";
import { Project, Topic, TopicProject } from "..";

@Table
export class ProjectIdea extends Model {
    @PrimaryKey
    @Column
    id!: number

    @Unique
    @Column
    nodeId!: string;
    
    @Column
    name!: string
    
    @Column
    summary?: string

    @Unique
    @Column
    slackChannelId?: string

    @Column
    latestCommitSHA!: string

    @BelongsToMany(() => Topic, () => TopicProject)
    topics?: Topic[]

    @HasMany(() => Project)
    projects?: Project[]

    @CreatedAt
    createdAt!: Date

    @UpdatedAt
    updatedAt!: Date
}