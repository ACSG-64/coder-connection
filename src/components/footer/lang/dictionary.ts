import enDict from './en.json'

export async function getDictionary(lang: string = 'en') {
    switch (lang) {
        case 'es':
            const dict = await import('./es.json')
            return { ...enDict, ...dict }
        default:
            return enDict
    }
}
