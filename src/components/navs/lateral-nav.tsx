import { AnchorButton, Button } from '@/components/ui/button'
import { H4, Large, Paragraph, Small } from '@/components/ui/typography'
import { IconType } from 'react-icons'
import {
    FiBookOpen,
    FiLayers,
    FiLifeBuoy,
    FiLogOut,
    FiSettings,
    FiUsers
} from 'react-icons/fi'
import { MdOutlineVerified } from 'react-icons/md'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import Link from 'next/link'

interface NavLinksProps {
    children: React.ReactNode
    href?: string
    icon?: IconType
}

function NavLink({ href, children, icon }: NavLinksProps) {
    return (
        <AnchorButton
            className="w-full justify-start"
            variant={'ghost'}
            href={href}
            icon={icon}
        >
            {children}
        </AnchorButton>
    )
}
//  className="flex flex-1 grow flex-col justify-between bg-cyan-400"
export async function Nav() {
    return (
        <nav className="w-full max-w-[270px] border-r px-3 pb-4 pt-8">
            <div className="flex h-full flex-1 flex-col justify-between">
                <div>
                    <header className="flex flex-row-reverse items-center justify-end gap-2 px-2">
                        <Paragraph className="m-0 p-0 font-extrabold">
                            CoderConnection
                        </Paragraph>
                        <Image
                            className="drop-shadow"
                            src="/src/images/logo.png"
                            alt="Logo"
                            width={32}
                            height={32}
                            style={{ objectFit: 'contain' }}
                        ></Image>
                    </header>
                    <ul className="mt-5">
                        <li>
                            <NavLink icon={FiLayers} href="/app/project-ideas">
                                Project ideas
                            </NavLink>
                        </li>
                        <li>
                            <NavLink icon={MdOutlineVerified}>
                                Finished projects
                            </NavLink>
                        </li>
                        <li>
                            <NavLink icon={FiUsers} href="/app/members">
                                Members
                            </NavLink>
                        </li>
                        <li>
                            <NavLink icon={FiBookOpen}>Resources</NavLink>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul className="mb-2">
                        <li>
                            <NavLink icon={FiLifeBuoy}>Support</NavLink>
                        </li>
                        <li>
                            <NavLink icon={FiSettings}>Settings</NavLink>
                        </li>
                    </ul>
                    <Separator />
                    <section className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Avatar>
                                <AvatarFallback>OR</AvatarFallback>
                            </Avatar>
                            <Link href="/app/account/settings/profile">
                                <Small className="font-semibold">
                                    @JohnDoeDev
                                </Small>
                            </Link>
                        </div>
                        <Button icon={FiLogOut} variant={'ghost'} />
                    </section>
                </div>
            </div>
        </nav>
    )
}
