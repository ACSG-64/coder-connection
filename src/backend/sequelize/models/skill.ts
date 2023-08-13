import {
    BelongsToMany,
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table,
    Unique
} from 'sequelize-typescript'
import {
    TalentPost,
    TalentPostSkill,
    User,
    UserCompetency,
    UserInterest
} from '.'

@Table
export class Skill extends Model {
    @PrimaryKey
    @Column
    id!: number

    @Unique
    @Column(DataType.STRING(12))
    name!: string

    @BelongsToMany(() => User, () => UserCompetency)
    competencyOf?: User[]

    @BelongsToMany(() => User, () => UserInterest)
    interestOf?: User[]

    @BelongsToMany(() => TalentPost, () => TalentPostSkill)
    talentPosts?: TalentPost[]
}
