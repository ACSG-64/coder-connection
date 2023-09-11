import './main-page.css'

/* eslint-disable @next/next/no-img-element */
import { Large, Paragraph } from '@/components/ui/typography'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { getDictionary } from './lang/dictionary'
import { getServerLang } from '@/hooks/use-server-lang'

export default async function Home() {
    const lang = getServerLang()
    const dict = await getDictionary(lang)
    return (
        <>
            <main className="grid-background">
                <div className="mx-auto flex min-h-[92vh] max-w-screen-xl flex-col items-center justify-center gap-5">
                    <header>
                        <Paragraph className="text-center text-2xl">
                            {dict['small-motto']}
                        </Paragraph>
                        <Paragraph className="text-center text-[4.2rem] font-black leading-none [&:not(:first-child)]:mt-0">
                            <span className="text-gradient">
                                {dict['big-motto']}
                            </span>
                        </Paragraph>
                    </header>
                    <Large className="text-center font-normal">
                        {dict.summary}
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
