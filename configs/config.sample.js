module.exports = {
    main: {
        applicationName: "applicationName",
        authList: "authList"
    },
    database: {
        host: "host",
        db: "name",
        acc: "acc",
        pass: "pass",
    },
    session: {
        cookieSecret: "cookieSecret",
        redis: {
            host: "host",
            port: "port",
            ttl: 3600,
            authPass: "authPass",
            prefix: "sess"
        }
    }
}