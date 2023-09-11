import {
    AutoIncrement,
    BelongsTo,
    BelongsToMany,
    Column,
    ForeignKey,
    Model,
    PrimaryKey,
    Table
} from 'sequelize-typescript'
import { MembershipPermission, Permission, WorkingGroup } from '.'
import { User } from '..'

@Table
export class GroupMembership extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number

    @ForeignKey(() => User)
    @Column
    memberId!: string

    @ForeignKey(() => WorkingGroup)
    @Column
    workingGroupId!: number

    @BelongsTo(() => User)
    member!: User

    @BelongsTo(() => WorkingGroup)
    workingGroup!: any

    @BelongsToMany(() => Permission, () => MembershipPermission)
    permissions!: Permission[]
}
