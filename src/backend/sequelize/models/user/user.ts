import { BelongsTo, BelongsToMany, Column, CreatedAt, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { Application, Project, Skill, TimeZone, UserCompetency, UserInterest, UserProject, WorkingGroup } from "..";
import { Membership } from "../working-group/membership";

@Table
export class User extends Model {    
    @PrimaryKey
    @Column(DataType.UUIDV4)
    id!: string

    @Column(DataType.STRING(25))
    name!: string

    @Column(DataType.STRING(25))
    surname!: string

    @Column(DataType.STRING(35))
    username!: string
    
    @Column(DataType.STRING(500))
    description?: string

    @Unique
    @Column
    gitHubId!: number

    @Unique
    @Column
    gitHubNodeId!: string

    @Column
    gitHubProfileImg!: string

    @Unique
    @Column(DataType.STRING(10))
    slackId!: string

    @BelongsTo(() => TimeZone)
    timeZone!:  TimeZone
    @ForeignKey(() => TimeZone)
    @Column
    timeZoneId!: string

    @BelongsToMany(() => Skill, () => UserCompetency)
    competencies?: Project[]

    @BelongsToMany(() => Skill, () => UserInterest)
    interests?: Project[]

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