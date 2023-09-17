import {
    BelongsToMany,
    Column,
    Model,
    Table,
    Unique
} from 'sequelize-typescript'
import { GroupMembership, MembershipPermission } from '.'

@Table({ timestamps: false })
export class GroupPermission extends Model {
    @Unique
    @Column
    name!: string

    @BelongsToMany(() => GroupMembership, () => MembershipPermission)
    memberships!: GroupMembership[]
}
