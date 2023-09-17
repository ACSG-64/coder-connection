import orm from '@/backend/infrastructure/connectors/database/sequelize'
import args from '@/utils/args'
;(async function () {
    // Synchronize the DB with the models
    /* @ts-ignore */
    await orm.sync({
        /* @ts-ignore */
        force: args.env != 'production',
        /* @ts-ignore */
        alter: args.env == 'production'
    })
})()
