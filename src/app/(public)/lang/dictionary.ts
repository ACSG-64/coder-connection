import enDict from './en.json'

export async function getDictionary(langCode: string = 'en') {
    switch (langCode) {
        case 'es':
            const enLang = await import('./es.json')
            return { ...enDict, ...enLang }
        default:
            return enDict
    }
}
