'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
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

const formSchema = z.object({
    repositoryName: z.string().max(100),
    groupName: z.string().min(3).max(100)
})

export default function NewGroupForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    const submitHandler = (value: z.infer<typeof formSchema>) => {}

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
                                <Input placeholder="shadcn" {...field} />
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
                <Button type="submit">Create group</Button>
            </form>
        </Form>
    )
}
