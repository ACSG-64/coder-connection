import { Column, ForeignKey, Model, Table } from 'sequelize-typescript'
import { GroupMembership, Permission, TalentPost } from '.'

@Table
export class MembershipPermission extends Model {
    @ForeignKey(() => GroupMembership)
    @Column
    membershipId!: number

    @ForeignKey(() => Permission)
    @Column
    roleId!: number
}
