import options from '@/app/api/auth/[...nextauth]/options'
import { UpdateProfileCommand } from '@/backend/core/services/profiles/models/update-profile-command'
import { SkillDTO } from '@/backend/core/shared/dtos/skill-dto'
import { getServerSession } from 'next-auth/next'
import { NextRequest, NextResponse } from 'next/server'
import { TYPES, getDIContainer } from './config/di-container'
import { UpdateProfileUseCase } from '@/backend/core/services/profiles/use-cases/update-profile-use-case'

export async function POST(req: NextRequest) {
    const session = await getServerSession(options)
    const body = await req.json()
    const rawCompetencies = body?.skills as { id: number; name: string }[]
    const rawInterests = body?.interests as { id: number; name: string }[]

    const container = await getDIContainer()
    const updateProfileUseCase = container.get<UpdateProfileUseCase>(
        TYPES.UpdateProfileUseCase
    )

    const cmd = new UpdateProfileCommand(
        session?.user?.id,
        body.name,
        body.surname,
        body.description,
        body?.linkedInUrl,
        rawCompetencies.map(({ id, name }) => new SkillDTO(id, name)),
        rawInterests.map(({ id, name }) => new SkillDTO(id, name))
    )
    await updateProfileUseCase.updateDetails(cmd)

    return new NextResponse('Ok', { status: 200 })
}
