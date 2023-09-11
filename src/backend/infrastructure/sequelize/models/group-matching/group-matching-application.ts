import {
    BelongsTo,
    BelongsToMany,
    Column,
    ForeignKey,
    Model,
    Table
} from 'sequelize-typescript'
import { ProjectIdea, Skill, User } from '..'
import { GroupMatchingSkill } from './group-matching-skill'
import { GroupMatchingProjectIdea } from './group-matching-project-idea'

@Table
export class GroupMatchingApplication extends Model {
    @BelongsTo(() => User)
    applicant!: any
    @ForeignKey(() => User)
    @Column
    userId!: string

    @BelongsToMany(() => ProjectIdea, () => GroupMatchingProjectIdea)
    desiredProjects!: ProjectIdea[]

    @BelongsToMany(() => Skill, () => GroupMatchingSkill)
    desiredSkills!: Skill[]
}
