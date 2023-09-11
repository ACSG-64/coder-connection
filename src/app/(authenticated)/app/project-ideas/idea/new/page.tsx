import { AnchorButton } from '@/components/ui/button'
import NewIdeaForm from './components/form'
import { H1 } from '@/components/ui/typography'
import { TopicsDAO } from '@/backend/infrastructure/daos/topics-dao'

export default async function NewIdea() {
    const topics = await new TopicsDAO().getAll()
    const topicTags = topics.map(({ id, name }) => ({ id, name }))

    return (
        <main>
            <div className="mb-8 flex items-center">
                <H1 className="flex-1 lg:text-3xl">
                    Suggest a new project idea
                </H1>
                <AnchorButton href="/app/project-ideas" variant={'secondary'}>
                    Go back
                </AnchorButton>
            </div>
            <NewIdeaForm topics={topicTags} />
        </main>
    )
}
