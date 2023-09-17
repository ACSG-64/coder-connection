import orm from '@/backend/infrastructure/connectors/database/sequelize'
import {
    GroupPermission,
    Skill,
    TimeZone,
    Topic
} from '@/backend/infrastructure/sequelize/models'
import { groupPermissions } from '@/constants/group-permissions'
import LANGUAGES from './classes/languages'
import TOPICS from './classes/topics'

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
    const promises = TOPICS.map((topic) => {
        Topic.findOrCreate({
            attributes: ['id'],
            where: { name: topic },
            defaults: { name: topic }
        })
    })

    return Promise.all(promises)
}

async function insertSkills() {
    const promises = LANGUAGES.map((lang) => {
        Skill.findOrCreate({
            attributes: ['id'],
            where: { name: lang },
            defaults: { name: lang }
        })
    })

    return Promise.all(promises)
}

async function insertPermissions() {
    const permissions = Object.values(groupPermissions).sort()

    return GroupPermission.bulkCreate(
        permissions.map((lang) => ({ name: lang })),
        { fields: ['name'], ignoreDuplicates: true }
    )
}

;(async function () {
    orm.addModels([TimeZone, Topic, Skill, GroupPermission])
    // Synchronize the DB with the models
    /* @ts-ignore */
    // Insert topics & skills
    await Promise.all([
        insertTimeZones(),
        insertTopics(),
        insertSkills(),
        insertPermissions()
    ])
    /* @ts-ignore */
    console.log('Topics & skills inserted successfully')
})()
