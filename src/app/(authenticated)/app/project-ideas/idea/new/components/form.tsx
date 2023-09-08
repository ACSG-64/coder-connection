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
import TagSelector from '@/components/tag-selector'
import { FeatureField } from './feature-field'

interface NewIdeaFormProps {
    topics: tag[]
}

export default function NewIdeaForm({ topics }: NewIdeaFormProps) {
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
        await fetch('/api/app/project-ideas/idea/new', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
    }

    return (
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
                    <Button type="submit">Submit project idea</Button>
                </div>
            </form>
        </Form>
    )
}
