import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { TalentPost } from ".";
import { Skill } from "..";

@Table
export class TalentPostSkill extends Model {
    @ForeignKey(() => TalentPost)
    @Column
    talentPostId!: number

    @ForeignKey(() => Skill)
    @Column
    skillId!: number
}