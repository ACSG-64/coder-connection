import { GetUsersBySharedCompetenciesQuery } from '../models/get-users-by-shared-competencies-query'
import { GetUsersBySharedInterestsQuery } from '../models/get-users-by-shared-interests-query'
import { UserResult } from '../models/user-result'

export interface RetrieveUsersUseCase {
    retrieve(cmd: GetUsersBySharedCompetenciesQuery): Promise<UserResult[]>
    retrieve(cmd: GetUsersBySharedInterestsQuery): Promise<UserResult[]>
}
