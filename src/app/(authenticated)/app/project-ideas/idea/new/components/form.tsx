'use client'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFieldArray } from 'react-hook-form'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { projectIdeaFormSchema } from '@/backend/core/services/project-ideas/schemas/project-idea-form'
import TagSelector from '@/components/tags/tag-selector'
import { FeatureField } from './feature-field'
import { useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { useRouter } from 'next/navigation'

interface NewIdeaFormProps {
    topics: tag[]
}

export default function NewIdeaForm({ topics }: NewIdeaFormProps) {
    const router = useRouter()
    const [submitStatus, setSubmitStatus] = useState(false)
    const [success, setSuccess] = useState(false)
    const form = useForm<z.infer<typeof projectIdeaFormSchema>>({
        resolver: zodResolver(projectIdeaFormSchema),
        defaultValues: {
            features: new Array(3).fill({ feature: '' })
        }
    })

    const {
        fields: featureFields,
        append,
        remove
    } = useFieldArray({ name: 'features', control: form.control })

    const updateTopicsHandler = (topics: tag[]) => {
        form.setValue('topics', topics)
    }

    const submitHandler = async (
        values: z.infer<typeof projectIdeaFormSchema>
    ) => {
        // TODO add toast
        setSubmitStatus(true)
        const res = await fetch('/api/app/project-ideas/idea/new', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        setSubmitStatus(false)
        if (res.status === 200) setSuccess(true)
    }

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(submitHandler)}
                    autoComplete="off"
                >
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Idea title:</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Website for a thematic park"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="summary"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Summary:</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Develop a website for a thematic park"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description:</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="features"
                        render={() => (
                            <FormItem>
                                <FormLabel>Suggested features:</FormLabel>
                                {featureFields.map((item, index) => (
                                    <FeatureField
                                        key={item.id}
                                        index={index}
                                        control={form.control}
                                        onRemoveHandler={() => remove(index)}
                                    />
                                ))}
                                <Button
                                    type="button"
                                    variant={'outline'}
                                    onClick={() => append({ feature: '' })}
                                >
                                    Add feature
                                </Button>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="topics"
                        render={() => (
                            <FormItem>
                                <FormLabel>Topics:</FormLabel>
                                <FormControl>
                                    <TagSelector
                                        tags={topics}
                                        buttonLabel="Add topic"
                                        onUpdate={updateTopicsHandler}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            disabled={submitStatus}
                            loading={submitStatus}
                        >
                            Submit project idea
                        </Button>
                    </div>
                </form>
            </Form>
            <AlertDialog open={success}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Your project idea has been sent successfully
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Moderators will review it and if everything is fine,
                            it will be published in the next few days. An
                            invitation was sent to your GitHub account to join
                            this repository where you can interact with
                            moderators and make changes to your idea if
                            necessary.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction
                            onClick={() => router.push('/app/project-ideas')}
                        >
                            Understood
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
