import { BelongsTo, Column, Default, ForeignKey, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { WorkingGroup } from "..";

@Table
export class Invitation extends Model {
    @PrimaryKey
    @ForeignKey(() => WorkingGroup)
    @Column
    workingGroupId!: number
    
    @Unique
    @Column
    invitationCode!: string

    @Default(true)
    @Column
    isActive!: boolean

    @BelongsTo(() => WorkingGroup)
    workingGroup!: WorkingGroup
}