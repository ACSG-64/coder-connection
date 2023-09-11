import { CreateProjectIdeaProposalCommand } from '../models/create-project-idea-proposal'

export interface CreateProjectIdeaProposalUseCase {
    createProposal(newIdea: CreateProjectIdeaProposalCommand): Promise<string>
}
