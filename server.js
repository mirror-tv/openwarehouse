const express = require('express')
const { keystone, apps } = require('./index.js')
const { createProxyMiddleware } = require('http-proxy-middleware')

keystone
    .prepare({
        apps: apps,
        dev: process.env.NODE_ENV !== 'production',
    })
    .then(async ({ middlewares }) => {
        await keystone.connect()
        const app = express()
        app.use(middlewares).listen(3000)

        const preview = express.Router()

        preview.use((req, res, next) => {
            if (req.session && req.session.keystoneListKey === 'User') {
                next()
                return
            }
            res.redirect('/admin/signin')
        })
        preview.get(
            '/posts/*',
            createProxyMiddleware({
                target: process.env.K5_PREVIEW_URL || 'http://localhost:3001',
                changeOrigin: true,
                pathRewrite: {
                    '/preview/posts': '/story',
                },
            })
        )
        app.use('/preview', preview)
    })
