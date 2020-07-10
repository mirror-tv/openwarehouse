const { Keystone } = require('@keystonejs/keystone');
const { GraphQLApp } = require('@keystonejs/app-graphql');
// const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { KnexAdapter: Adapter } = require('@keystonejs/adapter-knex');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');

const { app, database, session, redis: redisConf } = require('./configs/config.test.js')
const lists = require(`./lists/${app.project}`);
const createDefaultAdmin = require('./helpers/createDefaultAdmin')

const redis = require('redis');
const expressSession = require('express-session');
const RedisStore = require('connect-redis')(expressSession);
const { RedisCache } = require('apollo-server-cache-redis');
const responseCachePlugin = require('apollo-server-plugin-response-cache');

const adapterConfig = {
  dropDatabase: app.dropDatabase,
  knexOptions: {
    client: 'postgres',
    connection: `postgresql://${database.acc}:${database.pass}@${database.host}/${database.db}`,
  }
};

const keystone = new Keystone({
  name: app.applicationName,
  adapter: new Adapter(adapterConfig),
  cookieSecret: session.cookieSecret,
  onConnect: createDefaultAdmin,
  sessionStore: new RedisStore({
    client: redis.createClient({
      host: redisConf.host,
      port: redisConf.port,
      auth_pass: redisConf.authPass,
      prefix: session.prefix,
    }),
    options: {
      ttl: session.ttl
    }
  })
});

// for (var name in lists) {
//   keystone.createList(name, lists[name]);
// }

for (var name in lists) {
  keystone.createList(name, {
    ...lists[name],
    cacheHint: {
      scope: 'PUBLIC',
      maxAge: 1800,
    }
  });
}

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: app.authList,
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(
      {
        apollo: {
          cache: new RedisCache({
            ttl: 3600,
            host: redisConf.host,
            port: redisConf.port,
            password: redisConf.authPass,
            namespace: 'stresstest-apollo-cache.',
          }),
          introspection: true,
          // debug: true,
          tracing: true,
          cacheControl: {
            defaultMaxAge: 7200,
          },
          ttl: 3600,
          plugins: [responseCachePlugin()],
        },
      }
    ),
    // new AdminUIApp({
    //   enableDefaultRoute: true,
    //   hooks: require.resolve('./hooks/app'),
    //   authStrategy,
    // }),
  ],
};
