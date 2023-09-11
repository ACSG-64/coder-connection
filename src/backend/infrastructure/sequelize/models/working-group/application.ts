import {
    BelongsTo,
    Column,
    ForeignKey,
    Model,
    PrimaryKey,
    Table
} from 'sequelize-typescript'
import { TalentPost, User } from '..'

@Table
export class GroupApplication extends Model {
    @PrimaryKey
    @ForeignKey(() => User)
    @Column
    userId!: string

    @PrimaryKey
    @ForeignKey(() => TalentPost)
    @Column
    talentPostId!: number

    @BelongsTo(() => User)
    applicant!: User

    @BelongsTo(() => TalentPost)
    talentPost!: any
}
