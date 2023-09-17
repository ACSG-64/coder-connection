import { H1, Paragraph, Small } from '@/components/ui/typography'
import { AnchorButton } from '@/components/ui/button'
import { FaGithub, FaSlack } from 'react-icons/fa6'
import { ImExit } from 'react-icons/im'
import { Separator } from '@/components/ui/separator'
import { TabNav } from './components/tab-nav'

interface Props {
    children: React.ReactNode
    params: { id: number }
}

export default function GroupLayout({ children, params: { id } }: Props) {
    return (
        <div>
            <section>
                <div className="flex w-full flex-1 flex-col justify-between">
                    <div>
                        <header>
                            <H1 className="text-4xl lg:text-4xl">Devtigers</H1>
                            <Small className="flex gap-2"> Group #24</Small>
                        </header>
                        <div className="mb-3 mt-2">
                            <Paragraph>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Curabitur sagittis magna id
                                tellus varius vulputate. Suspendisse cursus
                                neque vitae libero pretium, nec facilisis orci
                                volutpat. Vestibulum ante ipsum primis in
                                faucibus orci luctus et ultrices posuere cubilia
                                curae; Nulla ornare dui non sapien aliquet
                                vestibulum. Etiam vel metus eget ligula congue
                                dignissim vel vitae libero. Vestibulum et nibh
                                eget augue rutrum pharetra nec in felis.
                            </Paragraph>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <AnchorButton icon={FaSlack} size="sm">
                            Interact with your group
                        </AnchorButton>
                        <AnchorButton
                            icon={FaGithub}
                            size="sm"
                            variant="outline"
                        >
                            Project repository
                        </AnchorButton>
                        <AnchorButton
                            icon={ImExit}
                            size="sm"
                            variant="destructive"
                            className="self-end"
                        >
                            Leave group
                        </AnchorButton>
                    </div>
                </div>
            </section>
            <aside className="mb-5">
                <Separator className="my-5" />
                <TabNav groupId={id} />
            </aside>
            <div>{children}</div>
        </div>
    )
}
