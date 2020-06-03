const { Text, Url, Relationship } = require('@keystonejs/fields');
const { atTracking, byTracking } = require('@keystonejs/list-plugins');

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
        }
    },
    plugins: [
        atTracking(),
        byTracking(),
    ],
    adminConfig: {
        defaultColumns: 'name, website, github, twitter'
    },
}