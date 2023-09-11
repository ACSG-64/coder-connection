import enDict from './en.json'

export async function getDictionary(lang: string = 'en') {
    switch (lang) {
        case 'es':
            const esDict = await import('./es.json')
            return { ...enDict, ...esDict }
        default:
            return enDict
    }
}
