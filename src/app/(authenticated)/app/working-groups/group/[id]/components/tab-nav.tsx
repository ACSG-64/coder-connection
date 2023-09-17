'use client'

import { Separator } from '@/components/ui/separator'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { usePathname, useRouter } from 'next/navigation'

type tabs = 'project' | 'members' | 'applicants' | 'details'
function getSelectedTab(path: string, id: number | string): tabs {
    const basePath = `/app/working-groups/group/${id}`
    switch (path) {
        case `${basePath}/members`:
            return 'members'
        case `${basePath}/applicants`:
            return 'applicants'
        case `${basePath}/details`:
            return 'details'
        default:
            return 'project'
    }
}

export function TabNav({ groupId: id }: { groupId: number }) {
    const router = useRouter()
    const pathname = usePathname()
    let selectedTab: tabs = getSelectedTab(pathname, id)

    return (
        <nav>
            <Tabs defaultValue={selectedTab}>
                <TabsList className="rounded-b-none">
                    <TabsTrigger
                        value="project"
                        onClick={() =>
                            router.push(`/app/working-groups/group/${id}`)
                        }
                    >
                        Project pitch
                    </TabsTrigger>
                    <TabsTrigger
                        value="members"
                        onClick={() =>
                            router.push(
                                `/app/working-groups/group/${id}/members`
                            )
                        }
                    >
                        Group members
                    </TabsTrigger>
                    <TabsTrigger
                        value="applicants"
                        onClick={() =>
                            router.push(
                                `/app/working-groups/group/${id}/applicants`
                            )
                        }
                    >
                        Applicants
                    </TabsTrigger>
                    <TabsTrigger
                        value="details"
                        onClick={() =>
                            router.push(
                                `/app/working-groups/group/${id}/details`
                            )
                        }
                    >
                        Details
                    </TabsTrigger>
                </TabsList>
            </Tabs>
            <Separator className="mb-5" />
        </nav>
    )
}
