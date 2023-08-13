import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@/components/ui/button'

const meta: Meta<typeof Button> = {
    component: Button,
    tags: ['autodocs']
}

export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
    args: {
        variant: 'primary',
        children: 'Primary button'
    }
}

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        children: 'Secondary button'
    }
}
