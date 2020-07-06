const { Slug, Text, Url, Checkbox } = require('@keystonejs/fields');
const { atTracking, byTracking } = require('@keystonejs/list-plugins');
const { admin, moderator, allowRole } = require('../../helpers/access');

module.exports = {
    fields: {
        slug: {
            label: 'Slug',
            type: Slug,
            isRequired: true,
            isUnique: true,
        },
        display: {
            label: '中文名稱',
            type: Text,
            isRequired: true
        },
        website: {
            label: 'Website',
            tybel: '網址',
            type: Url
        },
        isPublic: {
            label: '公開',
            type: Checkbox
        },
    },
    plugins: [
        atTracking(),
        byTracking(),
    ],
    access: {
        update: allowRole(admin, moderator),
        create: allowRole(admin, moderator),
        delete: allowRole(admin),
    },
    adminConfig: {
        defaultColumns: 'slug, display, website, isPublic, createdAt',
        defaultSort: '-createdAt',
    },
    labelField: 'display',
}