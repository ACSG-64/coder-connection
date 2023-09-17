import { Skeleton } from '@/components/ui/skeleton'

export function LoadingCardsSkeleton() {
    const skeletons = new Array(15)
    return (
        <>
            {skeletons.map((_, i) => (
                <Skeleton className="h-52" key={i} />
            ))}
        </>
    )
}
