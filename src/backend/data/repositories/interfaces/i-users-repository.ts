export type userId = string | number

export interface IUsersRepository {
    checkUserExistence(userId: userId): Promise<boolean>
    getGitHubId(userId: userId): Promise<number>
}