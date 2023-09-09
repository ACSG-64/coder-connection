import { inject, injectable } from 'inversify'
import type { IProjectIdeasRepository } from '../repositories/i-project-ideas-repository'
import TYPES from '@/backend/configuration/di-types/project-ideas/TYPES'
import { RetrieveProjectsUseCase } from '../use-cases/retrieve-projects-use-case'
import { GetProjectsQuery } from '../models/get-projects-quety'
import { ProjectIdeaSummary } from '../models/ideas/project-ideas-summary'

@injectable()
export class ProjectIdeasRetrieverController
    implements RetrieveProjectsUseCase
{
    constructor(
        @inject(TYPES.IProjectIdeasRepository)
        private readonly projectIdeasRepo: IProjectIdeasRepository
    ) {}

    retrieve(query: GetProjectsQuery): Promise<ProjectIdeaSummary[]> {
        return this.projectIdeasRepo.getSummaries(false)
    }
}
