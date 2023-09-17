import { getSessionUser } from '@/backend/core/shared/get-user'
import { GitHubApp } from '@/backend/infrastructure/connectors/network/github-app'
import { NextRequest, NextResponse } from 'next/server'
import { TYPES, getDIContainer } from '../config/di-container'
import { CreateGroupUseCase } from '@/backend/core/services/groups/use-cases/create-group-use-case'
import { CreateGroupCommand } from '@/backend/core/services/groups/models/create-group-command'

export async function POST(req: NextRequest) {
    const user = await getSessionUser()
    if (!user) {
        console.log('User not found!')
        return new NextResponse("User doesn't exist", { status: 404 })
    }
    const container = await getDIContainer()
    const { ideaId, repositoryId, groupName } = await req.json()

    const createGroupUseCase = container.get<CreateGroupUseCase>(
        TYPES.CreateGroupUseCase
    )
    // groupName, repositoryName,
    const cmd = new CreateGroupCommand(user.id, groupName, repositoryId, ideaId)
    createGroupUseCase.create(cmd)

    return new NextResponse('OK!')
}
