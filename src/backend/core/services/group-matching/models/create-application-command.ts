import { ProjectIdeaTagDTO } from '@/backend/core/shared/dtos/project-idea-tag-dto'
import { SkillDTO } from '@/backend/core/shared/dtos/skill-dto'
import { groupMatchingFormSchema } from '../schemas/group-matching-form'

export class CreateApplicationCommand {
    public readonly skills: SkillDTO[]
    public readonly projectIdeas: ProjectIdeaTagDTO[]
    constructor(
        public readonly userId: string,
        projectIdeas: ProjectIdeaTagDTO[],
        skills: SkillDTO[]
    ) {
        const v = groupMatchingFormSchema.parse({
            projectIdeas: projectIdeas.map(({ id, name }) => ({ id, name })),
            skills: skills.map(({ id, name }) => ({ id, name }))
        })

        this.skills = v.skills
        this.projectIdeas = v.projectIdeas
    }
}
