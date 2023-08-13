import { injectable } from 'inversify'
import { IUsersRepository, userId } from './interfaces'

@injectable()
export class UsersRepository implements IUsersRepository {
    checkUserExistence(userId: userId): Promise<boolean> {
        throw new Error('Method not implemented.')
    }
    getGitHubId(userId: userId): Promise<number> {
        throw new Error('Method not implemented.')
    }
}
