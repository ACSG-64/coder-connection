import options from '@/app/api/auth/[...nextauth]/options'
import { H1 } from '@/components/ui/typography'
import { getServerSession } from 'next-auth/next'
import OnboardingUserForm from './form'
import { Metadata } from 'next/types'

export const metadata: Metadata = {
    title: 'Onboarding member - CoderConnection'
}

export default async function OnboardingUser() {
    const session = await getServerSession(options)
    return (
        <>
            <H1>Setup your account, @{session?.user?.name}</H1>
            <OnboardingUserForm />
        </>
    )
}
