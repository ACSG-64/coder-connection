import IdeaCard from '@/components/cards/idea-card'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof IdeaCard> = {
    component: IdeaCard,
    tags: ['autodocs']
}

export default meta

type Story = StoryObj<typeof IdeaCard>

export const Card: Story = {
    args: {
        title: 'Self-hosted cloud',
        summary: 'Custom summary',
        topics: [
            { id: 1, name: 'JavaScript' },
            { id: 2, name: 'HTML' },
            { id: 3, name: 'CSS' },
            { id: 4, name: 'Python' }
        ],
        className: 'max-w-sm'
    }
}
