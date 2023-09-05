import type { Meta, StoryObj } from '@storybook/react'
import { AnchorButton, AnchorButtonProps } from '@/components/ui/button'
import { FaGithub } from 'react-icons/fa6'

const meta: Meta<AnchorButtonProps> = {
    component: AnchorButton,
    tags: ['autodocs']
}

export default meta

type Story = StoryObj<AnchorButtonProps>

export const Primary: Story = {
    args: {
        variant: 'primary',
        children: 'Primary button'
    }
}

export const WithIcon: Story = {
    args: {
        variant: 'outline',
        children: 'Anchor button with icon',
        icon: FaGithub
    }
}
