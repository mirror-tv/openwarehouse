const { Text } = require('@keystonejs/fields');
const { importView } = require('@keystonejs/build-field-types');
const { Implementation, MongoIntegerInterface, KnexIntegerInterface } = require('./Implementation');


module.exports = {
    type: 'HTML',
    implementation: Implementation,
    views: {
        Controller: Text.views.Controller,
        Field: importView('./views/Field'),
        Filter: Text.views.Filter,
    },
    adapters: {
        mongoose: MongoIntegerInterface,
        knex: KnexIntegerInterface,
    },
};
