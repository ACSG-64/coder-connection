import { ProjectIdeasRepository } from '@/backend/infrastructure/repositories/project-ideas-repository'
import MarkdownRenderer from '@/components/markdown-renderer'
import { AnchorButton, Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { FaGithub, FaSlack } from 'react-icons/fa6'
import NewGroupForm from './components/new-group-form'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { FiArrowRight, FiLogIn } from 'react-icons/fi'
import { Small } from '@/components/ui/typography'
import { cn } from '@/lib/utils'

interface ProjectIdeaDetailsProps {
    ideaId: number
    authVersion?: boolean
}

export default async function ProjectIdeaDetailsPage({
    ideaId,
    authVersion = false
}: ProjectIdeaDetailsProps) {
    const res = await new ProjectIdeasRepository().get(ideaId)
    //const res = { contents: '# Projec tidea', slackUrl: '#' }
    return (
        <div className="mx-auto mt-5 flex max-w-screen-xl gap-8">
            <main className="flex-1">
                <Card>
                    <div className="px-10 py-6">
                        {res && <MarkdownRenderer markdown={res.contents} />}
                    </div>
                </Card>
            </main>
            <aside className="w-full max-w-sm">
                <div
                    className={cn(
                        'sticky  flex w-full flex-col gap-3',
                        !authVersion ? 'top-20' : ''
                    )}
                >
                    {authVersion ? (
                        <AuthLateralBar slackUrl={res?.slackUrl!} />
                    ) : (
                        <LateralBar />
                    )}
                </div>
            </aside>
        </div>
    )
}

function ProjectAssignmentSelector() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button icon={FaGithub} size={'lg'}>
                    Work on this project
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Work on this project</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when
                        you&#39;re done.
                    </DialogDescription>
                </DialogHeader>
                <Button variant="outline" icon={FaGithub}>
                    Fork this repository
                </Button>
                <NewGroupForm />
                <DialogFooter>
                    <Small>
                        Note: if this idea is deleted, groups implementing it
                        will be also deleted.
                    </Small>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

interface AuthLateralBarProps {
    slackUrl: string
}

function AuthLateralBar({ slackUrl }: AuthLateralBarProps) {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Discuss about this idea</CardTitle>
                    <CardDescription>
                        Share thoughts about this project, find other peers
                        looking to from groups to implement this idea, etc.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <AnchorButton
                        variant={'secondary'}
                        icon={FaSlack}
                        className="w-full"
                        href={slackUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Discuss in Slack
                    </AnchorButton>
                </CardContent>
            </Card>
            <ProjectAssignmentSelector />
            <AnchorButton variant={'secondary'} size={'lg'}>
                <span className="flex-1">Project showcases</span>
                <span className="text-xl font-black">
                    <FiArrowRight />
                </span>
            </AnchorButton>
            <AnchorButton variant={'secondary'} size={'lg'}>
                <span className="flex-1">
                    Find groups looking for new members
                </span>
                <span className="text-xl font-black">
                    <FiArrowRight />
                </span>
            </AnchorButton>
        </>
    )
}

function LateralBar() {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Access to enable more options</CardTitle>
                    <CardDescription>
                        Access to start working on this project
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <AnchorButton
                        icon={FiLogIn}
                        className="w-full"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Access now
                    </AnchorButton>
                </CardContent>
            </Card>
        </>
    )
}
