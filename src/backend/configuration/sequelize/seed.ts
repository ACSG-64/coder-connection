import orm from '@/backend/infrastructure/connectors/database/sequelize'
import {
    Skill,
    TimeZone,
    User,
    UserCompetency,
    UserInterest
} from '@/backend/infrastructure/sequelize/models'

async function createSyntheticUsers() {
    const timeZone = await TimeZone.findAll({
        attributes: ['id']
    })

    for (let i = 0; i < 10; i++) {
        const tzIdx = Math.round(Math.random() * timeZone.length) - 1
        const { id: timeZoneId } = timeZone[tzIdx]
        const userData = {
            name: 'Test' + i,
            surname: 'User' + i,
            username: 'test_user' + i,
            description: 'Description for User ' + i,
            profileImg: 'profile_img_url_' + i,
            gitHubProfileUrl: 'github.com/user' + i,
            linkedInProfileUrl: 'linkedin.com/in/user' + i,
            gitHubId: i,
            gitHubNodeId: 'node_id_' + i,
            slackId: 'slack_id_' + i,
            timeZoneId: timeZoneId,
            lastSeenAt: new Date()
        }
        const user = await User.findOrCreate({
            where: { username: userData.username },
            defaults: userData
        })
        assignCompetenciesAndSkills(user[0].id)
    }
}

const skills_p = Skill.findAll({ attributes: ['id'] })
async function assignCompetenciesAndSkills(userId: string) {
    for (let i = 0; i < 5; i++) {
        const skills = await skills_p
        const skillIdx = Math.round(Math.random() * skills.length) - 1
        const { id: skillId } = skills[skillIdx]
        const user = { userId, skillId }
        await UserCompetency.findOrCreate({ where: user, defaults: user })
    }
    for (let i = 0; i < 5; i++) {
        const skills = await skills_p
        const skillIdx = Math.round(Math.random() * skills.length) - 1
        const { id: skillId } = skills[skillIdx]
        const user = { userId, skillId }
        await UserInterest.findOrCreate({ where: user, defaults: user })
    }
}

;(async function () {
    orm.addModels([User, UserCompetency, UserInterest, TimeZone])
    await createSyntheticUsers()
})()
