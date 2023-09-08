import options from '@/app/api/auth/[...nextauth]/options'
import { H1 } from '@/components/ui/typography'
import { getServerSession } from 'next-auth/next'
import OnboardingUserForm from './components/form'
import { Metadata } from 'next/types'
import { TimeZonesDAO } from '@/backend/infrastructure/daos/time-zones-dao'

export const metadata: Metadata = {
    title: 'Onboarding member - CoderConnection'
}

export default async function OnboardingUser() {
    const session = await getServerSession(options)

    const timeZones = await new TimeZonesDAO().getAll()
    const timeZonesTags: tag[] = timeZones.map(({ id, name }) => ({ id, name }))

    return (
        <>
            <H1>Setup your account, @{session?.user?.name}</H1>
            <OnboardingUserForm timeZones={timeZonesTags} />
        </>
    )
}
