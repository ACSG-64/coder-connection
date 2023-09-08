import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover'
import { Check, ChevronsUpDown } from 'lucide-react'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem
} from '@/components/ui/command'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

interface TimeZonesSelectorProps {
    value: tag | void
    timeZones: tag[]
    onSelect: (timeZone: tag) => any
}

export default function TimeZonesSelector({
    value,
    timeZones,
    onSelect
}: TimeZonesSelectorProps) {
    const selectHandler = (timeZone: tag) => {
        onSelect(timeZone)
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                        'min-w-[200px] justify-between',
                        !value && 'text-muted-foreground'
                    )}
                >
                    {value?.name ?? 'Select time zone'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search framework..." />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                        <ScrollArea className="h-[200px]">
                            {timeZones.map((timeZone) => (
                                <CommandItem
                                    value={timeZone.name}
                                    key={timeZone.id}
                                    onSelect={() => selectHandler(timeZone)}
                                >
                                    <Check
                                        className={cn(
                                            'mr-2 h-4 w-4',
                                            value?.id === timeZone.id
                                                ? 'opacity-100'
                                                : 'opacity-0'
                                        )}
                                    />
                                    {timeZone.name}
                                </CommandItem>
                            ))}
                        </ScrollArea>
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
