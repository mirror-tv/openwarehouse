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

    createPreviewServerProxy() {
        return createProxyMiddleware({
            target: this.proxyTarget,
            changeOrigin: true,
        })
    }

    prepareMiddleware() {
        const app = express()
        const previewServerProxy = this.createPreviewServerProxy()

        // handle root route (in here: /story) proxy
        app.use(this._path, this.checkAuthentication, previewServerProxy)

        // handle nuxt website's corresponding route
        // nuxt page has some route also need to be proxyed together
        // otherwise preview page's source (like _nuxt folder .etc) won't have correct url path
        app.use('/_nuxt/*', previewServerProxy)
        app.use('/api/*', previewServerProxy)

        return app
    }
}

module.exports = {
    PreviewApp,
}
