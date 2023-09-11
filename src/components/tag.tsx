'use client'

import { FiX } from 'react-icons/fi'
import { Button } from './ui/button'
import { Small } from './ui/typography'

const colorsArr = [
    { text: '#027A48', background: '#ECFDF3' },
    { text: '#02077A', background: '#EDEEFF' },
    { text: '#B5490D', background: '#FFEFE7' },
    { text: '#CC1276', background: '#FFEFF8' }
]

interface TagProps {
    id: number
    name: string
    onDelete?: () => any
}

export default function Tag({ id, name, onDelete }: TagProps) {
    const color = colorsArr[id % colorsArr.length]

    return (
        <div
            className="inline-block rounded-full px-3 py-0.5"
            style={{ backgroundColor: color.background }}
        >
            <div
                className="flex items-center gap-1"
                style={{ color: color.text }}
            >
                <Small>{name}</Small>
                {onDelete && (
                    <Button
                        className="m-0 h-5 min-h-0 p-0"
                        icon={FiX}
                        variant={'ghost'}
                        type="button"
                        onClick={onDelete}
                    />
                )}
            </div>
        </div>
    )
}
