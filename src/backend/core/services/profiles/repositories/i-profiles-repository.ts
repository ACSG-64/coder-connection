import { ProfileDetails } from '../models/profile-details'

export interface IProfilesRepository {
    get(userId: string): Promise<ProfileDetails | null>
    update(userId: string, details: ProfileDetails): Promise<void>
}
