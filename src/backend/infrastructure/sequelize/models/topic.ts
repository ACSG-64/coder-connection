import {
    BelongsToMany,
    Column,
    Model,
    PrimaryKey,
    Table,
    Unique
} from 'sequelize-typescript'
import { TopicProject } from './project-idea/topic-project'
import { ProjectIdea } from './project-idea/project-idea'

@Table({ timestamps: false })
export class Topic extends Model {
    @PrimaryKey
    @Column
    id!: number

    @Unique
    @Column
    name!: string

    @BelongsToMany(() => ProjectIdea, () => TopicProject)
    projectIdeas?: any
}
