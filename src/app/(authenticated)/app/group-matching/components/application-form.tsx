'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

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
import TagSelector from '@/components/tags/tag-selector'
import { groupMatchingFormSchema } from '@/backend/core/services/group-matching/schemas/group-matching-form'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'

interface Props {
    projectIdeas: tag[]
    skills: tag[]
}

export function ApplicationForm({ projectIdeas, skills }: Props) {
    const [submitStatus, setSubmitStatus] = useState(false)
    const router = useRouter()
    const form = useForm<z.infer<typeof groupMatchingFormSchema>>({
        resolver: zodResolver(groupMatchingFormSchema)
    })

    const updateProjectIdeasHandler = (projectIdeas: tag[]) => {
        form.setValue('projectIdeas', projectIdeas)
    }

    const updateSkillsHandler = (skills: tag[]) => {
        form.setValue('skills', skills)
    }

    const submitHandler = async (
        values: z.infer<typeof groupMatchingFormSchema>
    ) => {
        setSubmitStatus(true)
        const res = await fetch('/api/app/group-matching/application', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        if (res.status == 200) {
            toast({
                title: 'Application submitted',
                description: 'Your application has been submitted successfully',
                variant: 'success'
            })
            window.location.reload()
        } else {
            toast({
                title: 'Application failed',
                description: 'Your application has failed to submit',
                variant: 'destructive'
            })
            setSubmitStatus(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)}>
                <FormField
                    control={form.control}
                    name="projectIdeas"
                    render={() => (
                        <FormItem>
                            <FormLabel>Project ideas</FormLabel>
                            <FormControl>
                                <TagSelector
                                    tags={projectIdeas}
                                    buttonLabel="Add projects"
                                    onUpdate={updateProjectIdeasHandler}
                                />
                            </FormControl>
                            <FormDescription>
                                Select up to 3 projects you would like to work
                                on
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="skills"
                    render={() => (
                        <FormItem>
                            <FormLabel>Shared skills</FormLabel>
                            <FormControl>
                                <TagSelector
                                    tags={skills}
                                    buttonLabel="Add skills"
                                    onUpdate={updateSkillsHandler}
                                />
                            </FormControl>
                            <FormDescription>
                                Select 5 skills you would like your group mates
                                to be interested putting into practice
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    loading={submitStatus}
                    disabled={submitStatus}
                >
                    Submit application
                </Button>
            </form>
        </Form>
    )
}
