/* eslint-disable @next/next/no-img-element */
import { H1, H2, H3, Large, Paragraph } from '@/components/ui/typography'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

interface FeatureDescriptorProps {
    children: React.ReactNode
    img: { src: string; alt: string }
    imgLeft?: boolean
}

function FeatureDescriptor({
    children,
    img,
    imgLeft = true
}: FeatureDescriptorProps) {
    return (
        <div className="py-16">
            <div className="feature-grid mx-auto max-w-screen-xl">
                <img
                    src={img.src}
                    alt={img.alt}
                    style={{ gridArea: imgLeft ? 'left-img' : 'right-img' }}
                />
                <div style={{ gridArea: 'content' }}>{children}</div>
            </div>
        </div>
    )
}

export default function Home() {
    return (
        <>
            <main className="grid-background">
                <div className="mx-auto flex min-h-[92vh] max-w-screen-xl flex-col items-center justify-center gap-5">
                    <header>
                        <Paragraph className="text-2xl">
                            A place where tech enthusiast can
                        </Paragraph>
                        <Paragraph className="text-[4.2rem] font-black leading-none [&:not(:first-child)]:mt-0">
                            <span className="text-gradient">
                                Work in projects collaboratively
                            </span>
                        </Paragraph>
                    </header>
                    <Large className="text-center font-normal">
                        Whether you are early in your career or are an
                        experienced developer, CoderConnection is the ideal
                        place to meet other developers and create meaningful
                        projects together. Here you can develop with others,
                        lead teams, share knowledge, learn by doing, etc.,
                        CoderConnections is here to help you grow your career
                    </Large>
                    <div className="flex gap-8">
                        <Button size={'lg'}>
                            <Large>Join for free</Large>
                        </Button>
                        <Button size={'lg'} variant={'outline'}>
                            <Large>Learn more</Large>
                        </Button>
                    </div>
                    <section className="cards-section">
                        <div className="mx-auto flex max-w-screen-xl items-stretch gap-10">
                            <Card className="flex-1">
                                <CardHeader>
                                    <CardTitle>
                                        Meet like-minded people
                                    </CardTitle>
                                    <CardDescription>
                                        Expand your professional network
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                            <Card className="flex-1">
                                <CardHeader>
                                    <CardTitle>Develop your skills</CardTitle>
                                    <CardDescription>
                                        Put in practice your technical skills
                                        and acquire essential soft skills by
                                        collaborating with others
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                            <Card className="flex-1">
                                <CardHeader>
                                    <CardTitle>Create together</CardTitle>
                                    <CardDescription>
                                        Create meaningful projects even from
                                        scratch, zero barriers for all
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}
