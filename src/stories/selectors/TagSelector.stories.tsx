import TagSelector from '@/components/tags/tag-selector'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof TagSelector> = {
    component: TagSelector,
    tags: ['autodocs']
}

export default meta

type Story = StoryObj<typeof TagSelector>

export const Primary: Story = {
    args: {
        defaultSelectedTags: [
            { id: 1, name: 'JavaScript' },
            { id: 2, name: 'HTML' }
        ],
        tags: [
            { id: 3, name: 'CSS' },
            { id: 4, name: 'Python' }
        ]
    }
}
