const enDict = {
    'small-motto': 'A place where tech enthusiasts can',
    'big-motto': 'Develop projects collaboratively',
    summary:
        'Whether you are early in your career or are an experienced developer, CoderConnection is the ideal place to meet other developers and create meaningful projects together. Here you can develop with others, lead teams, share knowledge, learn by doing, etc., CoderConnections is here to help you grow your career'
}

export async function getDictionary(langCode: string = 'en') {
    switch (langCode) {
        case 'es':
            const enLang = {
                'small-motto':
                    'Un lugar donde entusiastas de la tecnología pueden',
                'big-motto': 'Desarrollar proyectos colaborativamente'
            }
            return { ...enDict, ...enLang }
        default:
            return enDict
    }
}
