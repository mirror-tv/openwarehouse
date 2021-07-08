const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')

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

module.exports = preview
