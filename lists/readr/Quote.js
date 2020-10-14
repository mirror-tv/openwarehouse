const { Integer, Text, Select, Relationship } = require('@keystonejs/fields')
const { atTracking, byTracking } = require('@keystonejs/list-plugins')
const { admin, moderator, allowRoles } = require('../../helpers/readrAccess')
const NewDateTime = require('../../fields/NewDateTime/index.js')

module.exports = {
    fields: {
        sortOrder: {
            label: '排序順位',
            type: Integer,
            isUnique: true,
        },
        title: {
            label: '標題',
            type: Text,
            isRequired: true,
        },
        writer: {
            label: '作者',
            type: Relationship,
            ref: 'Author',
        },
        byline: {
            label: '引自',
            type: Text,
        },
        state: {
            label: '狀態',
            type: Select,
            options: 'draft, published, scheduled, archived, invisible',
            defaultValue: 'draft',
        },
        publishedTime: {
            label: '發佈時間',
            type: NewDateTime,
        },
    },
    plugins: [atTracking(), byTracking()],
    access: {
        update: allowRoles(admin, moderator),
        create: allowRoles(admin, moderator),
        delete: allowRoles(admin),
    },
    adminConfig: {
        defaultColumns:
            'title, writer, byline, state, publishedTime, createdAt',
        defaultSort: '-createdAt',
    },
}
