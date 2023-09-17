import { CreateApplicationCommand } from '../models/create-application-command'
import { RetireApplicationCommand } from '../models/retire-application-command'

export interface ManageApplicationUseCase {
    apply(cmd: CreateApplicationCommand): Promise<number>
    retire(CMD: RetireApplicationCommand): Promise<void>
}
