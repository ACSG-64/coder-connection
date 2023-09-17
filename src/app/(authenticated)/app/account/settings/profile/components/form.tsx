'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
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
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { profileFormSchema } from '@/backend/core/services/profiles/schemas/profile-form-schema'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import TagSelector from '@/components/tags/tag-selector'
import TimeZonesSelector from '../../../components/time-zone-selector'

interface ProfileFormProps {
    name: string
    surname: string
    description: string
    timeZone: tag
    linkedInUrl?: string
    competencies?: tag[]
    interests?: tag[]
    skills: tag[]
    timeZones: tag[]
}

export default function ProfileForm({
    skills,
    name,
    surname,
    description,
    timeZone,
    linkedInUrl = '',
    competencies = [],
    interests = [],
    timeZones = []
}: ProfileFormProps) {
    const [submitStatus, setSubmitStatus] = useState(false)
    const { toast } = useToast()
    const form = useForm<z.infer<typeof profileFormSchema>>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: { name, surname, description, timeZone, linkedInUrl }
    })

    const submitHandler = async (values: z.infer<typeof profileFormSchema>) => {
        setSubmitStatus(true)
        const res = await fetch('/api/app/profile/update', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
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
    }
    const selectTimeZoneHandler = (timeZone: tag) => {
        form.setValue('timeZone', timeZone)
        form.trigger('timeZone')
    }

    const updateSkillsHandler = (skills: tag[]) => {
        form.setValue('skills', skills)
    }
    const updateInterestsHandler = (interests: tag[]) => {
        form.setValue('interests', interests)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)}>
                <div className="flex max-w-5xl flex-wrap justify-between gap-5 space-y-0">
                    <Label className="w-full max-w-sm">Full name</Label>
                    <div className="flex min-w-[10rem] flex-1 gap-2 space-y-0">
                        {/* Name */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="flex-1 space-y-0">
                                    <FormLabel>Name(s):</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Surname */}
                        <FormField
                            control={form.control}
                            name="surname"
                            render={({ field }) => (
                                <FormItem className="flex-1 space-y-0">
                                    <FormLabel>Surname(s):</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <Separator className="my-5" />
                {/* Description */}
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem className="flex max-w-5xl flex-wrap justify-between gap-5 space-y-0">
                            <div className="w-full max-w-sm">
                                <FormLabel>Description:</FormLabel>
                                <FormDescription>
                                    A concise presentation about yourself. Some
                                    ideas to write about: your hobbies, your
                                    passions, your goals, etc.
                                </FormDescription>
                            </div>
                            <div className="min-w-[10rem] flex-1">
                                <FormControl>
                                    <Textarea
                                        placeholder="I'm a developer who who loves..."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />
                <Separator className="my-5" />
                {/* Time zone */}
                <FormField
                    control={form.control}
                    name="timeZone"
                    render={({ field }) => (
                        <FormItem className="flex max-w-5xl flex-wrap justify-between gap-5 space-y-0">
                            <div className="w-full max-w-sm">
                                <FormLabel>Time zone:</FormLabel>
                                <FormDescription>
                                    Select the closest time zone you live in.
                                </FormDescription>
                            </div>
                            <div className="min-w-[10rem] flex-1">
                                <FormControl>
                                    <TimeZonesSelector
                                        onSelect={selectTimeZoneHandler}
                                        value={field.value}
                                        timeZones={timeZones}
                                    />
                                </FormControl>
                            </div>
                        </FormItem>
                    )}
                />
                <Separator className="my-5" />
                {/* Linkedin */}
                <FormField
                    control={form.control}
                    name="linkedInUrl"
                    render={({ field }) => (
                        <FormItem className="flex max-w-5xl flex-wrap justify-between gap-5 space-y-0">
                            <div className="w-full max-w-sm">
                                <FormLabel>LinkedIn account URL:</FormLabel>
                                <FormDescription>
                                    This field is optional but we suggest you to
                                    fill it so other members can know more.
                                </FormDescription>
                            </div>
                            <div className="min-w-[10rem] flex-1">
                                <FormControl>
                                    <Input
                                        placeholder="https://www.linkedin.com/in/john-doe"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />
                <Separator className="my-5" />
                {/* Skills */}
                <FormField
                    control={form.control}
                    name="skills"
                    render={() => (
                        <FormItem className="flex max-w-5xl flex-wrap items-center justify-between gap-5 space-y-0">
                            <div className="w-full max-w-sm">
                                <FormLabel>My competencies:</FormLabel>
                                <FormDescription>
                                    List some skills that you are good at.
                                </FormDescription>
                            </div>
                            <div className="min-w-[10rem] flex-1">
                                <FormControl>
                                    <TagSelector
                                        tags={[...skills]}
                                        buttonLabel="Add skill"
                                        defaultSelectedTags={competencies}
                                        onUpdate={updateSkillsHandler}
                                    />
                                </FormControl>
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />
                <Separator className="my-5" />
                {/* Interests */}
                <FormField
                    control={form.control}
                    name="skills"
                    render={() => (
                        <FormItem className="flex max-w-5xl flex-wrap items-center justify-between gap-5 space-y-0">
                            <div className="w-full max-w-sm">
                                <FormLabel className="w-full max-w-sm">
                                    I&#39;m interested in:
                                </FormLabel>
                                <FormDescription>
                                    List some skills that you would like to
                                    acquire or master.
                                </FormDescription>
                            </div>
                            <div className="min-w-[10rem] flex-1">
                                <FormControl>
                                    <TagSelector
                                        tags={[...skills]}
                                        buttonLabel="Add interest"
                                        defaultSelectedTags={interests}
                                        onUpdate={updateInterestsHandler}
                                    />
                                </FormControl>
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />
                <Separator className="my-5" />
                <div className="flex max-w-5xl justify-center">
                    <Button
                        type="submit"
                        className="ml-auto"
                        disabled={submitStatus}
                        loading={submitStatus}
                    >
                        Save changes
                    </Button>
                </div>
            </form>
        </Form>
    )
}
