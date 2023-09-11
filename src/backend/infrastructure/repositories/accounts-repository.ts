import 'reflect-metadata'
import orm from '@/backend/infrastructure/connectors/database/sequelize'
import { IAccountsRepository } from '@/backend/core/shared/repositories/i-accounts-repository'
import { injectable } from 'inversify'
import { VerificationCode } from '@/backend/core/services/register-user/models/verification-code'
import {
    OnboardingUser,
    SlackVerificationCode,
    User
} from '../sequelize/models'
import { TimeZoneDTO } from '@/backend/core/shared/dtos/time-zone-dto'

@injectable()
export class AccountsRepository implements IAccountsRepository {
    constructor() {
        orm.addModels([OnboardingUser, SlackVerificationCode, User])
    }

    async createOnboardingAccount(
        ghId: number,
        ghNodeId: string,
        ghUserName: string,
        ghProfileUrl: string,
        ghProfileImg: string
    ): Promise<string> {
        // Create a new account
        const account = await OnboardingUser.create({
            username: ghUserName,
            profileImg: ghProfileImg,
            gitHubProfileUrl: ghProfileUrl,
            gitHubId: ghId,
            gitHubNodeId: ghNodeId
        })
        // Create an invalid code for that account. This is just to create an association
        account.$create('verificationCode', {
            code: 'INVALID',
            expiresAt: new Date()
        })
        // Return the account PK (id)
        return account.id
    }

    async getOnboardingAccountIdByGHId(ghId: number): Promise<string | void> {
        const account = await OnboardingUser.findOne({
            attributes: ['id'],
            where: { gitHubId: ghId }
        })
        return account?.id
    }

    async checkOnboardingAccountExistence(id: string): Promise<boolean> {
        const account = await OnboardingUser.findByPk(id, {
            attributes: ['id']
        })
        return account != null
    }

    async assignVerificationCode(
        accountId: string,
        code: string,
        validFor = 3
    ): Promise<void> {
        const currentDate = new Date()
        const expiresAt = new Date(currentDate.getTime() + validFor * 60000)
        await SlackVerificationCode.update(
            { code, expiresAt },
            { where: { onboardingUserId: accountId } }
        )
    }

    async getVerificationCode(accountId: string) {
        const record = await SlackVerificationCode.findOne({
            attributes: ['code', 'expiresAt'],
            where: { onboardingUserId: accountId }
        })
        if (!record) return null
        const { code, expiresAt } = record
        return new VerificationCode(code, expiresAt)
    }

    async createAccount(
        onboardingAccountId: string,
        name: string,
        surname: string,
        timeZone: TimeZoneDTO,
        slackId: string
    ): Promise<string> {
        const onboardingAccount =
            await OnboardingUser.findByPk(onboardingAccountId)
        if (!onboardingAccount)
            throw new Error("Onboarding account doesn't exists")

        /* Create a new user using */
        const { gitHubId, gitHubNodeId, username, profileImg } =
            onboardingAccount

        const { id } = await User.create({
            name,
            surname,
            username,
            profileImg,
            gitHubId,
            gitHubNodeId,
            slackId,
            timeZoneId: timeZone.id
        })

        onboardingAccount.destroy({ force: true })

        return id
    }

    async getAccountIdByGHId(ghId: number): Promise<string | void> {
        const account = await User.findOne({
            attributes: ['id'],
            where: { gitHubId: ghId }
        })
        return account?.id
    }

    async updateGitHubData(
        ghId: number,
        ghProfileUrl: string,
        profileImg: string
    ) {
        await User.update(
            { gitHubId: ghId, gitHubProfileUrl: ghProfileUrl, profileImg },
            { where: { gitHubId: ghId } }
        )
    }

    async checkAccountExistence(id: string): Promise<boolean> {
        const account = await User.findByPk(id, { attributes: ['id'] })
        return account != null
    }
}
