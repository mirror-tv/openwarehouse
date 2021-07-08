const express = require('express')
const preview = require('./preview')

// PreviewApp
// it generate a new preview route
class PreviewApp {
    constructor({ path }) {
        this._path = path
    }

    prepareMiddleware() {
        const app = express()
        app.use(this._path, preview)
        return app
    }
}

module.exports = {
    PreviewApp,
}
