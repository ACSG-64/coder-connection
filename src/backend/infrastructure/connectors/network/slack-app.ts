import { WebClient } from '@slack/web-api'

export class SlackApp {
    private static _instance: WebClient

    constructor() {
        SlackApp.createSlackApp()
    }

    private static createSlackApp() {
        this._instance = new WebClient(process.env.SLACK_BOT_TOKEN)
        return this._instance
    }

    public static get instance() {
        return this._instance ?? this.createSlackApp()
    }
}
