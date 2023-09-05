import { CreateNewMemberCommand } from '../models/create-new-member-command'

export interface RegisterUserUseCase {
    register(newMember: CreateNewMemberCommand): Promise<string>
}
