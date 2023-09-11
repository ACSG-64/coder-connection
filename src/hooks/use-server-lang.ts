import { cookies } from 'next/headers'
import { cache } from 'react'

const COOKIE_NAME = 'preferences'
function serverLang(): string {
    const cookieStore = cookies()
    const preferencesCookie = cookieStore.get(COOKIE_NAME)
    const cookieParsed = JSON.parse(preferencesCookie?.value ?? '{}')
    return cookieParsed?.lang ?? 'en'
}

export const getServerLang = cache(serverLang)
