'use client'

import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { LuListFilter } from 'react-icons/lu'
import { usePathname, useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { FiSearch } from 'react-icons/fi'
import { cn } from '@/lib/utils'

interface Props
    extends Omit<React.InputHTMLAttributes<HTMLDivElement>, 'children'> {
    onSortOptionChange?: (option: string) => any
    onSearchChange?: (search: string) => any
    defaultSelection?: string
}

export function OrderOptions({
    onSortOptionChange = (_: string) => '',
    onSearchChange = (_: string) => '',
    defaultSelection = 'competencies',
    className,
    ...props
}: Props) {
    const [sortOption, setSortOption] = useState(defaultSelection)
    const [search, setSearch] = useState('')

    useEffect(() => {
        onSortOptionChange(sortOption)
    }, [sortOption, onSortOptionChange])

    useEffect(() => {
        onSearchChange(search)
    }, [search, onSearchChange])

    return (
        <div className={cn('flex items-center gap-2', className)} {...props}>
            <div className="flex flex-1 items-center overflow-hidden rounded-md border border-input">
                <div className="pl-2 text-lg text-muted-foreground">
                    <FiSearch />
                </div>
                <Input
                    className="rounded-none border-none"
                    placeholder="Search by full name or username"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button icon={LuListFilter} variant="secondary">
                        Results ordering
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>
                        Select an affinity metric
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                        value={sortOption}
                        onValueChange={setSortOption}
                    >
                        <DropdownMenuRadioItem value="competencies">
                            Based in your competencies
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="interests">
                            Based in your interests
                        </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
