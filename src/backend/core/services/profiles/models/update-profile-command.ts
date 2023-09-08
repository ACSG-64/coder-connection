import { SkillDTO } from '@/backend/core/shared/dtos/skill-dto'
import { ProfileDetails } from './profile-details'

export class UpdateProfileCommand {
    public readonly profileDetails: ProfileDetails

    constructor(
        public readonly userId: string,
        name: string,
        surname: string,
        description: string,
        linkedInUrl: string = '',
        skills: SkillDTO[] = [],
        interests: SkillDTO[] = []
    ) {
        this.profileDetails = new ProfileDetails(
            name,
            surname,
            description,
            linkedInUrl,
            skills,
            interests
        )
    }
}
