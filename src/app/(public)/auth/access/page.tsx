'use client'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FaGithub } from 'react-icons/fa6'

export default function AccessForm(props: any) {
    const router = useRouter()
    console.log(props)
    //const providers = await getProviders()
    //console.log(providers)
    return (
        <main className="flex min-h-[92vh] items-center justify-center bg-[url('/src/images/perspective-grid.png')] bg-contain bg-bottom bg-no-repeat">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-center">
                        Access to the platform
                    </CardTitle>
                    <CardDescription>
                        New and existing users, access using your GitHub
                        account.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button
                        icon={FaGithub}
                        size={'lg'}
                        className="w-full"
                        onClick={async () => {
                            await signIn('github', {
                                redirect: false
                            })
                        }}
                    >
                        Access with GitHub
                    </Button>
                </CardContent>
                <CardFooter>
                    <CardDescription className="text-right">
                        By accessing, you accept our Terms of Services, our Code
                        of Conduct and our Privacy Policy.
                    </CardDescription>
                </CardFooter>
            </Card>
        </main>
    )
}

// 'http://localhost:3000/api/auth/signin/github

/*

        <Button
            onClick={() =>
                signIn('github', {
                    callbackUrl: 'http://localhost:3000/api/auth/signin/github'
                })
            }
        >
            Access now
        </Button>
*/
