import { ProjectIdea } from "@/backend/data/dtos/project-idea";
import { userId } from "@/backend/data/repositories/interfaces";

export interface CreateProjectIdeaUseCase {
    createProjectIdea(projectIdea: ProjectIdea, authorId: userId): Promise<string>
}