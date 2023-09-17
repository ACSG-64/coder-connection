'use client'
import useSWR from 'swr'
import MemberCard from '@/components/cards/member-card'
import { H1 } from '@/components/ui/typography'
import { OrderOptions } from './components/order-options'
import { useState } from 'react'
import { LoadingCardsSkeleton } from '@/components/skeletons/loading-cards-skeleton'

type userResponse = {
    users: {
        username: string
        name: string
        surname: string
        matchingScore: number
    }[]
}

async function fetchUsers([
    sortOption,
    search
]: string[]): Promise<userResponse> {
    const sortOptionParam = `sortBy=${sortOption}`
    const searchParam = search && search.length > 0 ? `&search=${search}` : ''
    const res = await fetch(
        `/api/app/members/retrieve?${sortOptionParam}${searchParam}`,
        { credentials: 'same-origin' }
    )
    return await res.json()
}

export default function Members() {
    const [sortOption, setSortOption] = useState('competencies')
    const [search, setSearch] = useState('')

    const { data: results, isLoading } = useSWR(
        [sortOption, search],
        fetchUsers
    )

    const onSortOptionChangeHandler = (option: string) => {
        setSortOption(option)
    }

    const onSearchChangeHandler = (search: string) => {
        if (search.length < 3 && search.length != 0) return
        setSearch(search)
    }

    return (
        <>
            <div className="flex items-center pb-5">
                <H1 className="grow-[3] lg:text-3xl">Members</H1>
                <OrderOptions
                    className="grow-[2]"
                    defaultSelection="competencies"
                    onSortOptionChange={onSortOptionChangeHandler}
                    onSearchChange={onSearchChangeHandler}
                />
            </div>
            <div
                className="grid auto-rows-auto grid-cols-3 gap-8"
                style={{
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))'
                }}
            >
                {isLoading ? (
                    <LoadingCardsSkeleton />
                ) : (
                    (results?.users ?? []).map(
                        ({ username, name, surname, matchingScore }, i) => (
                            <MemberCard
                                key={username}
                                username={username}
                                name={name}
                                surname={surname}
                                affinityScore={matchingScore}
                            />
                        )
                    )
                )}
            </div>
        </>
    )
}
