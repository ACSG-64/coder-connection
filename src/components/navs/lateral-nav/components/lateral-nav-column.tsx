import { Button } from '@/components/ui/button'
import { Small } from '@/components/ui/typography'
import {
    FiBookOpen,
    FiExternalLink,
    FiGitMerge,
    FiLayers,
    FiLifeBuoy,
    FiLogOut,
    FiSettings,
    FiUsers,
    FiZap
} from 'react-icons/fi'
import { MdOutlineVerified } from 'react-icons/md'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getSessionUser } from '@/backend/core/shared/get-user'
import { getServerLang } from '@/hooks/use-server-lang'
import { getDictionary } from '../lang/dictionary'
import { cn } from '@/lib/utils'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip'
import Link from 'next/link'
import SiteIcon from '@/components/site-icon'
import { LateralNavLink } from './lateral-nav-link'
import { SettingsDialog } from './settings-dialog'

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export async function LateralNavColumn({ className, ...props }: Props) {
    const user = await getSessionUser()
    const lang = getServerLang()
    const dict = await getDictionary(lang)

    return (
        <div
            className={cn(
                'flex h-full flex-1 flex-col justify-between',
                className
            )}
            {...props}
        >
            <div>
                <SiteIcon href="/app" />
                <ul className="mt-5">
                    <li>
                        <LateralNavLink
                            icon={FiLayers}
                            href="/app/project-ideas"
                        >
                            {dict['project-ideas']}
                        </LateralNavLink>
                    </li>
                    <li>
                        <LateralNavLink
                            icon={MdOutlineVerified}
                            href="/app/project-showcase"
                        >
                            {dict['finished-projects']}
                        </LateralNavLink>
                    </li>
                    <li>
                        <LateralNavLink icon={FiUsers} href="/app/members">
                            {dict.members}
                        </LateralNavLink>
                    </li>
                    <li>
                        <LateralNavLink
                            icon={FiGitMerge}
                            href="/app/working-groups"
                        >
                            {dict['working-groups']}
                        </LateralNavLink>
                    </li>
                    <li>
                        <LateralNavLink icon={FiZap} href="/app/group-matching">
                            {dict['group-matching']}
                        </LateralNavLink>
                    </li>
                    <li>
                        <LateralNavLink
                            icon={FiBookOpen}
                            href="https://github.com/Coder-Connection/helpful-resporces/blob/main/README.md"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {dict.resources} <FiExternalLink />
                        </LateralNavLink>
                    </li>
                </ul>
            </div>
            <div>
                <ul className="mb-2">
                    <li>
                        <LateralNavLink
                            icon={FiLifeBuoy}
                            href="https://github.com/Coder-Connection/documentation/wiki/Application-%E2%80%93-Support"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {dict.support} <FiExternalLink />
                        </LateralNavLink>
                    </li>
                    <li>
                        <SettingsDialog>
                            <LateralNavLink icon={FiSettings}>
                                {dict.settings}
                            </LateralNavLink>
                        </SettingsDialog>
                    </li>
                </ul>
                <Separator />
                <section className="mt-4 flex items-center justify-between">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href={`/app/members/profile/${user?.username}`}
                                    className="flex flex-1 items-center gap-2"
                                >
                                    <Avatar>
                                        <AvatarImage src={user?.profileImg} />
                                        <AvatarFallback>
                                            {`${user?.name[0]}${user?.surname[0]}`}
                                        </AvatarFallback>
                                    </Avatar>
                                    <Small className="font-semibold">
                                        @{user?.username}
                                    </Small>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent>Go to your profile</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button icon={FiLogOut} variant={'ghost'} />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Logout</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </section>
            </div>
        </div>
    )
}
