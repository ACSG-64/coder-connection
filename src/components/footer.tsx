import Link from 'next/link'
import LanguageSelector from './language-selector'
import { Label } from './ui/label'
import { Small } from './ui/typography'
import { Separator } from './ui/separator'
import { FaGithub } from 'react-icons/fa6'

export function Footer() {
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
                            Support the project on GitHub
                            <FaGithub />
                        </Link>
                    </Small>
                </div>
                <div className="flex flex-wrap items-center gap-1">
                    <Label>Select your language:</Label>
                    <LanguageSelector />
                </div>
            </div>
        </footer>
    )
}
