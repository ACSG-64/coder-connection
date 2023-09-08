import { GitHubApp } from '@/backend/infrastructure/connectors/network/github-app'
import { User } from '@/backend/infrastructure/sequelize/models'

export async function getGitHubNameByGhId(userId: string) {
    const userNodeId = await User.findByPk(userId, {
        attributes: ['gitHubNodeId']
    })
    if (!userNodeId) return
    return getGitHubNameByGhNodeId(userNodeId.gitHubNodeId)
}

export async function getGitHubNameByGhNodeId(userNodeId: string) {
    const ghApp = await GitHubApp.instance
    const response = (await ghApp.graphql(
        `query ($nodeId: ID!) {
            node(id: $nodeId) {
                ... on User {
                    login
                }
            }
        }`,
        { nodeId: userNodeId }
    )) as { node?: { login?: string } }
    const ghUserName = response?.node?.login
    return ghUserName
}
