import { UpdateProfileCommand } from '../models/update-profile-command'
import { inject, injectable } from 'inversify'
import type { IProfilesRepository } from '../repositories/i-profiles-repository'
import TYPES from '@/backend/configuration/di-types/profiles/TYPES'
import { UpdateProfileUseCase } from '../use-cases/update-profile-use-case'
import { GetProfileUseCase } from '../use-cases/get-profile-use-case'

@injectable()
export class ProfileController
    implements UpdateProfileUseCase, GetProfileUseCase
{
    constructor(
        @inject(TYPES.IProfilesRepository)
        private readonly profiledRepo: IProfilesRepository
    ) {}

    async getDetails(id: string) {
        return await this.profiledRepo.get(id)
    }

    async updateDetails({ userId, profileDetails }: UpdateProfileCommand) {
        this.profiledRepo.update(userId, profileDetails)
    }
}
