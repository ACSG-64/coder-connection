import { DataTableColumnHeader } from '@/components/data-table'
import { TagCollectionContainer } from '@/components/tags/tag-collection-container'
import { AnchorButton } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { IApplicantRow } from '../../interfaces/i-applicant'
import Tag from '@/components/tags/tag'
import Link from 'next/link'

export const sharedColumnsDefinition: ColumnDef<IApplicantRow>[] = [
    {
        accessorKey: 'username',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Username" />
        ),
        cell: ({ row }) => {
            const column = row.original
            return (
                <AnchorButton
                    variant="link"
                    size="sm"
                    href={`/app/members/profile/${column.username}`}
                >
                    {column.username}
                </AnchorButton>
            )
        }
    },
    {
        accessorKey: 'projects',
        header: 'Projects selected',
        cell: ({ row }) => {
            const column = row.original
            return (
                <TagCollectionContainer>
                    {column.projects.map(({ id, name }) => (
                        <Link href={`/app/project-ideas/idea/${id}`} key={id}>
                            <Tag id={id} name={name} />
                        </Link>
                    ))}
                </TagCollectionContainer>
            )
        }
    },
    {
        accessorKey: 'skills',
        header: 'Skills selected',
        cell: ({ row }) => {
            const column = row.original
            return (
                <TagCollectionContainer>
                    {column.skills.map(({ id, name }) => (
                        <Tag key={id} id={id} name={name} />
                    ))}
                </TagCollectionContainer>
            )
        }
    }
]
