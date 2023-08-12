import TYPES from "@/backend/config/types";
import { IProjectIdeasRepository, IUsersRepository, userId } from "@/backend/data/repositories/interfaces";
import { inject, injectable } from "inversify";
import { CreateProjectIdeaUseCase } from "./interfaces";
import { ProjectIdea } from "@/backend/data/dtos/project-idea";

@injectable()
export class CreateProjectIdeaService implements CreateProjectIdeaUseCase {
    constructor(
        @inject(TYPES.IProjectIdeasRepository)
        private readonly projectIdeaRepository: IProjectIdeasRepository,
        @inject(TYPES.IUserRepository)
        private readonly userRepository: IUsersRepository
    ) { }

    async createProjectIdea(projectIdea: ProjectIdea, authorId: userId): Promise<string> {
        // Create the project idea's repository 
        const repo = await this.projectIdeaRepository.create(projectIdea)
        // Add user as a contributor, but it doesn't matter if it's unsuccessful 
        /*
        this.userRepository.getGitHubId(authorId).then((authorGhId) => {
            this.projectIdeaRepository.assignContributor(repo.id, authorGhId)
        })
        */
        // Assign webhook
        const ENDPOINT_URL = 'https://webhook-receiver.acsg.repl.co/webhook'
        this.projectIdeaRepository.assignWebhook(repo.name, ENDPOINT_URL)
        return repo.name
    }

}