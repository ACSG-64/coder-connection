import IdeaCard from '@/components/cards/idea-card'
import { AnchorButton } from '@/components/ui/button'
import { H1 } from '@/components/ui/typography'
import { TYPES, getDIContainer } from './config/di-container'
import { GetProjectsQuery } from '@/backend/core/services/project-ideas/models/get-projects-quety'
import { RetrieveProjectsUseCase } from '@/backend/core/services/project-ideas/use-cases/retrieve-projects-use-case'
import { Suspense } from 'react'
import { Metadata } from 'next'
import { LoadingCardsSkeleton } from '../../../components/skeletons/loading-cards-skeleton'
import { CardsGridContainer } from '@/components/cards/cards-grid-container'

export const metadata: Metadata = {
    title: 'Project ideas - CoderConnection',
    description: 'A collection of project ideas to implement'
}

interface ProjectIdeasListPageProps {
    authVersion?: boolean
}

export default function ProjectIdeasListPage({
    authVersion = false
}: ProjectIdeasListPageProps) {
    return (
        <main className="'mx-auto mt-5'">
            <header className="mb-8 flex items-center">
                <H1 className="flex-1 text-3xl lg:text-3xl">Project ideas</H1>
                {authVersion && (
                    <AnchorButton href="/app/project-ideas/idea/new">
                        Propose a project
                    </AnchorButton>
                )}
            </header>
            <section>
                <CardsGridContainer>
                    <Suspense fallback={<LoadingCardsSkeleton />}>
                        <ProjectIdeasList authVersion={authVersion} />
                    </Suspense>
                </CardsGridContainer>
            </section>
        </main>
    )
}

async function ProjectIdeasList({
    authVersion = false
}: {
    authVersion: boolean
}) {
    const container = await getDIContainer()
    const retrieveProjectsUseCase = container.get<RetrieveProjectsUseCase>(
        TYPES.RetrieveProjectsUseCase
    )
    const query = new GetProjectsQuery(0, 0)
    const res = await retrieveProjectsUseCase.retrieve(query)

    return (
        <>
            {res.map(({ title, summary, topics, ghId }) => {
                const tags = topics.map(({ id, name }) => ({ id, name }))
                const url = `${
                    authVersion ? '/app' : ''
                }/project-ideas/idea/${ghId}`
                return (
                    <IdeaCard
                        key={ghId}
                        title={title}
                        summary={summary}
                        topics={tags}
                        url={url}
                    />
                )
            })}
        </>
    )
}
