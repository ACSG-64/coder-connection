'use client'

import { Button } from '@/components/ui/button'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FiTrash2 } from 'react-icons/fi'
import { Control } from 'react-hook-form'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip'

interface FeatureFieldProps {
    key: string
    index: number
    control: Control<any>
    onRemoveHandler: () => void
}

export function FeatureField({
    key,
    index,
    control,
    onRemoveHandler
}: FeatureFieldProps) {
    return (
        <FormField
            key={key}
            control={control}
            name={`features.${index}.feature`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="italic">
                        Feature {index + 1}:
                    </FormLabel>
                    <div className="flex gap-2">
                        <FormControl>
                            <Input
                                placeholder="There should be X so that Y"
                                {...field}
                            />
                        </FormControl>
                        {index > 2 && (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            icon={FiTrash2}
                                            variant={'destructive'}
                                            title={`Remove feature #${
                                                index + 1
                                            }`}
                                            onClick={onRemoveHandler}
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        Remove feature #{index + 1}
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
