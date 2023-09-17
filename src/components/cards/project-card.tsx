import { cn } from '@/lib/utils'
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
import Image from 'next/image'
import { AspectRatio } from '../ui/aspect-ratio'

export interface IdeaCardProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string
    summary?: string
    url: string
    thumbnail?: string
}

// <Anchor variant="outline">Project details</Anchor>
export default function ProjectCard({
    title,
    summary,
    url = '#',
    thumbnail = '/src/images/purple-shapes.jpg',
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
                <AspectRatio ratio={16 / 9}>
                    <Image
                        src={thumbnail}
                        alt=""
                        fill={true}
                        objectFit="cover"
                        className="w-full rounded-lg"
                    />
                </AspectRatio>
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
