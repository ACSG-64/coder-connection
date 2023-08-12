import { BelongsToMany, Column, Model, PrimaryKey, Table } from "sequelize-typescript";
import { ProjectIdea } from "./project-idea";
import { TopicProject } from "./project-idea/topic-project";

@Table
export class Topic extends Model<Topic> {
    @PrimaryKey
    @Column
    id!: number

    @Column
    name!: string

    @BelongsToMany(() => ProjectIdea, () => TopicProject)
    projectIdeas?: ProjectIdea[]
}

