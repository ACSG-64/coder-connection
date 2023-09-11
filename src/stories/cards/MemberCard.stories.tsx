import MemberCard from '@/components/cards/member-card'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof MemberCard> = {
    component: MemberCard,
    tags: ['autodocs']
}

export default meta

type Story = StoryObj<typeof MemberCard>

export const Card: Story = {
    args: {
        name: 'Jane',
        surname: 'Roe',
        username: '@JaneRoeCoder',
        affinityScore: 83,
        className: 'max-w-sm'
    }
}
