'use client'

import { useEffect, useRef, useState } from 'react'
import Tag from './tag'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem
} from './ui/command'
import { Button } from './ui/button'
import { ScrollArea } from './ui/scroll-area'

interface TagsSelectorProps {
    tags: tag[]
    buttonLabel?: string
    defaultSelectedTags?: tag[]
    disableButton?: boolean
    onUpdate: (tags: tag[]) => any
}

export default function TagSelector({
    tags: tagsArr,
    buttonLabel = 'Add tag',
    defaultSelectedTags = [],
    disableButton = false,
    onUpdate
}: TagsSelectorProps) {
    const [open, setOpen] = useState(false)
    const tags = useRef(tagsArr)
    const [selectedTags, setSelectedTags] = useState<tag[]>(defaultSelectedTags)
    const [unselectedTags, setUnselectedTags] = useState<tag[]>([])

    useEffect(() => {
        const selectedTagIds = new Set(selectedTags.map((tag) => tag.id))
        setUnselectedTags(() =>
            tags.current.filter(({ id }) => !selectedTagIds.has(id))
        )
        onUpdate(selectedTags)
    }, [selectedTags, onUpdate])

    const updateSelectionHandler = (tag: tag) => {
        setSelectedTags((tags) =>
            [...tags, tag].sort((a, b) => {
                if (a.name < b.name) return -1
                if (a.name > b.name) return 1
                return 0
            })
        )
    }

    const onDeleteTahHandler = (id: number) => {
        setSelectedTags((tags) => tags.filter((tag) => tag.id != id))
    }

    return (
        <section>
            <section>
                <div className="flex flex-wrap items-center gap-3">
                    {selectedTags.map(({ id, name }) => (
                        <Tag
                            key={id}
                            id={id}
                            name={name}
                            onDelete={() => onDeleteTahHandler(id)}
                        />
                    ))}
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                size={'sm'}
                                aria-expanded={open}
                            >
                                + {buttonLabel}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandInput placeholder="Search..." />
                                <CommandEmpty>
                                    You&#39;ve selected all options
                                </CommandEmpty>
                                <CommandGroup>
                                    <ScrollArea className="h-[200px]">
                                        {unselectedTags.map((tag) => {
                                            return (
                                                <CommandItem
                                                    key={tag.id}
                                                    onSelect={() => {
                                                        updateSelectionHandler(
                                                            tag
                                                        )
                                                    }}
                                                >
                                                    {tag.name}
                                                </CommandItem>
                                            )
                                        })}
                                    </ScrollArea>
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
            </section>
            <section></section>
        </section>
    )
}
