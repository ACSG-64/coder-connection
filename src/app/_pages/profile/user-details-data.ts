import { cache } from 'react'
import { TYPES, getDIContainer } from './config/di-container'
import { GetProfileUseCase } from '@/backend/core/services/profiles/use-cases/get-profile-use-case'

export const getUserDetails = cache(async (username: string) => {
    const container = await getDIContainer()
    const getProfileUseCase = container.get<GetProfileUseCase>(
        TYPES.GetProfileUseCase
    )
    const profile = await getProfileUseCase.getDetailsByUsername(username)
    return profile
})
