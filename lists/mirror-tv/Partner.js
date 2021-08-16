const { Slug, Text, Url, Checkbox } = require('@keystonejs/fields')
const { byTracking } = require('@keystonejs/list-plugins')
const { atTracking } = require('../../helpers/list-plugins')
const {
    admin,
    moderator,
    editor,
    bot,
    allowRoles,
} = require('../../helpers/access/mirror-tv')
const cacheHint = require('../../helpers/cacheHint')

module.exports = {
    fields: {
        slug: {
            label: 'Slug',
            type: Slug,
            isRequired: true,
            isUnique: true,
        },
        name: {
            label: '中文名稱',
            type: Text,
            isRequired: true,
        },
        website: {
            label: 'Website',
            tybel: '網址',
            type: Url,
        },
        isPublic: {
            label: '公開',
            type: Checkbox,
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
        update: allowRoles(admin, moderator, editor, bot),
        create: allowRoles(admin, moderator, editor),
        delete: allowRoles(admin, moderator),
    },
    hooks: {},
    adminConfig: {
        defaultColumns: 'slug, display, website, isPublic, createdAt',
        defaultSort: '-createdAt',
    },
    labelField: 'name',
    cacheHint: cacheHint,
}
