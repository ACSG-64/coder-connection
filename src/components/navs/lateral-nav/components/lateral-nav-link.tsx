import { AnchorButton } from '@/components/ui/button'
import { IconType } from 'react-icons'

interface LateralNavLinkProps
    extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    children: React.ReactNode
    icon?: IconType
}
export function LateralNavLink({ className, ...props }: LateralNavLinkProps) {
    return (
        <AnchorButton
            className="w-full justify-start"
            variant={'ghost'}
            {...props}
        />
    )
}
