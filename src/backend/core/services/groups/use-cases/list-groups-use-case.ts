import { GroupDetails } from '../models/group-details'
import { GroupsByMemberQuery } from '../models/groups-by-member-query'

export interface ListGroupsUseCase {
    listByMember(query: GroupsByMemberQuery): Promise<GroupDetails[]>
}
