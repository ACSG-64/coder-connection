import { GenerateCodeCommand } from '../models/generate-code-command'

export interface RequestVerificationCodeUseCase {
    sendVerificationCode(assignee: GenerateCodeCommand): Promise<string>
}
