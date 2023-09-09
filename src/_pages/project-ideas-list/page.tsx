import IdeaCard from '@/components/cards/idea-card'
import { AnchorButton } from '@/components/ui/button'
import { H1 } from '@/components/ui/typography'
import { TYPES, getDIContainer } from './config/di-container'
import { GetProjectsQuery } from '@/backend/core/services/project-ideas/models/get-projects-quety'
import { RetrieveProjectsUseCase } from '@/backend/core/services/project-ideas/use-cases/retrieve-projects-use-case'

interface ProjectIdeasListPageProps {
    authVersion?: boolean
}

export default async function ProjectIdeasListPage({
    authVersion = false
}: ProjectIdeasListPageProps) {
    const container = await getDIContainer()
    const retrieveProjectsUseCase = container.get<RetrieveProjectsUseCase>(
        TYPES.RetrieveProjectsUseCase
    )
    const query = new GetProjectsQuery(0, 0)
    const res = await retrieveProjectsUseCase.retrieve(query)
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
            </div>
        </>
    )
}
