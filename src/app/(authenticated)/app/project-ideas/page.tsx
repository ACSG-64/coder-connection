import IdeaCard from '@/components/cards/idea-card'
import { AnchorButton } from '@/components/ui/button'
import { H1 } from '@/components/ui/typography'

const arr = new Array(50)
arr.fill(
    <IdeaCard
        title="Face detector app"
        summary="A mobile app to detect faces and emotions"
        topics={[
            { id: 1, name: 'Mobile application' },
            { id: 2, name: 'Cloud computing' },
            { id: 3, name: 'Deep learning' }
        ]}
    />
)

export default function ProjectIdeas() {
    return (
        <>
            <div className="mb-8 flex items-center">
                <H1 className="flex-1 lg:text-3xl">Project ideas</H1>
                <AnchorButton href="/app/project-ideas/idea/new">
                    Propose a project
                </AnchorButton>
            </div>

            <div
                className="grid auto-rows-auto grid-cols-3 gap-8"
                style={{
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))'
                }}
            >
                {arr.map((el) => el)}
                <IdeaCard
                    title="Face detector app"
                    summary="A mobile app to detect faces and emotions"
                />
            </div>
        </>
    )
}
