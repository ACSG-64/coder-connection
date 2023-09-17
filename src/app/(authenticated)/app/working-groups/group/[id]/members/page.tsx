'use client'

import { DataTable, DataTableColumnHeader } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { H2 } from '@/components/ui/typography'
import { ColumnDef } from '@tanstack/react-table'
import { FaSlack } from 'react-icons/fa6'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface IPayment {
    id: string
    name: string
    surname: string
    username: string
    slackId: string
}

export const columns: ColumnDef<IPayment>[] = [
    {
        accessorKey: 'name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        )
    },
    {
        accessorKey: 'surname',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Surname" />
        )
    },
    {
        accessorKey: 'username',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Username" />
        )
    },
    {
        accessorKey: 'slackId',
        header: 'Slack',
        cell: ({ row }) => {
            const payment = row.original
            return (
                <Button icon={FaSlack} variant="secondary" size="sm">
                    Chat in Slack
                </Button>
            )
        }
    }
]

const data: IPayment[] = [
    {
        id: '728ed52f',
        name: 'Peter',
        surname: 'Davidson',
        username: '@PeteDev',
        slackId: 'U7615DSA'
    }
]

export default function GroupMembers() {
    return (
        <div>
            <H2 className="text-2xl lg:text-2xl">Group members</H2>
            <DataTable columns={columns} data={data} />
        </div>
    )
}
