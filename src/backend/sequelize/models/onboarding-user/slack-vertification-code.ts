import {
    BelongsTo,
    Column,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
    Unique
} from 'sequelize-typescript'
import { OnboardingUser } from './onboarding-user'

@Table
export class SlackVerificationCode extends Model {
    @PrimaryKey
    @ForeignKey(() => OnboardingUser)
    @Column
    onboardingUserId!: string

    @Unique
    @Column
    code!: string

    @Column
    expiresAt!: Date

    @BelongsTo(() => OnboardingUser)
    onboardingUser!: OnboardingUser
}
