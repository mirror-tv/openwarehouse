const {Storage} = require('@google-cloud/storage');
const storage = new Storage();
const bucket = storage.bucket('mirrormedia-files')

const process.env.GOOGLE_APPLICATION_CREDENTIALS = 'configs/gcskeyfile.json'
// GOOGLE_APPLICATION_CREDENTIALS
///Users/mac/mirror/configs/gcskeyfile.json
// export NODE_ENV=development && node index.js

async function uploadFile() {
    // Uploads a local file to the bucket
    await storage.bucket(bucketName).upload(filename, {
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

    console.log(`${filename} uploaded to ${bucketName}.`);
  }

async function makePublic() {
// Makes the file public
await storage.bucket(bucketName).file(filename).makePublic();

console.log(`gs://${bucketName}/${filename} is now public.`);
}