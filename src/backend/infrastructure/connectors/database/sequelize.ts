import args from '@/utils/args'
import { Sequelize } from 'sequelize-typescript'

const env = args.env ?? process.env.ENV

function getSequelize() {
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

export default getSequelize()
