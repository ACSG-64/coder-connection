import CustomError from '@/backend/constants/custom-error'
import { SlackApp } from '@/backend/infrastructure/connectors/network/slack-app'
import { nanoid } from 'nanoid/async'
import { CreateNewMemberCommand } from '../models/create-new-member-command'
import { GenerateCodeCommand } from '../models/generate-code-command'
import { inject, injectable } from 'inversify'
import TYPES from '@/backend/configuration/di-types/register-user/TYPES'
import type { IAccountsRepository } from '@/backend/core/shared/repositories/i-accounts-repository'
import {
    RegisterUserUseCase,
    RequestVerificationCodeUseCase
} from '@/backend/configuration/interfaces'

@injectable()
export class RegisterUserController
    implements RegisterUserUseCase, RequestVerificationCodeUseCase
{
    constructor(
        @inject(TYPES.IAccountsRepository)
        private readonly accountsRepo: IAccountsRepository
    ) {}

    async register(newMember: CreateNewMemberCommand) {
        const { userId, name, surname, timeZone, slackId, verificationCode } =
            newMember

        const vCode = await this.accountsRepo.getVerificationCode(userId)
        if (!vCode || vCode.code == 'INVALID') {
            throw new CustomError(400, "The code hasn't been generated yet")
        }

        if (verificationCode != vCode.code) {
            throw new CustomError(400, 'Incorrect code')
        }

        const memberId = await this.accountsRepo.createAccount(
            userId,
            name,
            surname,
            timeZone,
            slackId
        )
        return memberId
    }

    async sendVerificationCode(assignee: GenerateCodeCommand) {
        const { userId, slackId: userSlackId } = assignee

        const code = await nanoid(10)
        const VALIDITY_MINUTES = 3
        await this.accountsRepo.assignVerificationCode(
            userId,
            code,
            VALIDITY_MINUTES
        )

        const slackApp = SlackApp.instance
        await slackApp.chat.postMessage({
            channel: userSlackId,
            blocks: generateSlackMessage(code)
        })

        return code
    }
}

function generateSlackMessage(code: string) {
    return [
        {
            type: 'header',
            text: {
                type: 'plain_text',
                text: 'Account setup service'
            }
        },
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text:
                    'A verification code was requested to link this Slack profile to an account. \n' +
                    `*Temporal verification code: \`${code}\`*`
            }
        },
        {
            type: 'divider'
        },
        {
            type: 'context',
            elements: [
                {
                    type: 'mrkdwn',
                    text:
                        `If you didn't request a verification code, please ignore this message. \n` +
                        `_This an automated message._`
                }
            ]
        }
    ]
}
