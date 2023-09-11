import { VerificationCode } from '../../services/register-user/models/verification-code'
import { TimeZoneDTO } from '../dtos/time-zone-dto'

export interface IAccountsRepository {
    createOnboardingAccount(
        ghId: number,
        ghNodeId: string,
        ghUserName: string,
        ghProfileUrl: string,
        ghProfileImg: string
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
        tineZone: TimeZoneDTO,
        slackId: string
    ): Promise<string>
    getAccountIdByGHId(ghId: number): Promise<string | void>
    checkAccountExistence(id: string): Promise<boolean>
}
