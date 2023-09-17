'use client'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/components/ui/use-toast'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaGithub } from 'react-icons/fa6'

interface Props {
    username: string
    profileImg: string
    gitHubProfileUrl: string
}

export function GitHubDetails({
    username,
    profileImg,
    gitHubProfileUrl
}: Props) {
    const [submitStatus, setSubmitStatus] = useState(false)
    const router = useRouter()

    const submitHandler = async () => {
        setSubmitStatus(true)
        const res = await fetch('/api/app/profile/update/github', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        setSubmitStatus(false)
        if (res.status != 200) {
            toast({
                title: 'Your edit was not saved, please try again',
                variant: 'destructive'
            })
        } else {
            toast({
                title: 'Profile updated successfully',
                variant: 'success'
            })
        }
        router.refresh()
    }

    return (
        <>
            <div className="flex max-w-5xl flex-wrap justify-between gap-5 space-y-0">
                <div className="w-full max-w-sm">
                    <Label>User name</Label>
                </div>
                <div className="min-w-[10rem] flex-1">
                    <Input value={username} disabled />
                </div>
            </div>
            <Separator className="my-5" />
            <div className="flex max-w-5xl flex-wrap justify-between gap-5 space-y-0">
                <div className="w-full max-w-sm">
                    <Label>GitHub image</Label>
                </div>
                <div className="min-w-[10rem] flex-1">
                    <div className="max-w-[100px]">
                        <AspectRatio ratio={1 / 1}>
                            <Image
                                src={profileImg}
                                alt=""
                                fill={true}
                                objectFit="cover"
                                className="w-full rounded-lg"
                            />
                        </AspectRatio>
                    </div>
                </div>
            </div>
            <Separator className="my-5" />
            <div className="flex max-w-5xl flex-wrap justify-between gap-5 space-y-0">
                <div className="w-full max-w-sm">
                    <Label>GitHub profile</Label>
                </div>
                <div className="min-w-[10rem] flex-1">
                    <Input value={gitHubProfileUrl} disabled />
                </div>
            </div>
            <Separator className="my-5" />
            <div className="flex max-w-5xl justify-center">
                <Button
                    className="ml-auto"
                    icon={FaGithub}
                    disabled={submitStatus}
                    loading={submitStatus}
                    onClick={submitHandler}
                >
                    Sync details with GitHub
                </Button>
            </div>
        </>
    )
}
