'use client'
import { DataTable } from '@/components/data-table'
import { ColumnDef } from '@tanstack/react-table'
import { IApplicantRow } from '../../interfaces/i-applicant'
import { sharedColumnsDefinition } from './shared-column-definitions'

const columns: ColumnDef<IApplicantRow>[] = [...sharedColumnsDefinition]

interface ApplicantsTableProps {
    data: IApplicantRow[]
}

export default function ApplicantsTable({ data }: ApplicantsTableProps) {
    return <DataTable columns={columns} data={data} />
}
