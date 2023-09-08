import { Container } from 'inversify'
import TYPES from '@/backend/configuration/di-types/register-user/TYPES'
import {
    IAccountsRepository,
    RegisterUserUseCase
} from '@/backend/configuration/interfaces'

async function getDIContainer() {
    const container = new Container()

    const accountsRepository_p = import(
        '@/backend/infrastructure/repositories/accounts-repository'
    )
    const registerUserController_p = import(
        '@/backend/core/services/register-user/controllers/register-user-controller'
    )
    const [{ AccountsRepository }, { RegisterUserController }] =
        await Promise.all([accountsRepository_p, registerUserController_p])

    container
        .bind<IAccountsRepository>(TYPES.IAccountsRepository)
        .to(AccountsRepository)
    container
        .bind<RegisterUserUseCase>(TYPES.RegisterUserUseCase)
        .to(RegisterUserController)

    return container
}

const DIContainer = getDIContainer()

export { DIContainer, TYPES }
