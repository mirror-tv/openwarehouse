const { Text, Url, Relationship } = require('@keystonejs/fields');
const { atTracking, byTracking } = require('@keystonejs/list-plugins');

module.exports = {
    fields: {
        name: {
            type: Text,
            isRequired: true
        },
        website: {
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