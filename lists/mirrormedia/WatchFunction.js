const { Text } = require('@keystonejs/fields');
const { atTracking, byTracking } = require('@keystonejs/list-plugins');
const { admin, moderator, editor, allowRole } = require('../../helpers/access');

module.exports = {
    fields: {
        function: {
            type: Text,
            isRequired: true
        },
    },
    plugins: [
        atTracking(),
        byTracking(),
    ],
    access: {
        update: allowRole(admin, moderator, editor),
        create: allowRole(admin, moderator, editor),
        delete: allowRole(admin),
    },
    adminConfig: {
        defaultColumns: 'function, createdAt',
        defaultSort: '-createdAt',
    },
    labelField: 'function'
}