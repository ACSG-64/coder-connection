'use client'

import { DataTable, DataTableColumnHeader } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { H2 } from '@/components/ui/typography'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { BiDotsHorizontal } from 'react-icons/bi'
import { FaSlack } from 'react-icons/fa6'
import { ImHammer2 } from 'react-icons/im'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    id: string
    name: string
    surname: string
    username: string
    slackId: string
}

export const columns: ColumnDef<Payment>[] = [
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
    },
    {
        id: 'actions',
        header: 'Decision',
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="primary"
                            icon={BiDotsHorizontal}
                            className="h-8 w-8 p-0"
                        >
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() =>
                                navigator.clipboard.writeText(payment.id)
                            }
                        >
                            Accept
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() =>
                                navigator.clipboard.writeText(payment.id)
                            }
                        >
                            Reject
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]

const data: Payment[] = [
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
            <H2 className="text-2xl lg:text-2xl">Applicants</H2>
            <DataTable columns={columns} data={data} />
        </div>
    )
}
