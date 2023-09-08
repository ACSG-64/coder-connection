import * as dotenv from 'dotenv'
import args from '@/utils/args'
import { Sequelize } from 'sequelize-typescript'
import * as Models from '@/backend//infrastructure/sequelize/models'

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

export default getSequelize()
