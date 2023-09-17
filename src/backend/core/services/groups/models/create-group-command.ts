export class CreateGroupCommand {
    public readonly projectGhId
    public readonly projectIdeaId

    constructor(
        public readonly ownerId: string,
        public readonly groupName: string,
        projectGhId: number,
        projectIdeaId: number
    ) {
        this.projectGhId = Number(projectGhId)
        this.projectIdeaId = Number(projectIdeaId)
    }
}
