import ProjectCard from '@/components/cards/project-card'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ProjectCard> = {
    component: ProjectCard,
    tags: ['autodocs']
}

export default meta

type Story = StoryObj<typeof ProjectCard>

export const Card: Story = {
    args: {
        title: 'Amazing project',
        summary: 'Descriptive, custom summary',
        className: 'max-w-sm'
    }
}
