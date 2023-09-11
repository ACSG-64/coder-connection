import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@/components/ui/button'
import { FaGithub } from 'react-icons/fa6'

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

export const WithIcon: Story = {
    args: {
        variant: 'outline',
        children: 'Button with icon',
        icon: FaGithub
    }
}

export const Loading: Story = {
    args: {
        variant: 'outline',
        children: 'Button loading',
        icon: FaGithub,
        loading: true
    }
}
