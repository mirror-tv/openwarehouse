const { GCSFile, KnexIntegerInterface } = require('./Implementation');

// We're going to extend the integer field to store
// a number between 1-5 and represent this as a rating
const { File } = require('@keystonejs/fields');

module.exports = {
    type: 'GCSFile',
    implementation: GCSFile,
    views: {
        Controller: File.views.Controller,
        Field: require.resolve('./views/Field'),
        Filter: File.views.Filter,
        Cell: require.resolve('./views/Cell'),
    },
    adapters: {
        // mongoose: MongoIntegerInterface,
        knex: KnexIntegerInterface,
    },
};