import LanguageSelector from '@/components/language-selector'
import { ThemeSelector } from '@/components/theme-selector'
import { AnchorButton } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { Small } from '@/components/ui/typography'
import { FiUserPlus } from 'react-icons/fi'
import { getDictionary } from '../lang/dictionary'
import { getServerLang } from '@/hooks/use-server-lang'

export async function SettingsDialog({
    children
}: {
    children: React.ReactNode
}) {
    const lang = getServerLang()
    const dict = await getDictionary(lang)

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{dict.settings}</DialogTitle>
                    <DialogDescription>
                        {dict['settings-legend']}
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <Small>{dict['change-theme']}</Small>
                        <ThemeSelector />
                    </div>
                    <div className="flex items-center justify-between">
                        <Small>{dict.profile}</Small>
                        <AnchorButton
                            href="/app/account/settings/profile"
                            icon={FiUserPlus}
                            variant={'outline'}
                            size={'sm'}
                        >
                            {dict['edit-profile']}
                        </AnchorButton>
                    </div>
                    <div className="flex items-center justify-between">
                        <Small>{dict.language}</Small>
                        <LanguageSelector />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}