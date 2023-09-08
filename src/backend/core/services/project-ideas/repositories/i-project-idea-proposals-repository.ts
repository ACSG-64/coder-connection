import { ProjectIdeaProposal } from '../models/proposals/project-idea-proposal'
import { ProjectIdeaProposalDetails } from '../models/proposals/project-idea-proposal-details'

export interface IProjectIdeaProposalsRepository {
    create(draft: ProjectIdeaProposal): Promise<string>
    /**
     * Assign user as a repository contributor so that the user can make changes
     * or receive feedback from moderatos if needed
     * @param ghRepository Repository name
     * @param authorId User ID
     * @returns
     */
    assignContributor(ghRepository: string, authorId: string): Promise<void>
    get(id: number): Promise<ProjectIdeaProposalDetails | void>
    delete(id: number): Promise<boolean>
}
