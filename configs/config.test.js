/* This configuration follows YAML naming style. */

module.exports = {
    app: {
        applicationName: "Sorcerer's Stone",
        authList: "User",
        dropDatabase: true,
        project: "mirrormedia",
    },
    database: {
        host: "10.124.48.3",
        db: "sorcerers_stone",
        acc: "keystone_agent",
        pass: "keystone_agent11",
    },
    session: {
        cookieSecret: "6629352e37a0a7e73497f62720207225649542c064eda9dc8d16134721017303",
        ttl: 3600,
        prefix: "ks-sess"
    },
    redis: {
        host: "10.140.0.104",
        port: "6379",
        authPass: "testla"
    }
}