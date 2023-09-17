'use client'
import { DataTable, DataTableColumnHeader } from '@/components/data-table'
import { AnchorButton, Button } from '@/components/ui/button'
import { FaGithub, FaSlack } from 'react-icons/fa6'
import { ColumnDef } from '@tanstack/react-table'

export interface IGroup {
    id: string
    name: string
    idea: {
        id: number
        name: string
    }
    gitHubUrl: string
    slackId: string
}

export const columns: ColumnDef<IGroup>[] = [
    {
        accessorKey: 'name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Group" />
        ),
        cell: ({ row }) => {
            const payment = row.original
            return (
                <AnchorButton
                    variant="link"
                    size="sm"
                    href={`/app/working-groups/group/${payment.id}`}
                >
                    {payment.name}
                </AnchorButton>
            )
        }
    },
    {
        accessorKey: 'idea',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Project idea" />
        ),
        cell: ({ row }) => {
            const payment = row.original
            return (
                <AnchorButton
                    href={`/app/project-ideas/idea/${payment.idea.id}`}
                    variant="link"
                    size="sm"
                >
                    {payment.idea.name}
                </AnchorButton>
            )
        }
    },
    {
        accessorKey: 'gitHubUrl',
        header: 'Repository',
        cell: ({ row }) => {
            const payment = row.original
            return (
                <AnchorButton icon={FaGithub} variant="outline" size="sm">
                    Project repository
                </AnchorButton>
            )
        }
    },
    {
        accessorKey: 'slackId',
        header: 'Slack',
        cell: ({ row }) => {
            const payment = row.original
            return (
                <AnchorButton icon={FaSlack} variant="secondary" size="sm">
                    Chat in Slack
                </AnchorButton>
            )
        }
    }
]
export default function GroupsTable({ data }: { data: IGroup[] }) {
    return <DataTable columns={columns} data={data} />
}
