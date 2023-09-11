import { ProfileDetails } from '../models/profile-details'

export interface GetProfileUseCase {
    getDetails(id: string): Promise<ProfileDetails | null>
}
