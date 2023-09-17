'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { AnchorButton, Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { useState } from 'react'
import { Small } from '@/components/ui/typography'
import { FaGithub } from 'react-icons/fa6'

const formSchema = z.object({
    repositoryName: z.string().trim().max(100),
    groupName: z.string().trim().min(3).max(100)
})

export default function NewGroupForm({
    ghUsername,
    ideaId
}: {
    ghUsername: string
    ideaId: number
}) {
    const [submitStatus, setSubmitStatus] = useState(false)
    const { toast } = useToast()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    const submitHandler = async ({
        repositoryName,
        groupName
    }: z.infer<typeof formSchema>) => {
        setSubmitStatus(true)
        const ghRes = await fetch(
            `https://api.github.com/repos/${ghUsername}/${repositoryName}`
        )
        if (ghRes.status != 200) {
            toast({
                title: 'Repository not found in your account',
                description:
                    'Make sure that your GitHub details up-to-date and ' +
                    'that the repository is public.\n' +
                    'If the problem persist, try again in one hour.',
                variant: 'destructive'
            })
            setSubmitStatus(false)
            return
        }
        const ghContent = await ghRes.json()
        const { id: repositoryId } = ghContent
        const res = await fetch('/api/app/groups/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                credentials: 'same-origin'
            },
            body: JSON.stringify({ groupName, repositoryId, ideaId })
        })
        if (res.status !== 200) {
            toast({
                title: 'There was an error while creating your group',
                description: '',
                variant: 'destructive'
            })
        }
        setSubmitStatus(false)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(submitHandler)}
                className="space-y-4"
            >
                <FormField
                    control={form.control}
                    name="repositoryName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Repository name:</FormLabel>
                            <FormControl>
                                <div className="flex items-center">
                                    <AnchorButton
                                        icon={FaGithub}
                                        size="sm"
                                        variant="link"
                                        href={`https://github.com/${ghUsername}?tab=repositories`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {ghUsername}
                                    </AnchorButton>
                                    <Small className="mr-2">/</Small>
                                    <Input
                                        placeholder="shadcn"
                                        className="flex-1"
                                        {...field}
                                    />
                                </div>
                            </FormControl>
                            <FormDescription>
                                The name of the repository of the forked
                                repository. It must be owned by you.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="groupName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>New group name:</FormLabel>
                            <FormControl>
                                <Input placeholder="Devcrafters" {...field} />
                            </FormControl>
                            <FormDescription>
                                The name of the new work group
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    disabled={submitStatus}
                    loading={submitStatus}
                >
                    Create group
                </Button>
            </form>
        </Form>
    )
}
