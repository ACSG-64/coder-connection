export class CreateGroupCommand {
    constructor(
        public readonly ownerId: string,
        public readonly groupName: string,
        public readonly repositoryName: string
    ) {}
}
