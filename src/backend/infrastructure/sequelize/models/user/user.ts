import {
    BelongsTo,
    BelongsToMany,
    Column,
    CreatedAt,
    DataType,
    Default,
    ForeignKey,
    HasMany,
    Index,
    IsUUID,
    Model,
    PrimaryKey,
    Table,
    Unique
} from 'sequelize-typescript'
import {
    GroupApplication,
    GroupMembership,
    Project,
    Skill,
    TimeZone,
    UserCompetency,
    UserInterest,
    UserProject,
    WorkingGroup
} from '..'

@Table
export class User extends Model {
    @IsUUID(4)
    @PrimaryKey
    @Column({ defaultValue: DataType.UUIDV4 })
    id!: string

    @Column(DataType.STRING(25))
    name!: string

    @Column(DataType.STRING(25))
    surname!: string

    @Unique
    @Column(DataType.STRING(35))
    username!: string

    @Default('')
    @Column(DataType.STRING(500))
    description!: string

    @Column(DataType.STRING(200))
    profileImg!: string

    @Column(DataType.STRING(100))
    gitHubProfileUrl!: string

    @Default('')
    @Column(DataType.STRING(100))
    linkedInProfileUrl!: string

    @Unique
    @Column
    gitHubId!: number

    @Unique
    @Column
    gitHubNodeId!: string

    @Unique
    @Column(DataType.STRING(22))
    slackId!: string

    @BelongsTo(() => TimeZone)
    timeZone!: TimeZone
    @ForeignKey(() => TimeZone)
    @Column
    timeZoneId!: number

    @BelongsToMany(() => Skill, () => UserCompetency)
    competencies?: Project[]
    @HasMany(() => UserCompetency)
    userCompetencies?: UserCompetency[]

    @BelongsToMany(() => Skill, () => UserInterest)
    interests?: Project[]
    @HasMany(() => UserInterest)
    userInterests?: UserInterest[]

    @BelongsToMany(() => Project, () => UserProject)
    projects?: Project[]

    @HasMany(() => GroupApplication)
    applications?: GroupApplication[]

    @BelongsToMany(() => WorkingGroup, () => GroupMembership)
    workingGroups?: WorkingGroup[]

    @Column
    lastSeenAt!: Date

    @CreatedAt
    createdAt!: Date
}
