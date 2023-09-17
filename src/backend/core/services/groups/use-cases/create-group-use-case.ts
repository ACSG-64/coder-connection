import { CreateGroupCommand } from '../models/create-group-command'

export interface CreateGroupUseCase {
    create(command: CreateGroupCommand): Promise<number>
}
