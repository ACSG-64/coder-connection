import * as dotenv from 'dotenv'
import path from 'path'

import orm from '@/backend/infrastructure/connectors/database/sequelize'
import * as Models from '@/backend/configuration/sequelize/models'

// Use all models
orm.addModels(Object.values(Models))
// Synchronize the DB with the models
orm.sync({ force: true }).then(() =>
    console.log('DB synchronized successfully')
)
