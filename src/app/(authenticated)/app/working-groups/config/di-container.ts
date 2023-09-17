import TYPES from '@/backend/configuration/di-types/groups/TYPES'
import { IGroupsRepository } from '@/backend/core/services/groups/repositories/i-groups-repository'
import { ListGroupsUseCase } from '@/backend/core/services/groups/use-cases/list-groups-use-case'
import { Container } from 'inversify'

async function getDIContainer() {
    const container = new Container()

    const accountsRepository_p = import(
        '@/backend/infrastructure/repositories/groups-repository'
    )
    const registerUserController_p = import(
        '@/backend/core/services/groups/controllers/controller'
    )
    const [{ GroupsRepository }, { Controller }] = await Promise.all([
        accountsRepository_p,
        registerUserController_p
    ])

    container
        .bind<IGroupsRepository>(TYPES.IGroupsRepository)
        .to(GroupsRepository)
    container.bind<ListGroupsUseCase>(TYPES.ListGroupsUseCase).to(Controller)

    return container
}

export { getDIContainer, TYPES }
