import ProjectCard from '@/components/cards/project-card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { AnchorButton } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { H1, H2, Paragraph, Small } from '@/components/ui/typography'
import { getServerLang } from '@/hooks/use-server-lang'
import { FaGithub, FaLinkedin, FaSlack } from 'react-icons/fa6'
import { FiClock } from 'react-icons/fi'
import { getDictionary } from './lang/dictionary'

const projects = new Array(7).fill(
    <ProjectCard title="New idea" summary="A short summary" url="#" />
)

export default async function Profile() {
    const lang = getServerLang()
    const dict = await getDictionary(lang)

    return (
        <main>
            <section className="flex gap-5">
                <div className="flex w-full flex-1 flex-col justify-between">
                    <div>
                        <header>
                            <H1 className="flex-1 lg:text-4xl">
                                Andrés Sarmiento
                            </H1>
                            <Small className="flex gap-2">
                                <span aria-label={dict['username-label']}>
                                    @ACSG-64
                                </span>
                                {' / '}
                                <span
                                    className="flex gap-1"
                                    aria-label={dict['time-zone-label']}
                                >
                                    <FiClock />
                                    America/Bogota
                                </span>
                            </Small>
                        </header>
                        <div className="mb-3 mt-2">
                            <Paragraph>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Quisque sit amet purus commodo,
                                luctus erat nec, rhoncus lorem.
                            </Paragraph>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <AnchorButton icon={FaSlack} size="sm">
                            {dict['slack-contact']}
                        </AnchorButton>
                        <AnchorButton
                            icon={FaGithub}
                            size="sm"
                            variant="outline"
                        >
                            {dict.github}
                        </AnchorButton>
                        <AnchorButton
                            icon={FaLinkedin}
                            size="sm"
                            variant="outline"
                        >
                            {dict.linkedin}
                        </AnchorButton>
                    </div>
                </div>
                <Avatar className="h-[175px] w-[175px]">
                    <AvatarFallback>AS</AvatarFallback>
                    <AvatarImage src="https://avatars.githubusercontent.com/u/50815104?v=4" />
                </Avatar>
            </section>
            <Separator className="my-5" />
            <section>
                <H2 className="lg:text-2xl">{dict.contributions}</H2>
                <div
                    className="mx-auto grid max-w-screen-xl auto-rows-auto grid-cols-3 gap-5"
                    style={{
                        gridTemplateColumns:
                            'repeat(auto-fill, minmax(300px, 1fr))'
                    }}
                >
                    {projects.map((project) => project)}
                </div>
            </section>
        </main>
    )
}
