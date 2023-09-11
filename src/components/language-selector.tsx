'use client'

import { useRouter } from 'next/navigation'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from './ui/select'
import { useEffect, useState } from 'react'
import { getClientLang } from '@/hooks/use-client-lang'

export default function LanguageSelector({
    defaultValue,
    onValueChange,
    ...props
}: React.ComponentProps<typeof Select>) {
    const router = useRouter()
    const [lang, setLang] = useState('en')

    useEffect(() => {
        setLang(getClientLang())
    }, [])

    const selectHandler = async (lang: string) => {
        const res = await fetch('/api/lang', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                credentials: 'same-origin'
            },
            body: JSON.stringify({ lang })
        })
        if (res.status !== 200) return
        localStorage.setItem('lang', lang)
        setLang(lang)
        router.refresh()
    }

    return (
        <Select onValueChange={selectHandler} defaultValue={lang} {...props}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="English" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="it">Italiano</SelectItem>
                    <SelectItem value="cs">Čeština</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
