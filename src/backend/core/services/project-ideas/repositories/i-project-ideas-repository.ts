import { ProjectIdea } from '../models/ideas/project-idea'
import { ProjectIdeaModifiableAttributes } from '../models/ideas/project-idea-modfiable-attributes'
import { ProjectIdeaDetails } from '../models/ideas/project-idea-details'
import { ProjectIdeaSummary } from '../models/ideas/project-ideas-summary'

export interface IProjectIdeasRepository {
    create(project: ProjectIdeaDetails): Promise<number>
    get(id: number): Promise<ProjectIdea | void>
    getSummaries(includePrivates: boolean): Promise<ProjectIdeaSummary[]>
    getSummaries(
        includePrivates: boolean,
        offset: number,
        limit: number
    ): Promise<ProjectIdeaSummary[]>
    getSlackId(ideaId: number): Promise<string | void>
    update(
        projectIdeaId: number,
        attributes: ProjectIdeaModifiableAttributes
    ): Promise<void>
    checkIfExists(id: number): Promise<boolean>
    checkIfExists(name: string): Promise<boolean>
    delete(id: number): Promise<boolean>
    hide(id: number): Promise<void>
    unhide(id: number): Promise<void>
}
