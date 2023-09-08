import { ProjectIdeaGH } from '../models/ideas/project-idea-gh'

export enum EVENTS {
    CRATE,
    UPDATE,
    CREATE_OR_UNHIDE,
    DELETE,
    HIDE,
    UNHIDE
}

export interface ManageProjectIdeaUseCase {
    manage(event: EVENTS, idea: ProjectIdeaGH): Promise<void>
}
