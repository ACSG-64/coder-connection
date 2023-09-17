'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { FiUserPlus } from 'react-icons/fi'

export function EditProfileButton({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    return (
        <Button
            onClick={() => router.push('/app/account/settings/profile')}
            icon={FiUserPlus}
            variant={'outline'}
            size={'sm'}
            type="submit"
        >
            {children}
        </Button>
    )
}
