import { GroupDetails } from '../models/group-details'
import { GroupSummary } from '../models/group-summary'
import { ProjectAttributes } from '../models/project-attributes'

export interface IGroupsRepository {
    /**
     * Creates a new group
     * @param leaderId the ID of the group leader
     * @param group basic attributes to create the group
     * @param project basic attributes of the project required to initialize the group
     * @returns the ID of the group
     */
    create(
        leaderId: string,
        group: GroupSummary,
        project: ProjectAttributes
    ): Promise<number>

    addApplicant(groupId: number, applicantId: string): Promise<void>
    addApplicant(
        groupId: number,
        applicantId: string,
        postId: number
    ): Promise<void>

    getByMemberId(memberId: string): Promise<GroupDetails[]>
}
