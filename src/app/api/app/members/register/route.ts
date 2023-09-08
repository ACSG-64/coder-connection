import options from '@/app/api/auth/[...nextauth]/options'
import { Session } from 'next-auth'
import { getServerSession } from 'next-auth/next'
import { NextRequest, NextResponse } from 'next/server'
import { Container } from 'inversify'
import {
    IAccountsRepository,
    RegisterUserUseCase
} from '@/backend/configuration/interfaces'
// import TYPES from '@/backend/configuration/TYPES'
import { RegisterUserController } from '@/backend/core/services/register-user/controllers/register-user-controller'
import { AccountsRepository } from '@/backend/infrastructure/repositories/accounts-repository'
import CustomError from '@/backend/constants/custom-error'
import { CreateNewMemberCommand } from '@/backend/core/services/register-user/models/create-new-member-command'
import { TimeZoneDTO } from '@/backend/core/shared/dtos/time-zone-dto'
import { DIContainer, TYPES } from './config/di-container'

export async function POST(req: NextRequest) {
    const { user } = (await getServerSession(options)) as Session
    const { name, surname, timeZone, slackId, verificationCode } =
        await req.json()

    const container = await DIContainer
    const registerUserUseCase = container.get<RegisterUserUseCase>(
        TYPES.RegisterUserUseCase
    )

    let createNewMemberCmd: CreateNewMemberCommand
    try {
        createNewMemberCmd = new CreateNewMemberCommand(
            user.id,
            name,
            surname,
            new TimeZoneDTO(timeZone.id, timeZone.name),
            slackId,
            verificationCode
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
