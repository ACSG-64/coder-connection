import { inject, injectable } from 'inversify'
import type { IMembersDirectoryRepository } from '../repositories/i-members-repository'
import { RetrieveUsersUseCase } from '../use-cases/retrieve-users-use-case'
import TYPES from '@/backend/configuration/di-types/members-directory/TYPES'
import { GetUsersBySharedCompetenciesQuery } from '../models/get-users-by-shared-competencies-query'
import { GetUsersBySharedInterestsQuery } from '../models/get-users-by-shared-interests-query'

@injectable()
export class MembersDirectoryController implements RetrieveUsersUseCase {
    constructor(
        @inject(TYPES.IMembersDirectoryRepository)
        private readonly membersDirectoryRepo: IMembersDirectoryRepository
    ) {}

    async retrieve(
        cmd: GetUsersBySharedCompetenciesQuery | GetUsersBySharedInterestsQuery
    ) {
        const { userId, userQuery } = cmd
        if (cmd instanceof GetUsersBySharedCompetenciesQuery) {
            if (!userQuery)
                return this.membersDirectoryRepo.getByCompetency(userId)
            return this.membersDirectoryRepo.getByCompetency(userId, userQuery)
        } else if (cmd instanceof GetUsersBySharedInterestsQuery) {
            if (!userQuery)
                return this.membersDirectoryRepo.getByInterests(userId)
            return this.membersDirectoryRepo.getByInterests(userId, userQuery)
        }
        return []
    }
}
