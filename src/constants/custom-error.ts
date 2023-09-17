import ErrorCodes from './error-codes'

export class CustomError {
    constructor(
        public readonly code: ErrorCodes,
        public readonly message: string,
        public readonly additionalInfo?: any
    ) {}
}
