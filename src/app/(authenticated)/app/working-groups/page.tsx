import { ListGroupsUseCase } from '@/backend/core/services/groups/use-cases/list-groups-use-case'
import { TYPES, getDIContainer } from './config/di-container'
import { getSessionUser } from '@/backend/core/shared/get-user'
import { GroupsByMemberQuery } from '@/backend/core/services/groups/models/groups-by-member-query'
import GroupsTable from './components/groups-table'
import { H1 } from '@/components/ui/typography'
import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { LoadingTableSkeleton } from '../../../../components/skeletons/loading-table-skeleton'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export default function Groups() {
    return (
        <>
            <header className="flex items-center gap-2">
                <H1 className="flex-1 text-3xl lg:text-3xl">
                    Working groups you belong to
                </H1>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button>Create a group</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Create a group group</DialogTitle>
                            <DialogDescription>
                                To create a group, go to a project idea, click
                                on the &#34;Work on this idea&#34; button and
                                follow the steps that will be displayed
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </header>
            <Suspense fallback={<LoadingTableSkeleton />}>
                <GroupsList />
            </Suspense>
        </>
    )
}

async function GroupsList() {
    const user = await getSessionUser()
    if (!user) {
        redirect('/')
    }
    const container = await getDIContainer()
    const listGroupsUseCase = container.get<ListGroupsUseCase>(
        TYPES.ListGroupsUseCase
    )
    const groups = await listGroupsUseCase.listByMember(
        new GroupsByMemberQuery(user?.id!)
    )

    const data = groups.map(
        ({ id, name, projectRepo: gitHubUrl, slackId, idea }) => {
            return { id, name, gitHubUrl, slackId, idea }
        }
    )

    return <GroupsTable data={data} />
}
