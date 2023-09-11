import { GitHubApp } from '@/backend/infrastructure/connectors/network/github-app'
import { CreateGroupCommand } from '../models/create-group-command'
import { User } from '@/backend/infrastructure/sequelize/models'

export class Controller {
    constructor() {}

    async create({ ownerId, repositoryName }: CreateGroupCommand) {
        const ghApp = await GitHubApp.instance

        // Get GH ID
        const res = await User.findByPk(ownerId, {
            attributes: ['gitHubId']
        })
        if (!res) return
        const repoDetails = await ghApp.request('GET /repos/{owner}/{repo}', {
            owner: '',
            repo: ''
        })

        // Confirm that is a fork
        if (!repoDetails.data.fork) return

        // Parent repo
        const parentRepo = repoDetails.data.parent!.id
        const sourceRepo = repoDetails.data.source!.id
    }
}
