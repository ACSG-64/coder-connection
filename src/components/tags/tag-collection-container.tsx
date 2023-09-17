import { cn } from '@/lib/utils'

interface TagCollectionContainerProps
    extends React.HTMLAttributes<HTMLDivElement> {}

export function TagCollectionContainer({
    children,
    className,
    ...props
}: TagCollectionContainerProps) {
    return (
        <div
            className={cn('flex flex-wrap items-center gap-3', className)}
            {...props}
        >
            {children}
        </div>
    )
}
