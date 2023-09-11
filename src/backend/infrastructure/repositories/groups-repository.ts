import orm from '@/backend/infrastructure/connectors/database/sequelize'
import { Project, WorkingGroup } from '../sequelize/models'

class GroupAttributes {
    constructor(
        public readonly name: string,
        public readonly description: string
    ) {}
}

class ProjectAttributes {
    constructor(
        public readonly ghId: number,
        public readonly ghNodeId: string,
        public readonly name: string,
        public readonly ideaId: string,
        public readonly baseProjectId?: string
    ) {}
}

export class GroupsRepository {
    constructor() {
        orm.addModels([WorkingGroup, Project])
    }

    async create(
        leaderId: string,
        group: GroupAttributes,
        project: ProjectAttributes
    ) {
        let baseProjectId: number | null = null
        if (project.baseProjectId) {
            const baseProjectPk = project.baseProjectId
            const baseProject = await Project.findByPk(baseProjectPk, {
                attributes: ['id']
            })
            if (baseProject) baseProjectId = baseProject.id
        }

        const i = await orm.transaction(async (t) => {
            const { id } = await WorkingGroup.create({}, { transaction: t })
        })
    }
}
