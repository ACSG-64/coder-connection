import { UserResult } from '@/backend/core/services/members-search/models/user-result'
import { getSessionUser } from '@/backend/core/shared/get-user'
import { NextRequest, NextResponse } from 'next/server'
import { TYPES, getDIContainer } from './config/di-container'
import { RetrieveUsersUseCase } from '@/backend/core/services/members-search/use-cases/retrieve-users-use-case'
import { GetUsersBySharedCompetenciesQuery } from '@/backend/core/services/members-search/models/get-users-by-shared-competencies-query'
import { GetUsersBySharedInterestsQuery } from '@/backend/core/services/members-search/models/get-users-by-shared-interests-query'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const user = await getSessionUser()
    if (!user) {
        return new NextResponse('You are not authenticated', { status: 401 })
    }

    const container = await getDIContainer()
    const retrieveUsersUseCase = container.get<RetrieveUsersUseCase>(
        TYPES.RetrieveUsersUseCase
    )
    const sortByParm = searchParams.get('sortBy')
    const searchParam = searchParams.get('search')
    let results: UserResult[]
    if (sortByParm && sortByParm == 'interests') {
        const cmd = new GetUsersBySharedInterestsQuery(
            user.id,
            searchParam ?? undefined
        )
        results = await retrieveUsersUseCase.retrieve(cmd)
    } else {
        const cmd = new GetUsersBySharedCompetenciesQuery(
            user.id,
            searchParam ?? undefined
        )
        results = await retrieveUsersUseCase.retrieve(cmd)
    }

    return NextResponse.json({
        users: results.map((user) => ({ ...user }))
    })
}
