export class UserResult {
    constructor(
        //public readonly id: string,
        public readonly username: string,
        public readonly name: string,
        public readonly surname: string,
        public readonly matchingScore: number
    ) {}
}
