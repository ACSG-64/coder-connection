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
import { Invitation } from './invitation'
import { Membership } from './membership'

@Table
export class WorkingGroup extends Model {
    @Unique
    @Column(DataType.STRING(32))
    name!: string

    @Column(DataType.STRING(300))
    description!: string

    @HasOne(() => Invitation)
    invitation?: Invitation

    @HasOne(() => Project)
    project!: Project

    @HasMany(() => TalentPost)
    talentPosts?: TalentPost[]

    @BelongsToMany(() => User, () => Membership)
    members!: User[]
}
