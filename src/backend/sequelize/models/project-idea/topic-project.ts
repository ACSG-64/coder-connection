import { Column, ForeignKey, Model, Table } from 'sequelize-typescript'
import { Topic } from '../topic'
import { ProjectIdea } from '.'

@Table
export class TopicProject extends Model {
    @ForeignKey(() => Topic)
    @Column
    topicId!: number

    @ForeignKey(() => ProjectIdea)
    @Column
    projectIdeaId!: number
}
