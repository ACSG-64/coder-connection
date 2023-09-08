export class UpdateProjectIdeaCommand {
    constructor(
        public readonly ghId: number,
        public readonly name: string,
        public readonly summary: string,
        public readonly topics: string[]
    ) {}
}
