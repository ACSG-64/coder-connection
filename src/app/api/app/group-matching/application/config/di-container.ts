import TYPES from '@/backend/configuration/di-types/group-matching/TYPES'
import { IGroupMatchingApplicationsRepository } from '@/backend/core/services/group-matching/repositories/i-group-matching-application-repository'
import { ManageApplicationUseCase } from '@/backend/core/services/group-matching/use-cases/manage-application-use-case'
import { Container } from 'inversify'

async function getDIContainer() {
    const container = new Container()
    const groupMatchingApplicationsRepository_p = import(
        '@/backend/infrastructure/repositories/group-matching-repository'
    )
    const groupMatchingController_p = import(
        '@/backend/core/services/group-matching/controllers/controller'
    )

    const [
        { GroupMatchingApplicationsRepository },
        { GroupMatchingController }
    ] = await Promise.all([
        groupMatchingApplicationsRepository_p,
        groupMatchingController_p
    ])

    container
        .bind<IGroupMatchingApplicationsRepository>(
            TYPES.IGroupMatchingApplicationsRepository
        )
        .to(GroupMatchingApplicationsRepository)
    container
        .bind<ManageApplicationUseCase>(TYPES.ManageApplicationUseCase)
        .to(GroupMatchingController)

    return container
}

export { getDIContainer, TYPES }
