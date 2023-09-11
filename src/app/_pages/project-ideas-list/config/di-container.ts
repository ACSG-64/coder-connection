import TYPES from '@/backend/configuration/di-types/project-ideas/TYPES'
import { IProjectIdeasRepository } from '@/backend/core/services/project-ideas/repositories/i-project-ideas-repository'
import { RetrieveProjectsUseCase } from '@/backend/core/services/project-ideas/use-cases/retrieve-projects-use-case'
import { Container } from 'inversify'
import { cache } from 'react'

/*
async function getDIContainer() {
    const container = new Container()
    const projectIdeasRepository_p = import(
        '@/backend/infrastructure/repositories/project-ideas-repository'
    )
    const projectIdeasRetrieverController_p = import(
        '@/backend/core/services/project-ideas/controllers/project-ideas-retriever-controller'
    )

    const [{ ProjectIdeasRepository }, { ProjectIdeasRetrieverController }] =
        await Promise.all([
            projectIdeasRepository_p,
            projectIdeasRetrieverController_p
        ])

    container
        .bind<IProjectIdeasRepository>(TYPES.IProjectIdeasRepository)
        .to(ProjectIdeasRepository)
    container
        .bind<RetrieveProjectsUseCase>(TYPES.RetrieveProjectsUseCase)
        .to(ProjectIdeasRetrieverController)

    return container
}
*/

const getDIContainer = cache(async () => {
    const container = new Container()
    const projectIdeasRepository_p = import(
        '@/backend/infrastructure/repositories/project-ideas-repository'
    )
    const projectIdeasRetrieverController_p = import(
        '@/backend/core/services/project-ideas/controllers/project-ideas-retriever-controller'
    )

    const [{ ProjectIdeasRepository }, { ProjectIdeasRetrieverController }] =
        await Promise.all([
            projectIdeasRepository_p,
            projectIdeasRetrieverController_p
        ])

    container
        .bind<IProjectIdeasRepository>(TYPES.IProjectIdeasRepository)
        .to(ProjectIdeasRepository)
    container
        .bind<RetrieveProjectsUseCase>(TYPES.RetrieveProjectsUseCase)
        .to(ProjectIdeasRetrieverController)

    return container
})

export { getDIContainer, TYPES }
