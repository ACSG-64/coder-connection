import { App, Octokit } from "octokit"

export class GitHubApp {
    private static _instance: Promise<Octokit>

    constructor() {
        GitHubApp.createOctokit()
    }

    private static async createOctokit() {
        const {
            GITHUB_APP_PRIVATE_KEY, GITHUB_APP_ID, GITHUB_APP_INSTALLATION_ID
        } = process.env as unknown as ({
            GITHUB_APP_PRIVATE_KEY: string
            GITHUB_APP_ID: number
            GITHUB_APP_INSTALLATION_ID: number
        })
        const privateKey = Buffer.from(GITHUB_APP_PRIVATE_KEY, 'base64').toString('utf8')

        const app = new App({
            appId: `${GITHUB_APP_ID}`,
            privateKey,
        })
        this._instance = app.getInstallationOctokit(GITHUB_APP_INSTALLATION_ID)
        return this._instance
    }

    public static get instance(): Promise<Octokit> {
        return GitHubApp._instance ?? this.createOctokit()
    }
}

