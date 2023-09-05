import {
    BelongsTo,
    BelongsToMany,
    Column,
    CreatedAt,
    DataType,
    Default,
    ForeignKey,
    HasMany,
    Model,
    PrimaryKey,
    Table,
    Unique,
    UpdatedAt
} from 'sequelize-typescript'
import { ProjectIdea, User, UserProject, WorkingGroup } from '..'

@Table
export class Project extends Model {
    @PrimaryKey
    @Column
    id!: number

    @Column(DataType.STRING(100))
    name!: string

    @Column(DataType.STRING(350))
    summary!: string

    @Unique
    @Column(DataType.STRING(30))
    video?: string

    @Unique
    @Column
    repoUrl!: string

    @Column
    repoOpenGraphImg!: string

    @Column
    latestCommitSHA!: string

    @Default(false)
    @Column
    isPublic!: boolean

    @Default(false)
    @Column
    isDerivate!: boolean

    /* Contributor - Project association */
    @BelongsToMany(() => User, () => UserProject)
    contributors!: User[]

    /* Working group - project association */
    @BelongsTo(() => WorkingGroup)
    workingGroup!: any
    @ForeignKey(() => WorkingGroup)
    @Column
    workingGroupId!: number

    /* Project idea - project association */
    @BelongsTo(() => ProjectIdea)
    projectIdea!: any
    @ForeignKey(() => ProjectIdea)
    @Column
    projectIdeaId!: number

    /* Project derivation association */
    @BelongsTo(() => Project)
    baseProject?: Project
    @HasMany(() => Project)
    derivations?: Project[]
    @ForeignKey(() => Project)
    @Column
    baseProjectId?: number

    @Column
    postedAt?: Date

    @CreatedAt
    createdAt!: Date

    @UpdatedAt
    updatedAt!: Date
}
