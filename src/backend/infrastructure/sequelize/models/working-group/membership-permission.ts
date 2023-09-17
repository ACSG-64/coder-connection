import { Column, ForeignKey, Model, Table } from 'sequelize-typescript'
import { GroupMembership, GroupPermission, TalentPost } from '.'

@Table({ timestamps: false })
export class MembershipPermission extends Model {
    @ForeignKey(() => GroupMembership)
    @Column
    membershipId!: number

    @ForeignKey(() => GroupPermission)
    @Column
    permissionId!: number
}
