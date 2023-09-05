import {
    Column,
    DataType,
    HasOne,
    IsUUID,
    Model,
    PrimaryKey,
    Table,
    Unique
} from 'sequelize-typescript'
import { SlackVerificationCode } from './slack-verification-code'

@Table
export class OnboardingUser extends Model {
    @IsUUID(4)
    @PrimaryKey
    @Column({ defaultValue: DataType.UUIDV4 })
    id!: string

    @Column(DataType.STRING(35))
    username!: string

    @Unique
    @Column
    gitHubId!: number

    @Unique
    @Column
    gitHubNodeId!: string

    @HasOne(() => SlackVerificationCode, { onDelete: 'CASCADE' })
    verificationCode!: any
}
