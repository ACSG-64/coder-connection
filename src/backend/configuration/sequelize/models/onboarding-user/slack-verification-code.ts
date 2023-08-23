import {
    BelongsTo,
    Column,
    ForeignKey,
    Model,
    Table,
    Unique
} from 'sequelize-typescript'
import { OnboardingUser } from '.'

@Table
export class SlackVerificationCode extends Model {
    @Column({ primaryKey: true })
    id!: number

    @ForeignKey(() => OnboardingUser)
    onboardingUserId!: string

    @Unique
    @Column
    code!: string

    @Column
    expiresAt!: Date

    @BelongsTo(() => OnboardingUser, { onDelete: 'CASCADE' })
    onboardingUser!: OnboardingUser
}
