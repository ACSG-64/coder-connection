import TYPES from '@/backend/configuration/di-types/project-ideas/TYPES'
import { IProjectIdeaProposalsRepository } from '@/backend/core/services/project-ideas/repositories/i-project-idea-proposals-repository'
import { IProjectIdeasRepository } from '@/backend/core/services/project-ideas/repositories/i-project-ideas-repository'
import { CreateProjectIdeaProposalUseCase } from '@/backend/core/services/project-ideas/use-cases/create-project-idea-proposal-use-case'
import { ManageProjectIdeaUseCase } from '@/backend/core/services/project-ideas/use-cases/manage-project-idea-use-case'
import { Container } from 'inversify'

async function getDIContainer() {
    const container = new Container()
    const projectIdeaProposalsRepository_p = import(
        '@/backend/infrastructure/repositories/project-idea-proposals-repository'
    )
    const projectIdeasRepository_p = import(
        '@/backend/infrastructure/repositories/project-ideas-repository'
    )
    // ProjectIdeasController
    const projectIdeasController_p = import(
        '@/backend/core/services/project-ideas/controllers/project-ideas-controller'
    )

    const [
        { ProjectIdeaProposalsRepository },
        { ProjectIdeasRepository },
        { ProjectIdeasController }
    ] = await Promise.all([
        projectIdeaProposalsRepository_p,
        projectIdeasRepository_p,
        projectIdeasController_p
    ])

    container
        .bind<IProjectIdeaProposalsRepository>(
            TYPES.IProjectIdeaProposalsRepository
        )
        .to(ProjectIdeaProposalsRepository)
    container
        .bind<IProjectIdeasRepository>(TYPES.IProjectIdeasRepository)
        .to(ProjectIdeasRepository)
    container
        .bind<ManageProjectIdeaUseCase>(TYPES.ManageProjectIdeaUseCase)
        .to(ProjectIdeasController)

    return container
}

export { getDIContainer, TYPES }
