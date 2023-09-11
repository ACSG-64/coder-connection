import {
    BelongsToMany,
    Column,
    Model,
    Table,
    Unique
} from 'sequelize-typescript'
import { GroupMembership, MembershipPermission } from '.'

@Table
export class Permission extends Model {
    @Unique
    @Column
    name!: string

    @BelongsToMany(() => GroupMembership, () => MembershipPermission)
    permissions!: Permission[]
}
