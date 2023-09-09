export class GetProjectsQuery {
    constructor(
        public readonly page: number = 1,
        public readonly size: number
    ) {}
}
