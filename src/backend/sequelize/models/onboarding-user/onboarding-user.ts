import { Column, DataType, HasOne, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { SlackVerificationCode } from "./slack-vertification-code";

@Table
export class OnboardingUser extends Model {
    @PrimaryKey
    @Column(DataType.UUIDV4)
    id!: string
    
    @Column(DataType.STRING(35))
    username!: string

    @Unique
    @Column
    gitHubId!: number

    @Unique
    @Column
    gitHubNodeId!: string

    @HasOne(() => SlackVerificationCode)
    slackVerificationCode?: SlackVerificationCode
}