import orm from '@/backend/infrastructure/connectors/database/sequelize'
import {
    Skill,
    TimeZone,
    Topic
} from '@/backend/infrastructure/sequelize/models'
import args from '@/utils/args'

async function insertTimeZones() {
    return TimeZone.bulkCreate(
        Intl.supportedValuesOf('timeZone').map((tzIdentifier) => ({
            tzIdentifier: tzIdentifier.replace('_', ' ')
        })),
        {
            fields: ['tzIdentifier'],
            ignoreDuplicates: true
        }
    )
}

async function insertTopics() {
    const topics = [
        'web-application',
        'web-page',
        'mobile-application',
        'data-analysis',
        'data-science',
        'machine-learning',
        'backend-development',
        'desktop-application'
    ].sort()

    return Topic.bulkCreate(
        topics.map((topic) => ({ name: topic })),
        {
            fields: ['name'],
            ignoreDuplicates: true
        }
    )
}

async function insertSkills() {
    const languages = [
        'Python',
        'JavaScript',
        'Java',
        'C#',
        'PHP',
        'C++',
        'R',
        'TypeScript',
        'Swift',
        'Ruby',
        'Go (Golang)',
        'Kotlin',
        'Rust',
        'MATLAB',
        'Objective-C',
        'Dart',
        'Perl',
        'Scala',
        'Groovy',
        'Lua'
    ].sort()

    Skill.bulkCreate(
        languages.map((lang) => ({ name: lang })),
        {
            fields: ['name'],
            ignoreDuplicates: true
        }
    )
}

;(async function () {
    // Synchronize the DB with the models
    /* @ts-ignore */
    await orm.sync({ force: args.env != 'production' })
    console.log('DB synchronized successfully')
    // Insert topics & skills
    await Promise.all([insertTimeZones(), insertTopics(), insertSkills()])
    /* @ts-ignore */
    // if (args.env == 'development') await insertUsers()
    console.log('Topics & skills inserted successfully')
})()
