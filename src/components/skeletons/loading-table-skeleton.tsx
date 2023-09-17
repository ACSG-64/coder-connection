import { Skeleton } from '@/components/ui/skeleton'

export function LoadingTableSkeleton() {
    const skeletons = new Array(10).fill(
        <div className="mb-3 flex gap-3">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-12 flex-1 rounded-sm" />
            <Skeleton className="w-15 w-1/5 rounded-sm" />
            <Skeleton className="w-15 w-1/5 rounded-sm" />
        </div>
    )
    return <>{skeletons.map((skeleton) => skeleton)}</>
}
