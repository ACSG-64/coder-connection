export class VerificationCode {
    constructor(
        public readonly code: string,
        public readonly expiresAt: Date
    ) {}
}
