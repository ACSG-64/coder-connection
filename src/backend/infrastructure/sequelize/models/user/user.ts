import {
    BelongsTo,
    BelongsToMany,
    Column,
    CreatedAt,
    DataType,
    Default,
    ForeignKey,
    HasMany,
    IsUUID,
    Model,
    PrimaryKey,
    Table,
    Unique
} from 'sequelize-typescript'
import {
    Application,
    Membership,
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

    @Column(DataType.STRING(35))
    username!: string

    @Default('')
    @Column(DataType.STRING(500))
    description!: string

    @Unique
    @Column
    gitHubId!: number

    @Unique
    @Column
    gitHubNodeId!: string

    @Column
    gitHubProfileImg?: string

    @Column(DataType.STRING(100))
    linkedInProfileUrl!: string

    @Unique
    @Column(DataType.STRING(10))
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

    @HasMany(() => Application)
    applications?: Application[]

    @BelongsToMany(() => WorkingGroup, () => Membership)
    workingGroups?: WorkingGroup[]

    @Column
    lastSeenAt!: Date

    @CreatedAt
    createdAt!: Date
}
