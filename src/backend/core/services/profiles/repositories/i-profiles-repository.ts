import { ProfileDetails } from '../models/profile-details'
import { ProfileGitHubAttributes } from '../models/profile-github-attributes'
import { ProfileInternalAttributes } from '../models/profile-internal-attributes'

export interface IProfilesRepository {
    get(userId: string): Promise<ProfileDetails | null>
    getByUsername(username: string): Promise<ProfileDetails | null>
    update(userId: string, details: ProfileInternalAttributes): Promise<void>
    updateGitHubDetails(
        userId: string,
        details: ProfileGitHubAttributes
    ): Promise<void>
}
