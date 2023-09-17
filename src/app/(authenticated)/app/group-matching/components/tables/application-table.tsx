'use client'
import Link from 'next/link'
import { DataTable, DataTableColumnHeader } from '@/components/data-table'
import { AnchorButton, Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { BiDotsHorizontal } from 'react-icons/bi'
import { IApplicantRow } from '../../interfaces/i-applicant'
import { sharedColumnsDefinition } from './shared-column-definitions'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { FiTrash2 } from 'react-icons/fi'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'

interface ApplicationTableProps {
    data: IApplicantRow
}

export default function ApplicationTable({ data }: ApplicationTableProps) {
    const columns: ColumnDef<IApplicantRow>[] = [
        ...sharedColumnsDefinition,
        {
            id: 'actions',
            header: 'Remove?',
            enableHiding: false,
            cell: ({ row }) => {
                const payment = row.original

                return <ApplicationDeletionDialog applicationId={payment.id} />
            }
        }
    ]

    return <DataTable columns={columns} data={[data]} />
}

function ApplicationDeletionDialog({
    applicationId
}: {
    applicationId: string
}) {
    const [submitStatus, setSubmitStatus] = useState(false)
    const router = useRouter()

    const deleteApplicationHandler = async () => {
        setSubmitStatus(true)
        const res = await fetch('/api/app/group-matching/application', {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ applicationId })
        })
        if (res.status === 200) {
            toast({
                title: 'Application deleted',
                description: 'Your application has been deleted.',
                variant: 'success'
            })
        } else {
            toast({
                title: 'Error',
                description: 'Something went wrong.',
                variant: 'destructive'
            })
        }
        router.refresh()
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button icon={FiTrash2} size="sm" />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Do you want to delete your application?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone but you can create a new
                        application afterwards.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Do nothing</AlertDialogCancel>
                    <Button
                        variant={'destructive'}
                        loading={submitStatus}
                        disabled={submitStatus}
                        onClick={deleteApplicationHandler}
                    >
                        Delete
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
