import options from '@/app/api/auth/[...nextauth]/options'
import { Session } from 'next-auth'
import { getServerSession } from 'next-auth/next'
import { NextRequest, NextResponse } from 'next/server'
import { Container } from 'inversify'
import {
    IAccountsRepository,
    RegisterUserUseCase
} from '@/backend/configuration/interfaces'
import TYPES from '@/backend/configuration/TYPES'
import { RegisterUserController } from '@/backend/core/services/register-user/controllers/register-user-controller'
import { AccountsRepository } from '@/backend/infrastructure/repositories/accounts-repository'
import CustomError from '@/backend/constants/custom-error'
import { CreateNewMemberCommand } from '@/backend/core/services/register-user/models/create-new-member-command'

const container = new Container()
container
    .bind<IAccountsRepository>(TYPES.IAccountsRepository)
    .to(AccountsRepository)
container
    .bind<RegisterUserUseCase>(TYPES.RegisterUserUseCase)
    .to(RegisterUserController)

const registerUserUseCase = container.get<RegisterUserUseCase>(
    TYPES.RegisterUserUseCase
)

export async function POST(req: NextRequest) {
    const { user } = (await getServerSession(options)) as Session
    const {
        name,
        surname,
        slackId,
        verificationCode: providedCode
    } = await req.json()

    let createNewMemberCmd: CreateNewMemberCommand
    try {
        createNewMemberCmd = new CreateNewMemberCommand(
            user.id,
            name,
            surname,
            slackId,
            providedCode
        )
    } catch (e) {
        if (e instanceof CustomError) {
            return new Response(e.msg, { status: e.httpCode })
        }
        return new Response('Unexpected error', { status: 500 })
    }

    try {
        await registerUserUseCase.register(createNewMemberCmd)
    } catch (e) {
        if (e instanceof CustomError) {
            return new Response(e.msg, { status: e.httpCode })
        }
        return new Response('Unexpected error', { status: 500 })
    }

    return new Response('Account created successfully', { status: 200 })
}
