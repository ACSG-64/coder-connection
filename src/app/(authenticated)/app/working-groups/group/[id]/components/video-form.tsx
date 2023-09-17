'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Label } from '@/components/ui/label'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Small } from '@/components/ui/typography'

const repositorySchema = z.object({
    username: z.string().min(2, {
        message: 'Username must be at least 2 characters.'
    })
})

export function VideoForm() {
    const form = useForm<z.infer<typeof repositorySchema>>({
        resolver: zodResolver(repositorySchema)
    })

    const onSubmitHandler = (values: z.infer<typeof repositorySchema>) => {}

    return (
        <div>
            <div className="flex gap-5">
                <div className="grow-[3]">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmitHandler)}
                            className="w-2/3 space-y-6"
                        >
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <div>
                                            <Small className="text-muted-foreground">
                                                https://www.youtube.com/watch?v=
                                            </Small>
                                            <FormControl className="flex-1">
                                                <Input
                                                    placeholder="shadcn"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </div>
                                        <FormDescription>
                                            This is your public display name.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                    <Label>YouTube video</Label>
                    <Input
                        value={
                            'https://github.com/Coder-Connection/coder-connection/issues'
                        }
                        disabled={true}
                    />
                </div>
                <div className="grow-[2]">
                    <Label>Video</Label>
                    <AspectRatio ratio={16 / 9} className="bg-green-400">
                        <iframe
                            className="h-full w-full"
                            src="https://www.youtube.com/embed/a3ICNMQW7Ok"
                            title="YouTube video player"
                            frameBorder={0}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </AspectRatio>
                </div>
            </div>
            <Button>Refresh repository data</Button>
        </div>
    )
}
