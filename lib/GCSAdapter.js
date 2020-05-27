const {Storage} = require('@google-cloud/storage');
const urlJoin = require('url-join');

// process.env.GOOGLE_APPLICATION_CREDENTIALS = 'configs/gcskeyfile.json'
// GOOGLE_APPLICATION_CREDENTIALS

module.exports = class GCSAdapter {
    constructor(gcskeyfilePath) {
        process.env.GOOGLE_APPLICATION_CREDENTIALS = gcskeyfilePath;
        this.storage = new Storage();
        this.bucket = this.storage.bucket('mirrormedia-files');
    }

    async uploadFile(filename) {
        // Uploads a local file to the bucket
        await this.bucket.upload(filename, {
            // Support for HTTP requests made with `Accept-Encoding: gzip`
            gzip: true,
            // By setting the option `destination`, you can change the name of the
            // object you are uploading to a bucket.
            metadata: {
                // Enable long-lived HTTP caching headers
                // Use only if the contents of the file will never change
                // (If the contents will change, use cacheControl: 'no-cache')
                cacheControl: 'public, max-age=31536000',
            },
        });

        console.log(`${filename} uploaded.`);
    }

    async deleteFile(filename) {
        await this.bucket.file(filename).delete();

        console.log(`gs://${filename} deleted.`);
    }

    async makePublic(filename) {
    // Makes the file public
        await this.bucket.file(filename).makePublic();

        console.log(`gs://${filename} is now public.`);
    }

    PublicUrl(filename) {
        let s = `https://storage.googleapis.com/${this.bucket}/${filename}`;
        return s;
    }
}


