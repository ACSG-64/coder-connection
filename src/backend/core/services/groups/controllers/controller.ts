import { CreateGroupCommand } from '../models/create-group-command'
import { inject, injectable } from 'inversify'
import type { IGroupsRepository } from '../repositories/i-groups-repository'
import TYPES from '@/backend/configuration/di-types/groups/TYPES'
import { GroupSummary } from '../models/group-summary'
import { ProjectAttributes } from '../models/project-attributes'
import { CreateGroupUseCase } from '../use-cases/create-group-use-case'
import { getUser } from '@/backend/core/shared/get-user'
import { GitHubApp } from '@/backend/infrastructure/connectors/network/github-app'
import { CustomError } from '@/constants/custom-error'
import ErrorCodes from '@/constants/error-codes'
import { ListGroupsUseCase } from '../use-cases/list-groups-use-case'
import { GroupsByMemberQuery } from '../models/groups-by-member-query'

@injectable()
export class Controller implements CreateGroupUseCase, ListGroupsUseCase {
    constructor(
        @inject(TYPES.IGroupsRepository)
        private readonly groupsRepo: IGroupsRepository
    ) {}

    async create({
        ownerId,
        groupName,
        projectIdeaId,
        projectGhId
    }: CreateGroupCommand) {
        // Get the user
        const user = await getUser(ownerId)
        if (!user) {
            throw new CustomError(
                ErrorCodes.USER_NOT_EXIST,
                "The owner doesn't exist"
            )
        }

        // Get details about the project repository
        const ghApp = await GitHubApp.instance
        const repositoryRes = (await ghApp.request(
            'GET /repositories/{repository_id}',
            {
                repository_id: projectGhId
            }
        )) as any
        if (repositoryRes.status !== 200) {
            throw new CustomError(
                ErrorCodes.INVALID_REPOSITORY,
                "The selected repository doesn't exist"
            )
        }

        const {
            id,
            node_id,
            name,
            description,
            fork,
            owner,
            source,
            html_url,
            parent
        } = repositoryRes.data
        // Check if the repository is a fork and if it is related with the user and project idea
        if (
            !fork ||
            owner.id !== user.gitHubId ||
            source.id !== projectIdeaId
        ) {
            throw new CustomError(
                ErrorCodes.INVALID_REPOSITORY,
                'This repository is not valid'
            )
        }

        // Prepare the project attributes
        const project = new ProjectAttributes(
            source.id,
            name,
            description,
            id,
            node_id,
            html_url,
            parent.id != source.id ? parent.id : null
        )

        // Create the group and the project
        const group = new GroupSummary(groupName, '')
        const groupId = await this.groupsRepo.create(ownerId, group, project)

        return groupId
    }

    async listByMember(query: GroupsByMemberQuery) {
        return await this.groupsRepo.getByMemberId(query.memberId)
    }
}
