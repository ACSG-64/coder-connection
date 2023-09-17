import {
    AllowNull,
    BelongsTo,
    Column,
    ForeignKey,
    Model,
    PrimaryKey,
    Table
} from 'sequelize-typescript'
import { TalentPost, User, WorkingGroup } from '..'

@Table
export class GroupApplication extends Model {
    @BelongsTo(() => User)
    applicant!: any
    @ForeignKey(() => User)
    @Column
    userId!: string

    @BelongsTo(() => WorkingGroup)
    group!: any
    @ForeignKey(() => WorkingGroup)
    @Column
    groupId!: number

    @BelongsTo(() => TalentPost)
    talentPost!: any
    @AllowNull
    @ForeignKey(() => TalentPost)
    @Column
    talentPostId!: number
}
