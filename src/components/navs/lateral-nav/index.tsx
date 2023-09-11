import { AnchorButton, Button } from '@/components/ui/button'
import { Small } from '@/components/ui/typography'
import { IconType } from 'react-icons'
import {
    FiBookOpen,
    FiExternalLink,
    FiGitMerge,
    FiLayers,
    FiLifeBuoy,
    FiLogOut,
    FiSettings,
    FiUserPlus,
    FiUsers,
    FiZap
} from 'react-icons/fi'
import { MdOutlineVerified } from 'react-icons/md'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import SiteIcon from '../../site-icon'
import { getUser } from '@/backend/core/shared/get-user'
import { SettingsDialog } from './components/settings-dialog'
import { getServerLang } from '@/hooks/use-server-lang'
import { getDictionary } from './lang/dictionary'
import { cn } from '@/lib/utils'

interface NavLinksProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    children: React.ReactNode
    icon?: IconType
}

function NavLink({ className, ...props }: NavLinksProps) {
    return (
        <AnchorButton
            className="w-full justify-start"
            variant={'ghost'}
            {...props}
        />
    )
}

//  className="flex flex-1 grow flex-col justify-between bg-cyan-400"
interface LateralNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export async function LateralNav({ className, ...props }: LateralNavProps) {
    const user = await getUser()
    const lang = getServerLang()
    const dict = await getDictionary(lang)

    return (
        <nav
            className={cn(
                'w-full max-w-[270px] border-r px-3 pb-4 pt-8',
                className
            )}
            {...props}
        >
            <div className="flex h-full flex-1 flex-col justify-between">
                <div>
                    <SiteIcon href="/app" />
                    <ul className="mt-5">
                        <li>
                            <NavLink icon={FiLayers} href="/app/project-ideas">
                                {dict['project-ideas']}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink icon={MdOutlineVerified}>
                                {dict['finished-projects']}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink icon={FiGitMerge}>
                                {dict['working-groups']}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink icon={FiZap}>
                                {dict['group-matching']}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink icon={FiUsers} href="/app/members">
                                {dict.members}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                icon={FiBookOpen}
                                href="https://github.com/Coder-Connection/helpful-resporces/blob/main/README.md"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {dict.resources} <FiExternalLink />
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul className="mb-2">
                        <li>
                            <NavLink
                                icon={FiLifeBuoy}
                                href="https://github.com/Coder-Connection/documentation/wiki/Application-%E2%80%93-Support"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {dict.support} <FiExternalLink />
                            </NavLink>
                        </li>
                        <li>
                            <SettingsDialog>
                                <NavLink icon={FiSettings}>
                                    {dict.settings}
                                </NavLink>
                            </SettingsDialog>
                        </li>
                    </ul>
                    <Separator />
                    <section className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Avatar>
                                <AvatarImage src={user?.profileImg} />
                                <AvatarFallback>
                                    {`${user?.name[0]}${user?.surname[0]}`}
                                </AvatarFallback>
                            </Avatar>
                            <Small className="font-semibold">
                                @{user?.username}
                            </Small>
                        </div>
                        <Button icon={FiLogOut} variant={'ghost'} />
                    </section>
                </div>
            </div>
        </nav>
    )
}
