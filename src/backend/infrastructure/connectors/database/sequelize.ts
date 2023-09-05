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
                //timezone: '00:00'
                //repositoryMode: true
            })
        case 'testing':
            return new Sequelize('sqlite::memory:')
        default:
            // TODO add production configuration
            return new Sequelize()
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
