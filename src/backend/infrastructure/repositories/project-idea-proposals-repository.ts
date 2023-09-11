import orm from '../connectors/database/sequelize'
import { GitHubApp } from '../connectors/network/github-app'
import { TopicDTO } from '@/backend/core/shared/dtos/topic-dto'
import { TopicsDAO } from '../daos/topics-dao'
import {
    ProjectIdea,
    ProjectIdeaDraft as _ProjectIdeaDraft,
    User
} from '../sequelize/models'
import { IProjectIdeaProposalsRepository } from '@/backend/core/services/project-ideas/repositories/i-project-idea-proposals-repository'
import { injectable } from 'inversify'
import { getGitHubNameByGhId } from '@/utils/github-username-getters'
import { ProjectIdeaProposalDetails } from '@/backend/core/services/project-ideas/models/proposals/project-idea-proposal-details'
import { ProjectIdeaProposal } from '@/backend/core/services/project-ideas/models/proposals/project-idea-proposal'

@injectable()
export class ProjectIdeaProposalsRepository
    implements IProjectIdeaProposalsRepository
{
    private readonly ghOwner: string
    private readonly projectIdeaGhTmpl: string
    private targetBranchName: string

    constructor() {
        orm.addModels([User, ProjectIdea, _ProjectIdeaDraft])
        this.targetBranchName = 'review'
        this.ghOwner = process.env.GH_OWNER_NAME ?? 'Coder-Connection'
        this.projectIdeaGhTmpl = 'project-idea-template'
    }

    /**
     *
     * @param draft
     * @returns The repository name
     */
    async create(draft: ProjectIdeaProposal): Promise<string> {
        // Extract fields
        const { title, summary, content, topics } = draft
        // Create the repository from a template
        const {
            id: ghId,
            nodeId,
            name: repoName
        } = await this.createRepository(title, summary)
        // Upload the idea
        await this.uploadIdea(repoName, content)
        // Save a reference to the repository
        await _ProjectIdeaDraft.create({ ghId, nodeId })
        // Assign webhooks to the repo
        this.assignWebhooks(repoName)
        // Add tags
        this.addTopics(repoName, topics)
        return repoName
    }

    /**
     * Assign user as a repository contributor so that the user can make changes
     * or receive feedback from moderatos if needed
     * @param ghRepository Repository name
     * @param authorId User ID
     * @returns
     */
    async assignContributor(ghRepository: string, authorId: string) {
        const ghUserName = await getGitHubNameByGhId(authorId)
        if (!ghUserName) return
        const ghApp = await GitHubApp.instance
        await ghApp.request(
            'PUT /repos/{owner}/{repo}/collaborators/{username}',
            {
                owner: this.ghOwner,
                repo: ghRepository,
                username: ghUserName,
                permission: 'pull' // can make pull request only
            }
        )
    }

    async get(id: number) {
        const result = await _ProjectIdeaDraft.findByPk(id)
        if (!result) return
        return new ProjectIdeaProposalDetails(result.ghId, result.nodeId)
    }

    async delete(id: number) {
        const p = await _ProjectIdeaDraft.destroy({
            where: { ghId: id },
            force: true
        })
        return p > 0
    }

    /**
     * Creates a new GitHub repository for the idea using a template
     * @param title Title of the repository
     * @param summary Description
     * @returns
     */
    private async createRepository(title: string, summary: string) {
        const ghApp = await GitHubApp.instance
        const {
            data: { id, node_id: nodeId, name }
        } = await ghApp.request(
            'POST /repos/{template_owner}/{template_repo}/generate',
            {
                template_owner: this.ghOwner,
                template_repo: this.projectIdeaGhTmpl,
                owner: this.ghOwner,
                name: title,
                description: summary,
                private: true
            }
        )
        return { id, nodeId, name }
    }

    /**
     * Uploads a README.md file to a repository
     * @param repoName Repository name
     * @param readme Raw string of the README, the content of the idea
     */
    private async uploadIdea(repoName: string, readme: string) {
        // Create a new branch where the file will be uploaded
        await this.createNewBranch(repoName)

        // Upload the idea
        const ghApp = await GitHubApp.instance
        const readmeBase64 = Buffer.from(readme).toString('base64')
        await ghApp.request('PUT /repos/{owner}/{repo}/contents/{path}', {
            owner: this.ghOwner,
            repo: repoName,
            branch: this.targetBranchName,
            path: 'README.md',
            message: 'Added project idea to review',
            content: readmeBase64
        })
    }

    /**
     * Creates a new branch on the selected repository.
     * @param repoName Repository name
     */
    private async createNewBranch(repoName: string) {
        const ghApp = await GitHubApp.instance
        // Create an init file from where the branches will be created
        const {
            data: {
                commit: { sha }
            }
        } = await ghApp.request('PUT /repos/{owner}/{repo}/contents/{path}', {
            owner: 'Coder-Connection',
            repo: repoName,
            path: 'origin.txt',
            message: 'Origin',
            content: Buffer.from('Origin').toString('base64')
        })

        // Create a new branch from the file that was just created
        await ghApp.request('POST /repos/{owner}/{repo}/git/refs', {
            owner: 'Coder-Connection',
            repo: repoName,
            ref: `refs/heads/${this.targetBranchName}`,
            sha: sha!
        })
    }

    /**
     * Assign webhooks for the 'repository' and 'push' events. The listeners are
     * selected from the configuration file
     * @param ghRepository Repository name
     */
    private async assignWebhooks(ghRepository: string): Promise<void> {
        const ghApp = await GitHubApp.instance
        ghApp.request('POST /repos/{owner}/{repo}/hooks', {
            owner: this.ghOwner,
            repo: ghRepository,
            name: 'web', // DO NOT CHANGE THIS VALUE
            active: true,
            events: ['repository'],
            config: {
                url: process.env.GH_WEBHOOK_CHANGE_EVENT_LISTENER,
                secret: process.env.GITHUB_WEBOOK_SECRET,
                content_type: 'json'
            }
        })

        ghApp.request('POST /repos/{owner}/{repo}/hooks', {
            owner: this.ghOwner,
            repo: ghRepository,
            name: 'web', // DO NOT CHANGE THIS VALUE
            active: true,
            events: ['push'],
            config: {
                url: process.env.GH_WEBHOOK_PUSH_EVENT_LISTENER,
                secret: process.env.GITHUB_WEBOOK_SECRET,
                content_type: 'json'
            }
        })
    }

    /**
     * Add topics using the tags passed. If a topic doesn't exist in the database
     * it won't be added
     * @param repoName Repository name
     * @param tags Tags
     */
    private async addTopics(repoName: string, tags: TopicDTO[]) {
        const topics = await new TopicsDAO().getByIds(tags.map(({ id }) => id))
        const ghApp = await GitHubApp.instance
        ghApp.request('PUT /repos/{owner}/{repo}/topics', {
            owner: this.ghOwner,
            repo: repoName,
            names: ['project-idea', ...topics.map(({ name }) => name)]
        })
    }
}
