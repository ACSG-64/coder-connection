import { FaGithub } from 'react-icons/fa6'
import SiteIcon from '../site-icon'
import { AnchorButton } from '../ui/button'
import { ThemeSelector } from '../theme-selector'

export default function Nav() {
    return (
        <div className="sticky top-0 w-full bg-background shadow">
            <nav className="mx-auto flex max-w-screen-xl items-center justify-between py-2">
                <SiteIcon />
                <div className="flex gap-8">
                    <AnchorButton variant={'ghost'} size={'lg'} href="/">
                        Features
                    </AnchorButton>
                    <AnchorButton variant={'ghost'} href="/project-ideas">
                        Project ideas
                    </AnchorButton>
                    <AnchorButton variant={'ghost'}>Community</AnchorButton>
                    <AnchorButton variant={'ghost'}>Resources</AnchorButton>
                </div>
                <div className="flex items-center gap-2">
                    <AnchorButton href="/api/auth/signin">Access</AnchorButton>
                    <ThemeSelector />
                </div>
            </nav>
        </div>
    )
}
