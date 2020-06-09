const { Text } = require('@keystonejs/fields');
const HTML = require('../Fields/HTML');

module.exports = {
    fields: {
        name: { type: Text },
        brief: {
            type: HTML,
        },
    },
}
