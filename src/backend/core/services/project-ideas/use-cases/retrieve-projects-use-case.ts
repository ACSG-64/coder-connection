import { GetProjectsQuery } from '../models/get-projects-quety'
import { ProjectIdeaSummary } from '../models/ideas/project-ideas-summary'

export interface RetrieveProjectsUseCase {
    retrieve(query: GetProjectsQuery): Promise<ProjectIdeaSummary[]>
}
