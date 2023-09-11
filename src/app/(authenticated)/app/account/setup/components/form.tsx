'use client'

import * as z from 'zod'
import { newUserForm } from '@/backend/core/services/register-user/schemas/new-user-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
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
import { H2, Paragraph } from '@/components/ui/typography'
import { Metadata } from 'next'
import { signOut } from 'next-auth/react'
import { useState } from 'react'
import { FaSlack } from 'react-icons/fa6'
import TimeZonesSelector from './time-zone-selector'

export const metadata: Metadata = {
    title: 'Account setup',
    description: 'Setup your account to become a full member'
}

interface OnboardingUserFormProps {
    timeZones: tag[]
}

export default function OnboardingUserForm({
    timeZones
}: OnboardingUserFormProps) {
    const [isSendingData, setIsSendingData] = useState(false)
    const form = useForm<z.infer<typeof newUserForm>>({
        resolver: zodResolver(newUserForm)
    })
    const slackId = useWatch({
        name: 'slackId',
        control: form.control
    })

    const selectTimeZone = (timeZone: tag) => {
        form.setValue('timeZone', timeZone)
        form.trigger('timeZone')
    }

    const requestCodeHandler = async () => {
        const isValidField = await form.trigger('slackId')
        if (!isValidField) return
        setIsSendingData(true)
        const res = await fetch('/api/app/slack-code/generate', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ slackId })
        })
        setIsSendingData(false)
    }

    const submitHandler = async (values: z.infer<typeof newUserForm>) => {
        setIsSendingData(true)
        const res = await fetch('/api/app/members/register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        if (res.status != 200) {
            setIsSendingData(false)
            return
        }
        signOut()
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(submitHandler)}>
                    <H2>1. Enter your basic details</H2>
                    {/* Name */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
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
                            <FormItem>
                                <FormLabel>Surname(s):</FormLabel>
                                <FormControl>
                                    <Input placeholder="Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Time zones */}
                    <FormField
                        control={form.control}
                        name="timeZone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Time zone:</FormLabel>
                                <FormControl>
                                    <TimeZonesSelector
                                        onSelect={selectTimeZone}
                                        value={field.value}
                                        timeZones={timeZones}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Name */}
                    <H2>2. Request access to our Slack workspace</H2>
                    <H2>3. Link your Slack profile</H2>
                    <Paragraph>
                        A verification code will be sent by
                        &#34;@CoderConnection [BOT]&#34; through a direct
                        message on Slack. If you don&#8217;t get a verification
                        code, request it again.
                    </Paragraph>
                    {/* Slack ID */}
                    <FormField
                        control={form.control}
                        name="slackId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Slack ID:</FormLabel>
                                <div className="flex gap-4">
                                    <FormControl>
                                        <Input
                                            placeholder="B457AD"
                                            {...field}
                                        />
                                    </FormControl>
                                    <Button
                                        type="button"
                                        variant={'secondary'}
                                        icon={FaSlack}
                                        disabled={isSendingData}
                                        onClick={() => requestCodeHandler()}
                                    >
                                        Send verification code
                                    </Button>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Verification code */}
                    <FormField
                        control={form.control}
                        name="verificationCode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Verification code:</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="fWi76xD-wp"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isSendingData}>
                        Finish account setup
                    </Button>
                </form>
            </Form>
        </>
    )
}
