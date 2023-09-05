import {
    BelongsToMany,
    Column,
    DataType,
    HasMany,
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

@Table({ timestamps: false })
export class Skill extends Model {
    @PrimaryKey
    @Column
    id!: number

    @Unique
    @Column(DataType.STRING(12))
    name!: string

    @BelongsToMany(() => User, () => UserCompetency)
    competencyOf?: User[]
    @HasMany(() => UserCompetency)
    userCompetencies?: UserCompetency[]

    @BelongsToMany(() => User, () => UserInterest)
    interestOf?: User[]
    @HasMany(() => UserInterest)
    userInterests?: UserInterest[]

    @BelongsToMany(() => TalentPost, () => TalentPostSkill)
    talentPosts?: TalentPost[]
}
