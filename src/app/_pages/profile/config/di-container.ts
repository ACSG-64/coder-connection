import TYPES from '@/backend/configuration/di-types/profiles/TYPES'
import { IProfilesRepository } from '@/backend/core/services/profiles/repositories/i-profiles-repository'
import { GetProfileUseCase } from '@/backend/core/services/profiles/use-cases/get-profile-use-case'
import { Container } from 'inversify'

async function getDIContainer() {
    const container = new Container()

    const profilesRepository_p = import(
        '@/backend/infrastructure/repositories/profile-repository'
    )
    const profileController_p = import(
        '@/backend/core/services/profiles/controllers/profile-controller'
    )

    const [{ ProfileRepository }, { ProfileController }] = await Promise.all([
        profilesRepository_p,
        profileController_p
    ])

    container
        .bind<IProfilesRepository>(TYPES.IProfilesRepository)
        .to(ProfileRepository)
    container
        .bind<GetProfileUseCase>(TYPES.GetProfileUseCase)
        .to(ProfileController)

    return container
}

export { getDIContainer, TYPES }
