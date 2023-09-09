export abstract class ProjectIdeaCommon<T> {
    constructor(
        public readonly ghId: number,
        public readonly ghNodeId: string,
        public readonly title: string,
        public readonly summary: string,
        public readonly topics: T[]
    ) {}
}
