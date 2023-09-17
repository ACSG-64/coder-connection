import ApplicantsTable from './components/tables/applicants-table'
import { H1, H2 } from '@/components/ui/typography'
import { ApplicationModal } from './components/application-modal'
import ApplicationTable from './components/tables/application-table'
import { ApplicationForm } from './components/application-form'
import { SkillsDAO } from '@/backend/infrastructure/daos/skills-dato'
import { ProjectIdeasTagDAO } from '@/backend/infrastructure/daos/project-ideas-tag-dao'
import { TYPES, getDIContainer } from './config/di-container'
import { GetApplicantsUseCase } from '@/backend/core/services/group-matching/use-cases/get-applicants-use-case'
import { getSessionUser } from '@/backend/core/shared/get-user'
import { IApplicantRow } from './interfaces/i-applicant'
import { Applicant } from '@/backend/core/services/group-matching/models/applicant'

export default async function GroupsList() {
    const user = await getSessionUser()
    if (!user) return <></>
    const skills = await new SkillsDAO().getAll()
    const skillTags = skills.map(({ id, name }) => ({ id, name }))
    const projectIdeas = await new ProjectIdeasTagDAO().getAll()
    const projectIdeaTags = projectIdeas.map(({ id, name }) => ({ id, name }))

    // Get all applicants
    const container = await getDIContainer()
    const getApplicantsUseCase = container.get<GetApplicantsUseCase>(
        TYPES.GetApplicantsUseCase
    )
    const applicants = await getApplicantsUseCase.retrieve()
    let applicantRow: IApplicantRow | undefined
    let applicantRows: IApplicantRow[] = []
    for (let i = 0; i < applicants.length; i++) {
        const { applicationId, userId, username, skills, projectIdeas } =
            applicants[i]
        const row = {
            id: applicationId,
            username: username,
            skills: skills.map(({ id, name }) => ({ id, name })),
            projects: projectIdeas.map(({ id, name }) => ({ id, name }))
        }
        if (userId === user.id) applicantRow = row
        else applicantRows.push(row)
    }

    return (
        <>
            <header className="flex items-center gap-2">
                <H1 className="flex-1 text-3xl lg:text-3xl">Group matching</H1>
                {!applicantRow && (
                    <ApplicationModal>
                        <ApplicationForm
                            skills={skillTags}
                            projectIdeas={projectIdeaTags}
                        />
                    </ApplicationModal>
                )}
            </header>
            {applicantRow && (
                <>
                    <H2 className="mt-2 flex-1 text-2xl font-normal lg:text-2xl">
                        Your application
                    </H2>
                    <ApplicationTable data={applicantRow} />
                </>
            )}

            <H2 className="mt-3 flex-1 text-2xl font-normal lg:text-2xl">
                Other applicants
            </H2>
            <ApplicantsTable data={applicantRows} />
        </>
    )
}
