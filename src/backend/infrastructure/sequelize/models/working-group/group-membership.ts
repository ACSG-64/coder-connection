import {
    AutoIncrement,
    BelongsTo,
    BelongsToMany,
    Column,
    ForeignKey,
    Model,
    Table
} from 'sequelize-typescript'
import { MembershipPermission, GroupPermission, WorkingGroup } from '.'
import { User } from '..'

@Table
export class GroupMembership extends Model {
    @AutoIncrement
    @Column({ primaryKey: true })
    id!: number

    @BelongsTo(() => User)
    member!: User
    @ForeignKey(() => User)
    @Column
    memberId!: string

    @BelongsTo(() => WorkingGroup)
    workingGroup!: any
    @ForeignKey(() => WorkingGroup)
    @Column
    workingGroupId!: number

    @BelongsToMany(() => GroupPermission, () => MembershipPermission)
    permissions!: GroupPermission[]
}
