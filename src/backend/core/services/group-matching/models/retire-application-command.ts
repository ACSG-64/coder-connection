export class RetireApplicationCommand {
    constructor(
        public readonly userId: string,
        public readonly applicationId: string
    ) {}
}
