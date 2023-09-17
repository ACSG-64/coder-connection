import ProjectCard from '@/components/cards/project-card'
import { Separator } from '@/components/ui/separator'
import { H2 } from '@/components/ui/typography'
import { getServerLang } from '@/hooks/use-server-lang'
import { getDictionary } from './lang/dictionary'
import { TYPES, getDIContainer } from './config/di-container'
import { GetProfileUseCase } from '@/backend/core/services/profiles/use-cases/get-profile-use-case'
import { cache } from 'react'
import { ProfileDetailsSection } from './components/profile-section'
import { CardsGridContainer } from '@/components/cards/cards-grid-container'

const projects = new Array(7).fill(
    <ProjectCard title="New idea" summary="A short summary" url="#" />
)

interface RouteProps {
    username: string
}

const getUserDetails = cache(async (username: string) => {
    const container = await getDIContainer()
    const getProfileUseCase = container.get<GetProfileUseCase>(
        TYPES.GetProfileUseCase
    )
    const profile = await getProfileUseCase.getDetailsByUsername(username)
    return profile
})

export async function generateMetadata({ username }: RouteProps) {
    let fullName = 'Member'
    const profile = await getUserDetails(username)
    if (profile) fullName = `${profile.name} ${profile.surname}`
    return {
        title: `${fullName}'s profile – CoderConnection`
    }
}

export async function ProfilePage({ username }: RouteProps) {
    const container = await getDIContainer()
    const profile = await getUserDetails(username)
    if (!profile) {
        // TODO REDIRECT
        return
    }
    const lang = getServerLang()
    const dict = await getDictionary(lang)

    return (
        <main>
            <ProfileDetailsSection username={username} />
            <Separator className="my-5" />
            {/* Member contributions */}
            <section>
                <H2 className="lg:text-2xl">{dict.contributions}</H2>
                <CardsGridContainer>
                    {projects.map((project) => project)}
                </CardsGridContainer>
            </section>
        </main>
    )
}
