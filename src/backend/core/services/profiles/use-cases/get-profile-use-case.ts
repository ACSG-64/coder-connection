import { ProfileDetails } from '../models/profile-details'

export interface GetProfileUseCase {
    getDetails(id: string): Promise<ProfileDetails | null>
    getDetailsByUsername(username: string): Promise<ProfileDetails | null>
}
