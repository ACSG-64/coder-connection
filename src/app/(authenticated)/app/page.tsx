import options from '@/app/api/auth/[...nextauth]/options'
import { H1 } from '@/components/ui/typography'
import { getServerSession } from 'next-auth/next'

export default async function Welcome() {
    const session = await getServerSession(options)
    return <H1>Welcome {session?.user?.name}!</H1>
}
