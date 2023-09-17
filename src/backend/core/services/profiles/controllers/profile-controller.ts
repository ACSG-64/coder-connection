import { UpdateProfileCommand } from '../models/update-profile-command'
import { inject, injectable } from 'inversify'
import type { IProfilesRepository } from '../repositories/i-profiles-repository'
import TYPES from '@/backend/configuration/di-types/profiles/TYPES'
import { UpdateProfileUseCase } from '../use-cases/update-profile-use-case'
import { GetProfileUseCase } from '../use-cases/get-profile-use-case'
import { getUser } from '@/backend/core/shared/get-user'
import { GitHubApp } from '@/backend/infrastructure/connectors/network/github-app'
import { ProfileInternalAttributes } from '../models/profile-internal-attributes'
import { ProfileGitHubAttributes } from '../models/profile-github-attributes'
import { CustomError } from '@/constants/custom-error'
import { ErrorCode } from '@slack/web-api'
import ErrorCodes from '@/constants/error-codes'

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

    async getDetailsByUsername(username: string) {
        return await this.profiledRepo.getByUsername(username)
    }

    async updateDetails({ userId, ...props }: UpdateProfileCommand) {
        const profileDetails = new ProfileInternalAttributes({ ...props })
        this.profiledRepo.update(userId, profileDetails)
    }

    async syncGitHubDetails(userId: string) {
        const user = await getUser(userId)
        if (!user)
            throw new CustomError(ErrorCodes.USER_NOT_EXIST, 'User not found')
        const ghApp = await GitHubApp.instance
        const ghRes = (await ghApp.graphql(
            `query UserInfo($nodeID: ID!) {
                node(id: $nodeID) {
                    ... on User {
                        login
                        avatarUrl,
                        url
                    }
                }
            }`,
            { nodeID: user.gitHubNodeId }
        )) as any
        if (!ghRes)
            throw new CustomError(
                ErrorCodes.USER_NOT_EXIST,
                'There is no a valid associated GitHub account'
            )
        const {
            login: username,
            avatarUrl: profileImgUrl,
            url: profileUrl
        } = ghRes
        const details = new ProfileGitHubAttributes(
            username,
            profileUrl,
            profileImgUrl
        )
        this.profiledRepo.updateGitHubDetails(userId, details)
        return details
    }
}
