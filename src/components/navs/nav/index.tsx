import SiteIcon from '@/components/site-icon'
import { ThemeSelector } from '@/components/theme-selector'
import { AnchorButton } from '@/components/ui/button'
import { getServerLang } from '@/hooks/use-server-lang'
import { getDictionary as _getDictionary } from './lang/dictionary'
import { FiExternalLink } from 'react-icons/fi'
import { getSessionUser } from '@/backend/core/shared/get-user'
import { Suspense, cache } from 'react'

const getDictionary = cache(async (lang: string) => {
    return await _getDictionary(lang)
})

export default async function Nav() {
    const lang = getServerLang()
    const dict = await getDictionary(lang)
    return (
        <div className="sticky top-0 z-50 w-full bg-background shadow">
            <nav className="mx-auto flex max-w-screen-xl items-center justify-between py-2">
                <SiteIcon href="/" />
                <div className="flex gap-8">
                    <AnchorButton variant={'ghost'} href="/project-ideas">
                        {dict['project-ideas']}
                    </AnchorButton>
                    <AnchorButton variant={'ghost'}>
                        {dict.community}
                    </AnchorButton>
                    <AnchorButton
                        variant={'ghost'}
                        href="https://github.com/Coder-Connection/helpful-resporces/blob/main/README.md"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {dict.resources} <FiExternalLink />
                    </AnchorButton>
                </div>
                <div className="flex items-center gap-2">
                    <Suspense
                        fallback={
                            <AnchorButton href="/api/auth/signin">
                                {dict.access}
                            </AnchorButton>
                        }
                    >
                        <AccessButton />
                    </Suspense>
                    <ThemeSelector />
                </div>
            </nav>
        </div>
    )
}

async function AccessButton() {
    const lang = getServerLang()
    const dict = await getDictionary(lang)
    const user = await getSessionUser()

    return (
        <AnchorButton href={user ? '/app' : '/api/auth/signin'}>
            {dict.access}
        </AnchorButton>
    )
}
