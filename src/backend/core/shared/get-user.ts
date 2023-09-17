import options from '@/app/api/auth/[...nextauth]/options'
import { User } from '@/backend/infrastructure/sequelize/models'
import { getServerSession } from 'next-auth/next'
import { cache } from 'react'

export const revalidate = 3600

type user = {
    id: string
    name: string
    surname: string
    username: string
    profileImg: string
    gitHubId: number
    gitHubNodeId: string
}

async function getUserFromDb(id: string): Promise<user | void> {
    const user = await User.findByPk(id, {
        attributes: [
            'id',
            'name',
            'surname',
            'username',
            'profileImg',
            'gitHubId',
            'gitHubNodeId'
        ]
    })
    if (!user) return
    return user.dataValues
}
const getUserCached = cache(async (id: string) => getUserFromDb(id))

export async function getSessionUser() {
    const session = await getServerSession(options)
    if (!session || !session.user.id) return
    return getUserCached(session.user.id)
}
export function getUser(id: string) {
    return getUserCached(id)
}
