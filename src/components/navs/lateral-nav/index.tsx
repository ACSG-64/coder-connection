import { Button } from '@/components/ui/button'
import { Small } from '@/components/ui/typography'
import {
    FiBookOpen,
    FiExternalLink,
    FiGitMerge,
    FiLayers,
    FiLifeBuoy,
    FiLogOut,
    FiMenu,
    FiSettings,
    FiUsers,
    FiZap
} from 'react-icons/fi'
import { MdOutlineVerified } from 'react-icons/md'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import SiteIcon from '../../site-icon'
import { getSessionUser } from '@/backend/core/shared/get-user'
import { SettingsDialog } from './components/settings-dialog'
import { getServerLang } from '@/hooks/use-server-lang'
import { getDictionary } from './lang/dictionary'
import { cn } from '@/lib/utils'
import { LateralNavLink } from './components/lateral-nav-link'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip'
import Link from 'next/link'
import { LateralNavColumn } from './components/lateral-nav-column'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet'
import Image from 'next/image'

//  className="flex flex-1 grow flex-col justify-between bg-cyan-400"
interface LateralNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export async function LateralNav({ className, ...props }: LateralNavProps) {
    const user = await getSessionUser()
    const lang = getServerLang()
    const dict = await getDictionary(lang)

    return (
        <nav
            className={cn(
                'border-r px-3 pb-4 pt-8 sm:w-full sm:max-w-[270px]',
                className
            )}
            {...props}
        >
            <LateralNavColumn className="hidden sm:flex" />

            <div className="flex items-center gap-2 pb-5 sm:hidden">
                <Image
                    className="drop-shadow"
                    src="/src/images/logo.png"
                    alt="Logo"
                    width={50}
                    height={50}
                    style={{ objectFit: 'contain' }}
                />
            </div>

            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        className="inline-flex h-[55px] sm:hidden"
                        variant={'outline'}
                        size={'sm'}
                    >
                        <span className="text-[30px]">
                            <FiMenu />
                        </span>
                    </Button>
                </SheetTrigger>
                <SheetContent side={'left'}>
                    <LateralNavColumn />
                </SheetContent>
            </Sheet>
        </nav>
    )
}
