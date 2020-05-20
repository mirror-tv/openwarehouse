const { Keystone } = require('@keystonejs/keystone');
const { CloudStorageAdapter } = require('keystone-storage-adapter-cloud-storage');
// const { CloudinaryImage } = require('@keystonejs/fields');

const keystone = new Keystone({...});

var storage = new keystone.Storage({
    adapter: CloudStorageAdapter ,
    cloudStorage: {
      keyFilename: process.env.CLOUD_STORAGE_KEY_FILENAME,
      path: 'tests/',
      bucket: 'covela-bucket',
      uploadOptions: {
        public: true
      }
    },
    schema: {
      bucket: true, // optional; store the bucket the file was uploaded to in your db
      etag: true, // optional; store the etag for the resource
      path: true, // optional; store the path of the file in your db
      url: true, // optional; generate & store a public URL
    },
  });

keystone.createList('Image', {
  fields: {
    image: { type: CloudinaryImage, adapter },
  },
});
