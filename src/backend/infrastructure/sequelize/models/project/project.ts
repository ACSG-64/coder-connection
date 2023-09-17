import {
    AllowNull,
    BelongsTo,
    BelongsToMany,
    Column,
    CreatedAt,
    DataType,
    Default,
    ForeignKey,
    HasMany,
    Model,
    Table,
    Unique,
    UpdatedAt
} from 'sequelize-typescript'
import { ProjectIdea, User, ProjectContributors, WorkingGroup } from '..'
import { ProjectParent } from './project-parent'

@Table
export class Project extends Model {
    @Column(DataType.STRING(100))
    name!: string

    @Default('')
    @Column(DataType.STRING(350))
    summary!: string

    @AllowNull
    @Unique
    @Column(DataType.STRING(30))
    video?: string

    @Unique
    @Column
    gitHubId!: number

    @Unique
    @Column
    gitHubNodeId!: string

    @Unique
    @Column
    gitHubRepositoryUrl!: string

    @AllowNull
    @Column
    repoOpenGraphImg!: string

    @Default(false)
    @Column
    isDerivate!: boolean

    @Default(false)
    @Column
    isPublic!: boolean

    /* Contributor - Project association */
    @BelongsToMany(() => User, () => ProjectContributors)
    contributors!: User[]

    /* Working group - project association */
    @BelongsTo(() => WorkingGroup, { onDelete: 'CASCADE' })
    workingGroup!: any
    @ForeignKey(() => WorkingGroup)
    @Column
    workingGroupId!: number

    /* Project idea - project association */
    @BelongsTo(() => ProjectIdea, { onDelete: 'CASCADE' })
    projectIdea!: any
    @ForeignKey(() => ProjectIdea)
    @Column
    projectIdeaId!: number

    /* Project derivation association */
    @HasMany(() => ProjectParent, 'parentProjectId')
    derivatives!: Project[]

    @HasMany(() => ProjectParent, 'projectId')
    parentOf!: Project[]

    @Column
    postedAt?: Date

    @CreatedAt
    createdAt!: Date

    @UpdatedAt
    updatedAt!: Date
}
