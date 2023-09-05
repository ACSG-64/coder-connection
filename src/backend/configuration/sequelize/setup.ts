import * as dotenv from 'dotenv'
import orm from '@/backend/infrastructure/connectors/database/sequelize'
import {
    Skill,
    Topic,
    User,
    UserCompetency
} from '@/backend/infrastructure/sequelize/models'
import args from '@/utils/args'
//import { nanoid } from 'nanoid/async'

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

async function insertUsers() {
    const { nanoid } = await import('nanoid')

    const details = [
        {
            name: 'John',
            surname: 'Doe',
            username: '@johndev',
            gitHubID: Math.round(Math.random() * 1000),
            gitHubNodeId: nanoid(),
            slackId: nanoid()
        },
        {
            name: 'Jane',
            surname: 'Roe',
            username: '@janedev',
            gitHubID: Math.round(Math.random() * 1000),
            gitHubNodeId: nanoid(),
            slackId: nanoid()
        },
        {
            name: 'Daniel',
            surname: 'Barr',
            username: '@danieldev',
            gitHubID: Math.round(Math.random() * 1000),
            gitHubNodeId: nanoid(),
            slackId: nanoid()
        },
        {
            name: 'Maria',
            surname: 'Simons',
            username: '@mariadev',
            gitHubID: Math.round(Math.random() * 1000),
            gitHubNodeId: nanoid(),
            slackId: nanoid()
        }
    ]
    const res = await Promise.all(details.map((detail) => User.create(detail)))
    const userIds = res.map((r) => r.id)

    const skills = await Skill.findAll({ attributes: ['id'] })
    const skillIds = skills.map(({ dataValues: { id } }) => id)

    for (let userId of userIds) {
        for (let i = 0; i < Math.round(Math.random() * 10); ++i) {
            const skillIdx = Math.round(Math.random() * (skillIds.length - 1))
            const skillId = skillIds[skillIdx]
            await UserCompetency.create({ userId, skillId })
        }
    }
}

;(async function () {
    // Use all models
    // Synchronize the DB with the models
    await orm.sync({ force: true })
    console.log('DB synchronized successfully')
    // Insert topics & skills
    await Promise.all([insertTopics(), insertSkills()])
    console.log(process.env.ENV)
    /* @ts-ignore */
    if (args.env == 'development') await insertUsers()
    console.log('Topics & skills inserted successfully')
})()
