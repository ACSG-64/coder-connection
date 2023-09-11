const enDict = {
    'project-ideas': 'Project ideas',
    community: 'Community',
    resources: 'Resources',
    access: 'Access'
}

export async function getDictionary(lang: string = 'en') {
    switch (lang) {
        case 'es':
            const dict = {
                'project-ideas': 'Ideas de proyectos',
                community: 'Comunidad',
                resources: 'Recursos',
                access: 'Acceder'
            }
            return { ...enDict, ...dict }
        default:
            return enDict
    }
}
