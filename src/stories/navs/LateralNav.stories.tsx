import { LateralNav } from '@/components/navs/lateral-nav'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof LateralNav> = {
    component: LateralNav,
    tags: ['autodocs']
}

export default meta

type Story = StoryObj<typeof LateralNav>

export const Card: Story = {}
