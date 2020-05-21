const { Keystone } = require('@keystonejs/keystone');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { KnexAdapter: Adapter } = require('@keystonejs/adapter-knex');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');

const { DB_ACCOUNT, DB_PWD, SERVER_IP, DB_NAME, COOKIE_SECRET } = require('./configs/config.js')
const Lists = require('./lists');

const applicationName = 'Corner Stone';
const adapterConfig = { knexOptions: { connection: `postgresql://${DB_ACCOUNT}:${DB_PWD}@${SERVER_IP}/${DB_NAME}` } };

const keystone = new Keystone({
  name: applicationName,
  adapter: new Adapter(adapterConfig),
  cookieSecret: COOKIE_SECRET
});

Lists.createLists(keystone);

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp({
      enableDefaultRoute: true,
      authStrategy,
    }),
    new AdminUIApp({
      enableDefaultRoute: true,
      authStrategy,
    }),
  ],
};
