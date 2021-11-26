const { app, database } = require('./configs/config')

// Update with your config settings.
module.exports = {
    client: 'postgresql',
    connection: `postgresql://${database.acc}:${database.pass}@${database.host}/${database.db}`,
    migrations: {
        directory: `./migrations/${app.project}`,
    },
}
