import options from '@/app/api/auth/[...nextauth]/options'
import { Session } from 'next-auth'
import { getServerSession } from 'next-auth/next'
import { NextRequest, NextResponse } from 'next/server'
import { RegisterUserUseCase } from '@/backend/configuration/interfaces'
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
        console.log(e)
        if (e instanceof CustomError) {
            return new Response(e.msg, { status: e.httpCode })
        }
        return new Response('Unexpected error', { status: 500 })
    }

    try {
        await registerUserUseCase.register(createNewMemberCmd)
    } catch (e) {
        console.log(e)
        if (e instanceof CustomError) {
            return new Response(e.msg, { status: e.httpCode })
        }
        return new Response('Unexpected error', { status: 500 })
    }

    return new NextResponse('Account created successfully', { status: 200 })
}
