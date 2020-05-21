const { Keystone } = require('@keystonejs/keystone');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { KnexAdapter: Adapter } = require('@keystonejs/adapter-knex');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');

const { main, database, session } = require('./configs/config.js')
const lists = require('./lists');

const redis = require('redis');
const expressSession = require('express-session');
const RedisStore = require('connect-redis')(expressSession);

const adapterConfig = { knexOptions: { connection: `postgresql://${database.acc}:${database.pass}@${database.host}/${database.db}` } };

const keystone = new Keystone({
  name: main.applicationName,
  adapter: new Adapter(adapterConfig),
  cookieSecret: session.cookieSecret,
  sessionStore: new RedisStore({
    client: redis.createClient({
      host: session.redis.host,
      port: session.redis.port,
      auth_pass: session.redis.authPass,
      prefix: session.redis.prefix,
    }),
    options: {
      ttl: session.redis.ttl
    }
  })
});

for (var name in lists) {
  keystone.createList(name, lists[name]);
}

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: main.authList,
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
