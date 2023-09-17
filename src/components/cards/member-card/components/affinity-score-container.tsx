'use client'

import { useTheme } from 'next-themes'
import { Large, Small } from '../../../ui/typography'
import { cn } from '@/lib/utils'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    score: number
}

export function AffinityScoreContainer({ score, className, ...props }: Props) {
    const theme = useTheme()

    let withBorder = ''
    let scoreBgColor = 'bg-sky-100'
    let scoreBorderColor = 'border-sky-600'
    let scoreTextColor = 'text-sky-600'
    if (score > 70) {
        scoreBgColor = 'bg-green-100'
        scoreBorderColor = 'border-green-600'
        scoreTextColor = 'text-green-600'
    } else if (score > 30) {
        scoreBgColor = 'bg-secondary'
        scoreBorderColor = 'border-primary'
        scoreTextColor = 'text-primary'
    }

    if (theme.theme === 'dark' || theme.resolvedTheme === 'dark') {
        scoreBgColor = 'bg-yellow-100/[0]'
        withBorder = 'border'
    }

    return (
        <div
            className={cn(
                'w-16 rounded-md p-1 pb-2 text-center',
                withBorder,
                scoreBgColor,
                scoreBorderColor
            )}
            {...props}
        >
            <Large className={cn('text-lg font-bold', scoreTextColor)}>
                {score}%
            </Large>
            <Small className="block text-xs font-light leading-3 text-muted-foreground">
                Affinity score
            </Small>
        </div>
    )
}
