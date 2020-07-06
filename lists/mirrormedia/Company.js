const { Text, Url, Relationship } = require('@keystonejs/fields');
const { atTracking, byTracking } = require('@keystonejs/list-plugins');
const { admin, moderator, editor, allowRole } = require('../../helpers/access');

module.exports = {
    fields: {
        name: {
            label: '公司',
            type: Text,
            isRequired: true
        },
        website: {
            label: 'Ｗebsite',
            type: Url
        },
        github: {
            label: 'GitHub',
            type: Text
        },
        twitter: {
            label: 'Twitter',
            type: Text
        },
        users: {
            label: '員工',
            type: Relationship,
            ref: 'User.company',
            many: true
        },
    },
    plugins: [
        atTracking(),
        byTracking(),
    ],
    access: {
        read: allowRole(admin, moderator, editor),
        update: allowRole(admin, moderator),
        create: allowRole(admin, moderator),
        delete: allowRole(admin),
        auth: true,
    },
    adminConfig: {
        defaultColumns: 'name, website, github, twitter, createdAt',
        defaultSort: '-createdAt'
    },
}