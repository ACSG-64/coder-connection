import options from '@/app/api/auth/[...nextauth]/options'
import TYPES from '@/backend/configuration/TYPES'
import { NextRequest, NextResponse } from 'next/server'
import { AccountsRepository } from '@/backend/infrastructure/repositories/accounts-repository'
import { getServerSession } from 'next-auth/next'
import { Session } from 'next-auth'
import { Container } from 'inversify'
import {
    IAccountsRepository,
    RequestVerificationCodeUseCase
} from '@/backend/configuration/interfaces'
import { RegisterUserController } from '@/backend/core/services/register-user/controllers/register-user-controller'
import { GenerateCodeCommand } from '@/backend/core/services/register-user/models/generate-code-command'

const container = new Container()
container
    .bind<IAccountsRepository>(TYPES.IAccountsRepository)
    .to(AccountsRepository)
container
    .bind<RequestVerificationCodeUseCase>(TYPES.RequestVerificationCodeUseCase)
    .to(RegisterUserController)

const requestVerificationCodeUseCase =
    container.get<RequestVerificationCodeUseCase>(
        TYPES.RequestVerificationCodeUseCase
    )

export async function POST(req: NextRequest) {
    const { slackId: userSlackId } = await req.json()
    const { user } = (await getServerSession(options)) as Session

    const generateCodeCmd = new GenerateCodeCommand(user.id, userSlackId)
    await requestVerificationCodeUseCase.sendVerificationCode(generateCodeCmd)

    return new Response(null, { status: 200 })
}
