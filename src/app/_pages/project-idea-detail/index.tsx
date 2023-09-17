import { ProjectIdeasRepository } from '@/backend/infrastructure/repositories/project-ideas-repository'
import MarkdownRenderer from '@/components/markdown-renderer'
import { AnchorButton } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { H1, Large } from '@/components/ui/typography'
import { redirect } from 'next/navigation'
import Tag from '@/components/tags/tag'
import { getServerLang } from '@/hooks/use-server-lang'
import { getDictionary } from './lang/dictionary'
import { LateralBar } from './components/lateral-bar'
import { AuthLateralBar } from './components/lateral-bar'

interface ProjectIdeaDetailsProps {
    ideaId: number
    authVersion?: boolean
}

export default async function ProjectIdeaDetailsPage({
    ideaId,
    authVersion = false
}: ProjectIdeaDetailsProps) {
    const projectIdea = await new ProjectIdeasRepository().get(ideaId)
    if (!projectIdea)
        redirect(authVersion ? '/app/project-ideas' : '/project-ideas')

    const lang = getServerLang()
    const dict = await getDictionary(lang)

    return (
        <div className="mx-auto mt-5 max-w-screen-xl">
            <header className="mb-3 flex items-center">
                <H1 className="flex-1 lg:text-3xl">{projectIdea.title}</H1>
                <AnchorButton
                    variant={'secondary'}
                    href={authVersion ? '/app/project-ideas' : '/project-ideas'}
                >
                    Go back
                </AnchorButton>
            </header>
            <div className="flex gap-8">
                <main className="flex-1">
                    <Card>
                        <div className="px-10 py-6">
                            {projectIdea && (
                                <MarkdownRenderer
                                    markdown={projectIdea.contents}
                                />
                            )}
                        </div>
                    </Card>
                </main>
                <aside className="w-full max-w-sm">
                    <div className="flex w-full flex-col gap-3">
                        {authVersion ? (
                            <AuthLateralBar
                                slackUrl={projectIdea?.slackUrl!}
                                ideaId={ideaId}
                            />
                        ) : (
                            <LateralBar />
                        )}
                        {/* Topics */}
                        <div>
                            <Large className="mb-1">Topics</Large>
                            <div className="flex flex-wrap gap-3">
                                {projectIdea.topics.map(({ id, name }) => (
                                    <Tag key={id} id={id} name={name} />
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}
