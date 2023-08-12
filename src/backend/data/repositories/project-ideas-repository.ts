import { GitHubApp } from "@/backend/connectors/network/github-app";
import { injectable } from "inversify";
import { IProjectIdeasRepository, repoDetails } from "./interfaces/i-project-ideas-repository";
import { ProjectIdea } from "../dtos/project-idea";

@injectable()
export class ProjectIdeasRepository implements IProjectIdeasRepository {
    private readonly repoVer = 'v0.1.0'

    async create(projectIdea: ProjectIdea): Promise<repoDetails> {
        // Create repository
        const { id, nodeId, name: repoName } = await this.createRepoREST(projectIdea)

        // Upload idea
        const NEW_BRANCH_NAME = 'review'
        await this.createNewBranch(repoName, NEW_BRANCH_NAME)
        await this.uploadIdea(repoName, projectIdea.readmeBase64, NEW_BRANCH_NAME)

        // Add tags (topics) to the repository
        const PROJECT_IDEA_REPO_TAG = 'idea'
        this.addTags(repoName, [...projectIdea.tags, PROJECT_IDEA_REPO_TAG]).then(() => console.log('addTags END'))

        return { id, nodeId, name: repoName }
    }

    assignContributor(projectRepoId: number, contributorId: number): Promise<undefined> {
        throw new Error("Method not implemented.");
    }

    async assignWebhook(repoName: string, endpointUrl: string): Promise<undefined> {
        const ghApp = await GitHubApp.instance
        ghApp.request('POST /repos/{owner}/{repo}/hooks', {
            owner: 'Coder-Connection', repo: repoName,
            name: 'web', active: true,
            events: ['push', 'repository'],
            config: {
                url: endpointUrl,
                content_type: 'json',
                insecure_ssl: '0'
            }
        })
    }

    private async createRepoREST(projectIdea: ProjectIdea): Promise<repoDetails> {
        const ghApp = await GitHubApp.instance
        const { data: {
            id, node_id: nodeId, name
        } } = await ghApp.request('POST /repos/{template_owner}/{template_repo}/generate', {
            template_owner: 'Coder-Connection',
            template_repo: 'project-idea-template',
            owner: 'Coder-Connection',
            name: projectIdea.name,
            description: projectIdea.summary,
            private: true,
        })
        return { id, name, nodeId }
    }

    // TODO delete
    private async createRepoGraphQL(projectIdea: ProjectIdea): Promise<{ name: string, nodeId: string }> {
        const ghApp = await GitHubApp.instance

        const { cloneTemplateRepository: {
            repository: { name, id: nodeId } }
        } = await ghApp.graphql(`
        mutation (
            $templateId: ID!, $orgId: ID!,
            $name: String!, $description: String, 
            $visibility: RepositoryVisibility!
        ) {
            cloneTemplateRepository(input: {
                repositoryId: $templateId, ownerId: $orgId,
                name: $name, description: $description,
                visibility: $visibility
            }) {
                repository {
                    id
                    name
                    object {
                        oid
                    }
                }
            }
        }`, {
            templateId: 'R_kgDOKCPM8Q',
            orgId: 'O_kgDOCFVemQ',
            name: projectIdea.name,
            description: projectIdea.summary,
            visibility: 'PRIVATE'
        }) as ({ cloneTemplateRepository: { repository: { name: string, id: string } } })

        return { name, nodeId }
    }

    private async createNewBranch(repoName: string, branchName: string = 'review') {
        const ghApp = await GitHubApp.instance
        // Create an init file from where the new branch will be created
        const { data: { commit: { sha } } } = await ghApp.request('PUT /repos/{owner}/{repo}/contents/{path}', {
            owner: 'Coder-Connection',
            repo: repoName,
            path: 'version.log',
            message: 'Origin',
            content: Buffer.from(this.repoVer).toString('base64')
        })
        // Create a new branch
        await ghApp.request('POST /repos/{owner}/{repo}/git/refs', {
            owner: 'Coder-Connection',
            repo: repoName,
            ref: `refs/heads/${branchName}`,
            sha: sha!,
        })
    }

    private async uploadIdea(repoName: string, readmeBase64: string, branchName = 'review') {
        const ghApp = await GitHubApp.instance
        await ghApp.request('PUT /repos/{owner}/{repo}/contents/{path}', {
            owner: 'Coder-Connection', repo: repoName,
            branch: branchName,
            path: 'README.md',
            message: 'Added project idea to review',
            content: readmeBase64
        })
    }

    private async addTags(repoName: string, tags: string[]) {
        const ghApp = await GitHubApp.instance
        ghApp.request('PUT /repos/{owner}/{repo}/topics', {
            owner: 'Coder-Connection',
            repo: repoName,
            names: tags,
        })
    }
}
