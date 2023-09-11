import { cn } from '@/lib/utils'
import Tag from '../tag'
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

export interface IdeaCardProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string
    url: string
    summary?: string
    topics?: tag[]
}

// <Anchor variant="outline">Project details</Anchor>
export default function IdeaCard({
    title,
    summary,
    topics,
    url,
    className,
    ...props
}: IdeaCardProps) {
    return (
        <Card className={cn('flex flex-col', className)} {...props}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{summary}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                {topics && (
                    <div className="flex flex-wrap gap-2">
                        {topics.map(({ id, name }) => (
                            <Tag key={id} id={id} name={name} />
                        ))}
                    </div>
                )}
            </CardContent>
            <Separator className="mb-4" />
            <CardFooter className="flex justify-end">
                <AnchorButton variant={'outline'} href={url}>
                    See details
                </AnchorButton>
            </CardFooter>
        </Card>
    )
}
