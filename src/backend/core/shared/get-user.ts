import options from '@/app/api/auth/[...nextauth]/options'
import { User } from '@/backend/infrastructure/sequelize/models'
import { getServerSession } from 'next-auth/next'
import { cache } from 'react'

export const revalidate = 3600
const getUserCached = cache(async (id: string) => {
    const user = await User.findByPk(id, {
        attributes: ['id', 'name', 'surname', 'username', 'profileImg']
    })
    if (!user) return
    return user
})

export async function getUser() {
    const session = await getServerSession(options)
    if (!session || !session.user.id) return
    const user = await getUserCached(session.user.id)
    if (!user) return
    return user.dataValues
}
