import SiteIcon from '@/components/site-icon'
import { ThemeSelector } from '@/components/theme-selector'
import { AnchorButton } from '@/components/ui/button'
import { getServerLang } from '@/hooks/use-server-lang'
import { FaGithub } from 'react-icons/fa6'
import { getDictionary } from './lang/dictionary'

export default async function Nav() {
    const lang = getServerLang()
    const dict = await getDictionary(lang)
    return (
        <div className="sticky top-0 w-full bg-background shadow">
            <nav className="mx-auto flex max-w-screen-xl items-center justify-between py-2">
                <SiteIcon href="/" />
                <div className="flex gap-8">
                    <AnchorButton variant={'ghost'} href="/project-ideas">
                        {dict['project-ideas']}
                    </AnchorButton>
                    <AnchorButton variant={'ghost'}>
                        {dict.community}
                    </AnchorButton>
                    <AnchorButton variant={'ghost'}>
                        {dict.resources}
                    </AnchorButton>
                </div>
                <div className="flex items-center gap-2">
                    <AnchorButton href="/api/auth/signin">
                        {dict.access}
                    </AnchorButton>
                    <ThemeSelector />
                </div>
            </nav>
        </div>
    )
}
