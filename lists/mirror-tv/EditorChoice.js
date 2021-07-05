const { Integer, Select, Relationship } = require('@keystonejs/fields')
const { atTracking, byTracking } = require('@keystonejs/list-plugins')
const {
    admin,
    allowRoles,
    bot,
    contributor,
    editor,
    moderator,
    owner,
} = require('../../helpers/access/mirror-tv')
const cacheHint = require('../../helpers/cacheHint')
const { blockFieldToAnonymous } = require('../../helpers/blockFieldToAnonymous')

module.exports = {
    fields: {
        sortOrder: {
            label: '排序順位',
            type: Integer,
            isUnique: true,
        },
        choice: {
            label: '精選文章',
            type: Relationship,
            ref: 'Post',
        },
        state: {
            label: '狀態',
            type: Select,
            options: 'draft, published, scheduled, archived, invisible',
            defaultValue: 'draft',
        },
    },
    plugins: [atTracking(), byTracking()],
    access: {
        read: blockFieldToAnonymous({
            gateFieldName: 'state',
            fieldPassValue: ['published', 'invisible'],
        }),
        update: allowRoles(admin, bot, moderator),
        create: allowRoles(admin, moderator),
        delete: allowRoles(admin),
    },
    hooks: {},
    adminConfig: {
        defaultColumns: 'choice, state, createdAt',
        defaultSort: '-createdAt',
    },
    cacheHint: cacheHint,
}
