import { FaGithub } from 'react-icons/fa6'
import { AnchorButton } from '../ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '../ui/card'
import { Separator } from '../ui/separator'
import { Large, Small } from '../ui/typography'
import { cn } from '@/lib/utils'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    name: string
    surname: string
    username: string
    affinityScore?: number
}

function AffinityScore({ score }: { score: number }) {
    return (
        <div className="w-16 rounded-md bg-[#ECFDF3] p-1 pb-2 text-center">
            <Large className="text-lg font-bold text-[#027A48]">{score}%</Large>
            <Small className="block text-xs font-light leading-3">
                Affinity score
            </Small>
        </div>
    )
}

export default function MemberCard({
    name,
    surname,
    username,
    affinityScore,
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
                    {affinityScore && <AffinityScore score={affinityScore} />}
                </div>
            </CardHeader>
            <Separator className="mb-4" />
            <CardFooter className="flex justify-end">
                <AnchorButton variant={'outline'}>See profile</AnchorButton>
            </CardFooter>
        </Card>
    )
}
