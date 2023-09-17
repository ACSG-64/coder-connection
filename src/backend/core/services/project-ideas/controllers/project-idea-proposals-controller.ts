import { inject, injectable } from 'inversify'
import type { IProjectIdeaProposalsRepository } from '../repositories/i-project-idea-proposals-repository'
import TYPES from '@/backend/configuration/di-types/project-ideas/TYPES'
import { CreateProjectIdeaProposalUseCase } from '../use-cases/create-project-idea-proposal-use-case'
import { CreateProjectIdeaProposalCommand } from '../models/create-project-idea-proposal'
import { createReadme } from '../utils/readme-formatter'
import { ProjectIdeaProposal } from '../models/proposals/project-idea-proposal'

@injectable()
export class ProjectIdeaProposalsController
    implements CreateProjectIdeaProposalUseCase
{
    constructor(
        @inject(TYPES.IProjectIdeaProposalsRepository)
        private readonly projectIdeaProposalsRepo: IProjectIdeaProposalsRepository
    ) {}

    async createProposal(proposalCmd: CreateProjectIdeaProposalCommand) {
        const { authorId, title, summary, content, features, topics } =
            proposalCmd
        const readme = createReadme(title, summary, content, features)
        const proposal = new ProjectIdeaProposal(title, summary, readme, topics)
        const repoName = await this.projectIdeaProposalsRepo.create(proposal)
        this.projectIdeaProposalsRepo.assignContributor(repoName, authorId)
        return repoName
    }
}
