import {
    BelongsTo,
    BelongsToMany,
    Column,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt
} from 'sequelize-typescript'
import { ProjectIdea, Skill, User } from '..'
import { GroupMatchingSkill } from './group-matching-skill'
import { GroupMatchingProjectIdea } from './group-matching-project-idea'

@Table
export class GroupMatchingApplication extends Model {
    @PrimaryKey
    @Column
    id!: number

    @BelongsTo(() => User)
    applicant!: User
    @ForeignKey(() => User)
    @Column
    userId!: string

    @BelongsToMany(() => ProjectIdea, () => GroupMatchingProjectIdea)
    desiredProjects!: ProjectIdea[]

    @BelongsToMany(() => Skill, () => GroupMatchingSkill)
    desiredSkills!: Skill[]

    @UpdatedAt
    updatedAt!: Date
}
