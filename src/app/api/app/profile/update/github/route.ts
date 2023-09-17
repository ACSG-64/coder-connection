import { NextRequest, NextResponse } from 'next/server'
import { TYPES, getDIContainer } from '../config/di-container'
import { UpdateProfileUseCase } from '@/backend/core/services/profiles/use-cases/update-profile-use-case'
import { getSessionUser } from '@/backend/core/shared/get-user'

export async function POST(req: NextRequest) {
    const user = await getSessionUser()
    if (!user)
        return new NextResponse('You are not authenticated', { status: 401 })
    const container = await getDIContainer()
    const updateProfileUseCase = container.get<UpdateProfileUseCase>(
        TYPES.UpdateProfileUseCase
    )
    try {
        updateProfileUseCase.syncGitHubDetails(user.id)
        return new NextResponse('Profile updated successfully', { status: 200 })
    } catch (e) {}
}
