import { UpdateProfileCommand } from '../models/update-profile-command'

export interface UpdateProfileUseCase {
    updateDetails(details: UpdateProfileCommand): Promise<void>
}
