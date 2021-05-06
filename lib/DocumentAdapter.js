const { GCSAdapter } = require('./GCSAdapter.js')

class DocumentAdapter extends GCSAdapter {
    constructor(...args) {
        super(...args)
        this.gcsDir = 'assets/documents/'
    }

    async save({ stream, filename, mimetype, encoding, id }) {
        const { file, baseName, uploadedName } = this.prepareUpload(
            filename,
            id
        ) //filename saved on GCS
        let _meta = {}

        _meta.url = this.publicUrl(uploadedName)
        await this.uploadFile(stream, file, baseName)

        return { id, filename, _meta }
    }
}

module.exports = { DocumentAdapter }
