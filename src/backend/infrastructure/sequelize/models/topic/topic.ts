import {
    AutoIncrement,
    BelongsToMany,
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table,
    Unique
} from 'sequelize-typescript'
import { TopicProject } from '../project-idea/topic-project'
import { ProjectIdea } from '../project-idea/project-idea'

@Table({ timestamps: false })
export class Topic extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number

    @Unique
    @Column(DataType.STRING(50))
    name!: string

    @BelongsToMany(() => ProjectIdea, () => TopicProject)
    projectIdeas?: any
}
