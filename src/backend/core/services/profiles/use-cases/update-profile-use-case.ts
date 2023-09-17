import { ProfileGitHubAttributes } from '../models/profile-github-attributes'
import { UpdateProfileCommand } from '../models/update-profile-command'

export interface UpdateProfileUseCase {
    updateDetails(details: UpdateProfileCommand): Promise<void>
    syncGitHubDetails(userId: string): Promise<ProfileGitHubAttributes>
}
