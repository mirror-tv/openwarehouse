const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')

// PreviewApp
// it generate a new preview route
class PreviewApp {
    constructor({ path }) {
        this._path = path
        this.proxyTarget = process.env.K5_PREVIEW_URL || 'http://localhost:3000'
    }

    checkAuthentication(req, res, next) {
        if (req.session && req.session.keystoneListKey === 'User') {
            next()
            return
        }
        res.redirect('/admin/signin')
    }

    createPreviewServerProxy(config) {
        const headers = config && config.headers ? config.headers : {}

        return createProxyMiddleware({
            target: this.proxyTarget,
            changeOrigin: true,
            onProxyRes: (proxyRes) => {
                // clear cache-control setting
                for (const headerKey in headers) {
                    proxyRes.headers[headerKey] = headers[headerKey]
                }
            },
        })
    }

    prepareMiddleware() {
        const app = express()

        // handle root route (in here: /story) proxy
        app.use(
            this._path,
            this.checkAuthentication,
            this.createPreviewServerProxy({
                headers: { 'Cache-Control': 'no-store' },
            })
        )

        // handle nuxt website's corresponding route
        // nuxt page has some route also need to be proxyed together
        // otherwise preview page's source (like _nuxt folder .etc) won't have correct url path
        app.use('/_nuxt/*', this.createPreviewServerProxy())
        app.use('/api/*', this.createPreviewServerProxy())

        return app
    }
}

module.exports = {
    PreviewApp,
}
