import { Sequelize } from "sequelize-typescript";

function getSequelize() {
    switch (process.env.ENV) {
        case 'development':
            return new Sequelize({
                dialect: 'sqlite',
                storage: 'dev_db.sqlite',
            })
        case 'testing':
            return new Sequelize('sqlite::memory:')
        default:
            // TODO add production configuration
            return new Sequelize()
    }

}

export default getSequelize()