'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import Image from 'next/image'
import { Label } from '@/components/ui/label'

const repositorySchema = z.object({
    username: z.string().min(2, {
        message: 'Username must be at least 2 characters.'
    })
})

export function RepositoryForm() {
    const form = useForm<z.infer<typeof repositorySchema>>({
        resolver: zodResolver(repositorySchema)
    })

    const onSubmitHandler = (values: z.infer<typeof repositorySchema>) => {}

    return (
        <div>
            <div className="flex gap-5">
                <div className="grow-[3]">
                    <Label>GitHub URL</Label>
                    <Input
                        value={
                            'https://github.com/Coder-Connection/coder-connection/issues'
                        }
                        disabled={true}
                    />
                    <Label>Summary</Label>
                    <Input
                        value={'A project where we are showcasing our skills'}
                        disabled={true}
                    />
                </div>
                <div className="grow-[2]">
                    <Label>OpenGraph image (thumbnail)</Label>
                    <AspectRatio ratio={16 / 9}>
                        <Image
                            src={'/src/images/purple-shapes.jpg'}
                            alt=""
                            fill={true}
                            objectFit="cover"
                            className="w-full rounded-lg"
                        />
                    </AspectRatio>
                </div>
            </div>
            <Button>Refresh repository data</Button>
        </div>
    )
}
