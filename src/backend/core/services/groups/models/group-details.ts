type projectIdea = {
    id: number
    name: string
}

type params = {
    id: string
    name: string
    projectRepo: string
    slackId: string
    idea: projectIdea
}

export class GroupDetails {
    public readonly id: string
    public readonly name: string
    public readonly projectRepo: string
    public readonly slackId: string
    public readonly idea: projectIdea

    constructor({ id, name, projectRepo, slackId, idea }: params) {
        this.id = id
        this.name = name
        this.projectRepo = projectRepo
        this.slackId = slackId
        this.idea = idea
    }
}
