import { VerificationCode } from '../../services/register-user/models/verification-code'

export interface IAccountsRepository {
    createOnboardingAccount(
        ghId: number,
        ghNodeId: string,
        ghUserName: string
    ): Promise<string>
    getOnboardingAccountIdByGHId(ghId: number): Promise<string | void>
    checkOnboardingAccountExistence(id: string): Promise<boolean>
    assignVerificationCode(
        accountId: string,
        code: string,
        validFor: number
    ): Promise<void>
    getVerificationCode(
        accountId: string
    ): Promise<VerificationCode | void | null>

    createAccount(
        onboardingAccountId: string,
        name: string,
        surname: string,
        slackId: string
    ): Promise<string>
    getAccountIdByGHId(ghId: number): Promise<string | void>
    checkAccountExistence(id: string): Promise<boolean>
}
