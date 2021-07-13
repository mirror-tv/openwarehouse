const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')

// PreviewApp
// it generate a new preview route
class PreviewApp {
    constructor({ path }) {
        this._path = path
        // this.proxyTarget = process.env.K5_PREVIEW_URL || 'http://localhost:3001',
        this.proxyTarget = process.env.K5_PREVIEW_URL || 'https://dev.mnews.tw'
    }

    getPreviewRouter() {
        const preview = express.Router()

        preview.use((req, res, next) => {
            // check if this req is verified
            // if not, then redirect to login page
            if (req.session && req.session.keystoneListKey === 'User') {
                next()
                return
            }
            res.redirect('/admin/signin')
        })

        preview.get(
            '/*',
            // '/posts/*',
            createProxyMiddleware({
                target: this.proxyTarget,
                changeOrigin: true,
                pathRewrite: {
                    '/preview/posts': '/story',
                },
            })
        )

        return preview
    }

    // nuxt page has some route also need to proxy together
    // or preview page's source (like _nuxt folder .etc) won't have correct url path
    handleApiAndStaticFileRouter() {
        const nuxt = express.Router()

        nuxt.get(
            '/*',
            createProxyMiddleware({
                target: this.proxyTarget,
                changeOrigin: true,
            })
        )
        nuxt.post(
            '/*',
            createProxyMiddleware({
                target: this.proxyTarget,
                changeOrigin: true,
            })
        )

        return nuxt
    }

    prepareMiddleware() {
        const app = express()
        app.use(this._path, this.getPreviewRouter())

        // handle nuxt website's corresponding route
        app.use('/_nuxt', this.handleApiAndStaticFileRouter())
        app.use('/site.webmanifest', this.handleApiAndStaticFileRouter())
        app.use('/api', this.handleApiAndStaticFileRouter())

        return app
    }
}

module.exports = {
    PreviewApp,
}
