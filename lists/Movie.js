const { Text } = require('@keystonejs/fields');
const { Wysiwyg } = require('@keystonejs/fields-wysiwyg-tinymce');
//const MultiCheck = require('../Fields/MultiCheck');
const HTML = require('../Fields/HTML');

module.exports = {
    fields: {
        name: { type: Text },
        html: {
            type: HTML
        },
    },
}
