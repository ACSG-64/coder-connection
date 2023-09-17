import TYPES from '@/backend/configuration/di-types/members-directory/TYPES'
import { IMembersDirectoryRepository } from '@/backend/core/services/members-search/repositories/i-members-repository'
import { RetrieveUsersUseCase } from '@/backend/core/services/members-search/use-cases/retrieve-users-use-case'
import { Container } from 'inversify'

async function getDIContainer() {
    const container = new Container()

    const membersDirectoryController_p = import(
        '@/backend/core/services/members-search/controllers/controller'
    )
    const membersDirectoryRepository_p = import(
        '@/backend/infrastructure/repositories/members-directory-repository'
    )

    const [{ MembersDirectoryController }, { MembersDirectoryRepository }] =
        await Promise.all([
            membersDirectoryController_p,
            membersDirectoryRepository_p
        ])

    container
        .bind<RetrieveUsersUseCase>(TYPES.RetrieveUsersUseCase)
        .to(MembersDirectoryController)

    container
        .bind<IMembersDirectoryRepository>(TYPES.IMembersDirectoryRepository)
        .to(MembersDirectoryRepository)

    return container
}

export { getDIContainer, TYPES }
