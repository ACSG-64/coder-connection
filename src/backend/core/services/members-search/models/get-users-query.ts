export abstract class GetUsersQuery {
    constructor(
        public readonly userId: string,
        public readonly userQuery?: string
    ) {}
}
