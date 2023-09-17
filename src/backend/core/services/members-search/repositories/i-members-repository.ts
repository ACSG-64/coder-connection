import { UserResult } from '@/backend/core/services/members-search/models/user-result'

export interface IMembersDirectoryRepository {
    getByCompetency(userId: string): Promise<UserResult[]>
    getByCompetency(userId: string, userQuery: string): Promise<UserResult[]>

    getByInterests(userId: string): Promise<UserResult[]>
    getByInterests(userId: string, userQuery: string): Promise<UserResult[]>
}
