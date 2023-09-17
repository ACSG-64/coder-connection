export class ProjectAttributes {
    constructor(
        public readonly ideaId: string,
        public readonly name: string,
        public readonly summary: string,
        public readonly ghId: number,
        public readonly ghNodeId: string,
        public readonly repositoryUrl: string,
        public readonly parentProjectId?: string
    ) {}
}
