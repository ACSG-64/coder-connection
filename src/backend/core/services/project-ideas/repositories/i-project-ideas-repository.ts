import { ProjectIdeaAttributes } from '../models/ideas/project-idea-attributes'
import { ProjectIdeaDetails } from '../models/ideas/project-idea-details'

export interface IProjectIdeasRepository {
    create(project: ProjectIdeaDetails): Promise<number>
    getSlackId(ideaId: number): Promise<string | void>
    update(
        projectIdeaId: number,
        attributes: ProjectIdeaAttributes
    ): Promise<void>
    checkIfExists(id: number): Promise<boolean>
    checkIfExists(name: string): Promise<boolean>
    delete(id: number): Promise<boolean>
    hide(id: number): Promise<void>
    unhide(id: number): Promise<void>
}
