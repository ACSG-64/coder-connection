import TYPES from '@/backend/configuration/di-types/project-ideas/TYPES'
import { IProjectIdeaProposalsRepository } from '@/backend/core/services/project-ideas/repositories/i-project-idea-proposals-repository'
import { CreateProjectIdeaProposalUseCase } from '@/backend/core/services/project-ideas/use-cases/create-project-idea-proposal-use-case'
import { Container } from 'inversify'

async function getDIContainer() {
    const container = new Container()
    const projectIdeaProposalsRepository_p = import(
        '@/backend/infrastructure/repositories/project-idea-proposals-repository'
    )
    const projectIdeaProposalsController_p = import(
        '@/backend/core/services/project-ideas/controllers/project-idea-proposals-controller'
    )

    const [
        { ProjectIdeaProposalsRepository },
        { ProjectIdeaProposalsController }
    ] = await Promise.all([
        projectIdeaProposalsRepository_p,
        projectIdeaProposalsController_p
    ])

    container
        .bind<IProjectIdeaProposalsRepository>(
            TYPES.IProjectIdeaProposalsRepository
        )
        .to(ProjectIdeaProposalsRepository)
    container
        .bind<CreateProjectIdeaProposalUseCase>(
            TYPES.CreateProjectIdeaProposalUseCase
        )
        .to(ProjectIdeaProposalsController)

    return container
}

export { getDIContainer, TYPES }
