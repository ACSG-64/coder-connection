import * as z from 'zod'
import { RetireApplicationCommand } from '@/backend/core/services/group-matching/models/retire-application-command'
import { getSessionUser } from '@/backend/core/shared/get-user'
import { NextRequest, NextResponse } from 'next/server'
import { TYPES, getDIContainer } from './config/di-container'
import { ManageApplicationUseCase } from '@/backend/core/services/group-matching/use-cases/manage-application-use-case'
import { CreateApplicationCommand } from '@/backend/core/services/group-matching/models/create-application-command'
import { ProjectIdeaTagDTO } from '@/backend/core/shared/dtos/project-idea-tag-dto'
import { SkillDTO } from '@/backend/core/shared/dtos/skill-dto'
import { groupMatchingFormSchema } from '@/backend/core/services/group-matching/schemas/group-matching-form'

export async function POST(req: NextRequest) {
    const user = await getSessionUser()
    if (!user) {
        return new NextResponse("User doesn't exist", { status: 404 })
    }
    const body = (await req.json()) as z.infer<typeof groupMatchingFormSchema>

    const container = await getDIContainer()
    const manageApplicationUseCase = container.get<ManageApplicationUseCase>(
        TYPES.ManageApplicationUseCase
    )

    const cmd = new CreateApplicationCommand(
        user.id,
        body.projectIdeas.map(
            ({ id, name }) => new ProjectIdeaTagDTO(id, name)
        ),
        body.skills.map(({ id, name }) => new SkillDTO(id, name))
    )

    try {
        await manageApplicationUseCase.apply(cmd)
        return new NextResponse('Your application has been submitted', {
            status: 200
        })
    } catch (e) {
        console.log('>>>>>>>>>>>>>>>>>>>>>', e)
        return new NextResponse('Your application could not be submitted', {
            status: 500
        })
    }
}

export async function DELETE(req: NextRequest) {
    const user = await getSessionUser()
    if (!user) {
        return new NextResponse("User doesn't exist", { status: 404 })
    }
    const container = await getDIContainer()
    const manageApplicationUseCase = container.get<ManageApplicationUseCase>(
        TYPES.ManageApplicationUseCase
    )
    const body = await req.json()
    const cmd = new RetireApplicationCommand(user.id, body.applicationId)
    try {
        await manageApplicationUseCase.retire(cmd)
        return new NextResponse('Your application has been retired', {
            status: 200
        })
    } catch (error) {
        return new NextResponse('Your application could not be retired', {
            status: 500
        })
    }
}
