import options from '@/app/api/auth/[...nextauth]/options'
import IdeaCard from '@/components/cards/idea-card'
import ProjectCard from '@/components/cards/project-card'
import { AnchorButton } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { H1, H2 } from '@/components/ui/typography'
import { getServerSession } from 'next-auth/next'
import { FaSlack } from 'react-icons/fa6'

const ideas = new Array(5).fill(
    <IdeaCard
        className="w-96 shrink-0"
        title="New idea"
        summary="A short summary"
        url="#"
    />
)
const projects = new Array(5).fill(
    <ProjectCard
        className="w-96 shrink-0"
        title="New idea"
        summary="A short summary"
        url="#"
    />
)

function HorizontalCarrousel({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative">
            <div className="flex flex-1 gap-5 overflow-y-hidden overflow-x-scroll pb-3 pr-[50px]">
                {children}
            </div>
            <div className="absolute left-0 top-0 h-full w-[35px] bg-gradient-to-r from-[hsl(var(--background))] to-transparent"></div>
            <div className="absolute right-0 top-0 h-full w-[50px] bg-gradient-to-r from-transparent to-[hsl(var(--background))]"></div>
        </div>
    )
}

export default async function Welcome() {
    const session = await getServerSession(options)
    return (
        <main>
            <div className="flex items-center justify-between">
                <H1 className="lg:text-4xl">Welcome {session?.user?.name}!</H1>
                <AnchorButton
                    icon={FaSlack}
                    href={process.env.SLACK_WORKSPACE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Go to our community Slack
                </AnchorButton>
            </div>

            <section>
                <H2 className="lg:text-2xl">Recent project ideas</H2>
                <HorizontalCarrousel>
                    {ideas.map((idea) => idea)}
                </HorizontalCarrousel>
            </section>
            <Separator className="my-5" />
            <section>
                <H2 className="lg:text-2xl">Recent projects</H2>
                <HorizontalCarrousel>
                    {projects.map((project) => project)}
                </HorizontalCarrousel>
            </section>
            <Separator className="my-5" />
            <section>
                <H2>Getting started with Open Source and leadership</H2>
            </section>
        </main>
    )
}
