import { ProjectIdea } from '../../dtos/project-idea'

export type repoDetails = { id: number; nodeId: string; name: string }

export interface IProjectIdeasRepository {
    create(projectIdea: ProjectIdea): Promise<repoDetails>
    assignContributor(
        projectRepoId: number,
        contributorId: number
    ): Promise<undefined>
    assignWebhook(
        projectRepoId: string,
        endpointUrl: string
    ): Promise<undefined>
}
