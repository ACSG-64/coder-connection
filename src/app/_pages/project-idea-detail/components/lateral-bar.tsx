import { AnchorButton } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { FaSlack } from 'react-icons/fa6'
import { FiArrowRight, FiLogIn } from 'react-icons/fi'
import { CreateGroupModal } from './create-group-modal'

export function LateralBar() {
    return (
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
    )
}

interface AuthLateralBarProps {
    slackUrl: string
    ideaId: number
}

export function AuthLateralBar({ slackUrl, ideaId }: AuthLateralBarProps) {
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
            <CreateGroupModal ideaId={ideaId} />
            <AnchorButton variant={'secondary'} size={'lg'}>
                <span className="flex-1">Project showcases</span>
                <span className="text-xl font-black">
                    <FiArrowRight />
                </span>
            </AnchorButton>
        </>
    )
}
