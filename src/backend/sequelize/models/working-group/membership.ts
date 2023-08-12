import { BelongsTo, Column, Default, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { WorkingGroup } from ".";
import { User } from "..";

@Table
export class Membership extends Model {
    @PrimaryKey
    @ForeignKey(() => User)
    @Column
    memberId!: string

    @PrimaryKey
    @ForeignKey(() => WorkingGroup)
    @Column
    workingGroupId!: number

    @Default(false)
    @Column
    isLeader!: boolean

    @Default(false)
    @Column
    canManageProject!: boolean

    @Default(false)
    @Column
    canManageApplications!: boolean

    @Default(false)
    @Column
    canFindTalent!: boolean

    
    @BelongsTo(() => User)
    member!: User

    @BelongsTo(() => WorkingGroup)
    workingGroup!: WorkingGroup
}