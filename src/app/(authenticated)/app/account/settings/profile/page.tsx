import { Large, Paragraph } from '@/components/ui/typography'
import ProfileForm from './components/form'
import { SkillsDAO } from '@/backend/infrastructure/daos/skills-dato'
import { getServerSession } from 'next-auth/next'
import options from '@/app/api/auth/[...nextauth]/options'
import { TYPES, getDIContainer } from './config/di-container'
import { GetProfileUseCase } from '@/backend/core/services/profiles/use-cases/get-profile-use-case'

export default async function Profile() {
    const session = await getServerSession(options)
    const container = await getDIContainer()
    const getProfileUseCase = container.get<GetProfileUseCase>(
        TYPES.GetProfileUseCase
    )
    const profile = await getProfileUseCase.getDetails(session?.user.id)
    if (!profile) {
        // TODO REDIRECT
        return
    }
    const { name, surname, description, competencies, interests } = profile
    const skills = await new SkillsDAO().getAll()
    const skillTags = skills.map(({ id, name }) => ({ id, name }))

    return (
        <>
            <Large>Personal info</Large>
            <div>
                <Paragraph className="mt-0 pt-0">
                    Update your personal details
                </Paragraph>
            </div>
            <ProfileForm
                skills={skillTags}
                name={name}
                surname={surname}
                description={description}
                competencies={competencies}
                interests={interests}
            />
        </>
    )
}
