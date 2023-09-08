import { cookies } from 'next/headers'
import Switch from './components/switch'

const dict = {
    es: {
        salute: 'Hola'
    },
    en: {
        salute: 'Hello'
    }
}

function getLangDict(lang: string) {
    if (lang == 'es') return dict.es
    return dict.en
}

const COOKIE_NAME = 'preferences'
export default function LangTest() {
    const cookieStore = cookies()
    const theme = cookieStore.get(COOKIE_NAME)
    const cookieParsed = JSON.parse(theme?.value ?? '{}')
    const lang = cookieParsed?.lang ?? 'en'

    const dictLocale = getLangDict(lang)

    return (
        <>
            <h1>{dictLocale.salute}</h1>
            <Switch />
        </>
    )
}
