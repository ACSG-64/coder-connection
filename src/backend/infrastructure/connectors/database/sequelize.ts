import * as dotenv from 'dotenv'
import args from '@/utils/args'
import { Sequelize } from 'sequelize-typescript'
import * as Models from '@/backend//infrastructure/sequelize/models'
import pg from 'pg'

/* @ts-ignore */
const env = args.env ?? process.env.ENV

function getSequelizeInstance() {
    switch (env) {
        case 'development':
            return new Sequelize({
                dialect: 'sqlite',
                storage: 'dev_db.sqlite'
            })
        case 'testing':
            return new Sequelize('sqlite::memory:')
        default:
            dotenv.config()
            /* @ts-ignore */
            return new Sequelize(process.env.PRODUCTION_DB_CONNECTION, {
                dialectModule: pg,
                dialect: 'postgres',
                timezone: '00:00'
            })
    }
}

function addModels(sequelize: Sequelize) {
    sequelize.addModels(Object.values(Models))
    return sequelize
}

function getSequelize() {
    const sequelize = getSequelizeInstance()
    addModels(sequelize)
    return sequelize
}

let sequelize: Sequelize
if (process.env.NODE_ENV === 'production') {
    sequelize = getSequelize()
} else {
    /* @ts-ignore */
    if (!global.sequelize) {
        /* @ts-ignore */
        global.sequelize = getSequelize()
    }
    /* @ts-ignore */
    sequelize = addModels(global.sequelize)
}

export default sequelize
