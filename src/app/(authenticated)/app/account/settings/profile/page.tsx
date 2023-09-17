import { Large, Paragraph } from '@/components/ui/typography'
import ProfileForm from './components/form'
import { SkillsDAO } from '@/backend/infrastructure/daos/skills-dato'
import { getServerSession } from 'next-auth/next'
import options from '@/app/api/auth/[...nextauth]/options'
import { TYPES, getDIContainer } from './config/di-container'
import { GetProfileUseCase } from '@/backend/core/services/profiles/use-cases/get-profile-use-case'
import { Metadata } from 'next'
import { TimeZonesDAO } from '@/backend/infrastructure/daos/time-zones-dao'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import Image from 'next/image'
import { GitHubDetails } from './components/github-details'

export const metadata: Metadata = {
    title: 'Settings / Profile - CoderConnection',
    description: 'Generated by create next app'
}

export const dynamic = 'force-dynamic'
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
    const {
        name,
        surname,
        description,
        competencies,
        interests,
        timeZone,
        linkedInUrl,
        username,
        profileImg,
        gitHubProfileUrl
    } = profile
    const skills = await new SkillsDAO().getAll()
    const timeZones = await new TimeZonesDAO().getAll()
    const skillTags = skills.map(({ id, name }) => ({ id, name }))
    const timeZonesTags = timeZones.map(({ id, name }) => ({ id, name }))
    const competencyTags = competencies.map(({ id, name }) => ({ id, name }))
    const interestTags = interests.map(({ id, name }) => ({ id, name }))

    return (
        <main>
            <h1>
                <Large>Personal info</Large>
            </h1>
            <section>
                <Paragraph className="mt-0 pt-0">
                    Update your personal details
                </Paragraph>
                <ProfileForm
                    skills={skillTags}
                    name={name}
                    surname={surname}
                    description={description}
                    timeZone={{ ...timeZone }}
                    linkedInUrl={linkedInUrl}
                    competencies={competencyTags}
                    interests={interestTags}
                    timeZones={timeZonesTags}
                />
            </section>
            <section className="mt-5">
                <Paragraph className="mt-0 pt-0">GitHub details</Paragraph>
                <GitHubDetails
                    username={username}
                    profileImg={profileImg}
                    gitHubProfileUrl={gitHubProfileUrl}
                />
            </section>
        </main>
    )
}
