const { Text, Select } = require('@keystonejs/fields')
const { byTracking } = require('@keystonejs/list-plugins')
const { atTracking } = require('../../helpers/list-plugins')
const {
    admin,
    moderator,
    editor,
    allowRoles,
} = require('../../helpers/access/readr')
const cacheHint = require('../../helpers/cacheHint')

module.exports = {
    fields: {
        firebaseId: {
            label: 'firebaseId',
            type: Text,
            isRequired: true,
            isUnique: true,
        },
        email: {
            label: 'email',
            type: Text,
        },
        nickName: {
            label: '暱稱',
            type: Text,
        },
        state: {
            label: '狀態',
            type: Select,
            options: 'active, inactive',
            isRequired: true,
        },
    },
    plugins: [
        atTracking({
            hasNowBtn: false,
            isReadOnly: true,
        }),
        byTracking(),
    ],
    access: {
        read: allowRoles(admin, moderator, editor),
        update: allowRoles(admin),
        create: allowRoles(admin),
        delete: allowRoles(admin),
    },
    adminConfig: {
        defaultColumns: 'firebaseId, state, createdAt',
        defaultSort: '-createdAt',
    },
    cacheHint: cacheHint,
}
