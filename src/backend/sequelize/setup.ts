import * as dotenv from 'dotenv'
import path from 'path'
dotenv.config({path: path.join(__dirname, '..', '..', '..', '.env.local')})

import orm from '@/backend/connectors/database/sequelize'

import {
    GroupMatchingApplication, GroupMatchingProjectIdea, GroupMatchingSkill,
    OnboardingUser, SlackVerificationCode,
    Project, UserProject,
    ProjectIdeaDraft, ProjectIdea, TopicProject,
    Country, TimeZone,
    UserCompetency, UserInterest, User,
    Application, Invitation, Membership, TalentPostSkill, TalentPost, WorkingGroup,
    Skill, Topic
} from '@/backend/sequelize/models/index'

// Import all models
orm.addModels([
    GroupMatchingApplication, GroupMatchingProjectIdea, GroupMatchingSkill,
    OnboardingUser, SlackVerificationCode,
    Project, UserProject,
    ProjectIdeaDraft, ProjectIdea, TopicProject,
    Country, TimeZone,
    UserCompetency, UserInterest, User,
    Application, Invitation, Membership, TalentPostSkill, TalentPost, WorkingGroup,
    Skill, Topic
])
// Synchronize the DB with the models
orm.sync({ force: true }).then(() => console.log('DB synchronized successfully'))
