// import KnexFileInterface from "@keystonejs/fields";
const { GCSFile } = require('./Implementation');
// import { importView } from '@keystonejs/build-field-types';
const { File } = require('@keystonejs/fields');
// const KnexFileInterface = require('@keystonejs/fields/src/types/File/Implementation')
module.exports = {
    type: 'GCSFile',
    implementation: GCSFile,
    views: {
        // Controller: importView('../../../node_modules/@keystonejs/fields/src/types/File/views/Controller.js'),
        // Field: importView('../../../node_modules/@keystonejs/fields/src/types/File/views/Field.js'),
        // Cell: importView('../../../node_modules/@keystonejs/fields/src/types/File/views/Cell.js'),
        Controller: File.views.Controller,
        Field: File.views.Field,
        Cell:File.views.Cell,

    },
    adapters: {
        // mongoose: MongoIntegerInterface,
        knex: KnexAdapter,
    },
};
