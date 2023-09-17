import {
    BelongsToMany,
    Column,
    DataType,
    HasMany,
    HasOne,
    Model,
    PrimaryKey,
    Table,
    Unique
} from 'sequelize-typescript'
import { Project, TalentPost, User } from '..'
import { GroupInvitation } from './group-invitation'
import { GroupMembership } from './group-membership'

@Table
export class WorkingGroup extends Model {
    @Unique
    @Column(DataType.STRING(32))
    name!: string

    @Column(DataType.STRING(300))
    description!: string

    @Column(DataType.STRING(22))
    slackId!: string

    @HasOne(() => GroupInvitation)
    invitation!: GroupInvitation

    @HasOne(() => Project)
    project!: Project

    @HasMany(() => TalentPost)
    talentPosts?: TalentPost[]

    @BelongsToMany(() => User, () => GroupMembership)
    members!: User[]
}
