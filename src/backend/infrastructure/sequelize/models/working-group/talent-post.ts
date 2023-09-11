import {
    BelongsTo,
    BelongsToMany,
    Column,
    DataType,
    Default,
    ForeignKey,
    HasMany,
    Model,
    PrimaryKey,
    Table
} from 'sequelize-typescript'
import { GroupApplication, Skill, TalentPostSkill, WorkingGroup } from '..'

@Table
export class TalentPost extends Model {
    @Column(DataType.STRING(300))
    description!: string

    @Default(false)
    @Column
    isPublic!: boolean

    @BelongsTo(() => WorkingGroup)
    workingGroup!: any
    @ForeignKey(() => WorkingGroup)
    @Column
    workingGroupId!: number

    @HasMany(() => GroupApplication)
    application!: GroupApplication[]

    @BelongsToMany(() => Skill, () => TalentPostSkill)
    skills!: Skill[]
}
