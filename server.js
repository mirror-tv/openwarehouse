const express = require('express')
const { keystone, apps } = require('./index.js')
const { createProxyMiddleware } = require('http-proxy-middleware')
const preview = require('./preview')

keystone
    .prepare({
        apps: apps,
        dev: process.env.NODE_ENV !== 'production',
    })
    .then(async ({ middlewares }) => {
        await keystone.connect()
        const app = express()
        app.use(middlewares).listen(3000)

        app.use('/preview', preview)
    })
