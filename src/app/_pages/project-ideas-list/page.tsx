import IdeaCard from '@/components/cards/idea-card'
import { AnchorButton } from '@/components/ui/button'
import { H1 } from '@/components/ui/typography'
import { TYPES, getDIContainer } from './config/di-container'
import { GetProjectsQuery } from '@/backend/core/services/project-ideas/models/get-projects-quety'
import { RetrieveProjectsUseCase } from '@/backend/core/services/project-ideas/use-cases/retrieve-projects-use-case'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Metadata } from 'next'

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
        <>
            <div className="mb-8 flex items-center">
                <H1 className="flex-1 lg:text-3xl">Project ideas</H1>
                {authVersion && (
                    <AnchorButton href="/app/project-ideas/idea/new">
                        Propose a project
                    </AnchorButton>
                )}
            </div>

            <div
                className="mx-auto grid max-w-screen-xl auto-rows-auto grid-cols-3 gap-8"
                style={{
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'
                }}
            >
                <Suspense fallback={<ProjectIdeasListSkeleton />}>
                    <ProjectIdeasList authVersion />
                </Suspense>
            </div>
        </>
    )
}

async function ProjectIdeasList({ authVersion }: { authVersion: boolean }) {
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

function ProjectIdeasListSkeleton() {
    const skeleton = <Skeleton className="h-52" />
    const skeletons = new Array(15).fill(skeleton)
    return <>{skeletons.map((s) => s)}</>
}
