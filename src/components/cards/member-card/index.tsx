import { FaGithub } from 'react-icons/fa6'
import { AnchorButton } from '../../ui/button'
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '../../ui/card'
import { Separator } from '../../ui/separator'
import { cn } from '@/lib/utils'
import { AffinityScoreContainer } from './components/affinity-score-container'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    name: string
    surname: string
    username: string
    affinityScore?: number
}

export default function MemberCard({
    name,
    surname,
    username,
    affinityScore = 0,
    className,
    ...props
}: Props) {
    return (
        <Card className={cn(className)} {...props}>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="grow">
                        <CardTitle>
                            {name} {surname}
                        </CardTitle>
                        <CardDescription className="mt-1.5 flex flex-wrap items-center gap-1">
                            {username}
                        </CardDescription>
                    </div>
                    <AffinityScoreContainer score={affinityScore ?? 0} />
                </div>
            </CardHeader>
            <Separator className="mb-4" />
            <CardFooter className="flex justify-end">
                <AnchorButton
                    variant={'outline'}
                    href={`/app/members/profile/${username}`}
                >
                    See profile
                </AnchorButton>
            </CardFooter>
        </Card>
    )
}
