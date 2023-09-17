import Link from 'next/link'
import { FaGithub } from 'react-icons/fa6'
import { Separator } from '../ui/separator'
import { Small } from '../ui/typography'
import { Label } from '../ui/label'
import LanguageSelector from '../language-selector'
import { getServerLang } from '@/hooks/use-server-lang'
import { getDictionary } from './lang/dictionary'

export async function Footer() {
    const lang = getServerLang()
    const dict = await getDictionary(lang)
    return (
        <footer>
            <Separator />
            <div className="mx-auto my-2 flex max-w-screen-xl items-center justify-between">
                <div>
                    <Small>
                        <Link
                            href="https://github.com/Coder-Connection/coder-connection"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex gap-1"
                        >
                            {dict['github-support']}
                            <FaGithub />
                        </Link>
                    </Small>
                </div>
                <div className="flex flex-wrap items-center gap-1">
                    <Label>{dict['select-language']}:</Label>
                    <LanguageSelector />
                </div>
            </div>
        </footer>
    )
}
