import orm from '@/backend/infrastructure/connectors/database/sequelize'
import {
    GroupInvitation,
    GroupPermission,
    GroupMembership,
    MembershipPermission,
    Project,
    ProjectIdea,
    ProjectParent,
    WorkingGroup,
    GroupApplication
} from '../sequelize/models'
import { CustomError } from '@/constants/custom-error'
import ErrorCodes from '@/constants/error-codes'
import { groupPermissions } from '@/constants/group-permissions'
import { GroupSummary } from '@/backend/core/services/groups/models/group-summary'
import { ProjectAttributes } from '@/backend/core/services/groups/models/project-attributes'
import { IGroupsRepository } from '@/backend/core/services/groups/repositories/i-groups-repository'
import { injectable } from 'inversify'
import { GroupDetails } from '@/backend/core/services/groups/models/group-details'

@injectable()
export class GroupsRepository implements IGroupsRepository {
    constructor() {
        orm.addModels([
            WorkingGroup,
            Project,
            ProjectIdea,
            ProjectParent,
            GroupPermission,
            MembershipPermission,
            GroupInvitation,
            GroupApplication
        ])
    }

    async create(
        leaderId: string,
        group: GroupSummary,
        project: ProjectAttributes
    ) {
        // Check if the project idea exists
        const projectIdea = await ProjectIdea.findByPk(project.ideaId, {
            attributes: ['id']
        })
        if (!projectIdea) {
            throw new CustomError(
                ErrorCodes.NO_PROJECT_IDEA,
                "The selected project idea doesn't exist"
            )
        }

        // Check if the project already exists
        const existingProjects = await Project.findByPk(project.ghId, {
            attributes: ['id']
        })
        if (existingProjects) {
            throw new CustomError(
                ErrorCodes.CONFLICT,
                'The project already exists'
            )
        }

        // Check if the parent project exists
        let parentProject: Project | null = null
        if (project.parentProjectId != undefined) {
            parentProject = await Project.findByPk(project.parentProjectId, {
                attributes: ['id', 'isPublic']
            })
            if (parentProject && !parentProject.isPublic) {
                throw new CustomError(
                    ErrorCodes.PARENT_PROJECT_PRIVATE,
                    'The parent project exists but it is private'
                )
            }
        }

        // Find the role for the leader
        const permission = await GroupPermission.findOne({
            where: { name: groupPermissions.canManage },
            attributes: ['id']
        })
        // TODO add a custom exception
        if (!permission) return

        /* Create the working group */
        const t = await orm.transaction()
        try {
            /* Create the working group */
            const { id: workingGroupId } = await WorkingGroup.create(
                { name: group.name, description: group.description },
                { transaction: t }
            )

            /* Create the invitation code */
            await GroupInvitation.create({ workingGroupId }, { transaction: t })

            /* Membership setup */
            // Create the membership
            const { id: membershipId } = await GroupMembership.create(
                { workingGroupId, memberId: leaderId },
                { transaction: t }
            )
            // Assign permission
            await MembershipPermission.create(
                { membershipId, permissionId: permission.id },
                { transaction: t }
            )

            /* Project setup */
            // Create the project
            const { name, summary, ghId, ghNodeId, repositoryUrl } = project
            const _project = await Project.create(
                {
                    name,
                    summary,
                    gitHubId: ghId,
                    gitHubNodeId: ghNodeId,
                    repoUrl: repositoryUrl,
                    isDerivate: project.parentProjectId != undefined,
                    workingGroupId,
                    projectIdeaId: projectIdea.id
                },
                { transaction: t }
            )
            // Create the association between projects
            if (parentProject != null) {
                await ProjectParent.create(
                    {
                        projectId: _project.id,
                        parentProjectId: parentProject.id
                    },
                    { transaction: t }
                )
            }
            t.commit()
            return workingGroupId
        } catch (e) {
            t.rollback()
            throw new CustomError(
                ErrorCodes.PROJECT_CREATION_ERROR,
                'There was an error while creating the group'
            )
        }
    }

    async getDetails(id: string) {
        const res = await WorkingGroup.findByPk(id, {
            include: Project
        })
    }

    async update(id: string) {}

    async addApplicant(groupId: number, applicantId: string, postId?: number) {
        if (!postId) {
            const application = await WorkingGroup.findOne({
                where: { userId: applicantId, groupId: groupId }
            })
            if (application) return
            await WorkingGroup.create({
                userId: applicantId,
                groupId: groupId
            })
            return
        }
        const application = await WorkingGroup.findOne({
            where: { userId: applicantId, groupId: groupId }
        })
        if (application) {
            await WorkingGroup.update(
                { talentPostId: postId },
                { where: { userId: applicantId, groupId: groupId } }
            )
        } else {
            await WorkingGroup.create({
                userId: applicantId,
                groupId: groupId,
                talentPostId: postId
            })
        }
    }

    async getIdByInvitation(invitation: string) {}

    async getByMemberId(memberId: string) {
        const res = await GroupMembership.findAll({
            where: { memberId },
            attributes: ['id'],
            include: [
                {
                    model: WorkingGroup,
                    attributes: ['id', 'name'],
                    include: [
                        {
                            model: Project,
                            attributes: ['gitHubRepositoryUrl'],
                            include: [
                                {
                                    model: ProjectIdea,
                                    attributes: ['id', 'name']
                                }
                            ]
                        }
                    ]
                }
            ]
        })
        console.log('>>>>>>>>>>>>>>>>>>>>')
        console.log(
            res.map(({ dataValues }) => {
                console.log('1', dataValues)
                console.log('2', dataValues.workingGroup.dataValues)
                console.log('3', dataValues.workingGroup.project.dataValues)
                console.log(
                    '4',
                    dataValues.workingGroup.project.dataValues.projectIdea
                        .dataValues
                )
            })
        )
        console.log(Object.keys(res))

        if (!res) return []

        return res.map(({ dataValues }) => {
            const {
                id,
                name,
                slackId = '',
                project
            } = dataValues.workingGroup.dataValues
            const { gitHubRepositoryUrl: projectRepo, projectIdea } =
                project.dataValues
            const { id: ideaId, name: ideaName } = projectIdea.dataValues
            return new GroupDetails({
                id,
                name,
                slackId,
                projectRepo,
                idea: { id: ideaId, name: ideaName }
            })
        })
    }
}
