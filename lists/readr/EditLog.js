const { Text, DateTime } = require('@keystonejs/fields')
const { byTracking } = require('@keystonejs/list-plugins')
const { atTracking } = require('../../helpers/list-plugins')
const {
    admin,
    contributor,
    editor,
    moderator,
    allowRoles,
} = require('../../helpers/access/mirror-tv')
const HTML = require('../../fields/HTML')

const { formatChangedList } = require('../../utils/formatChangedList')

module.exports = {
    fields: {
        name: {
            label: '編輯者',
            type: Text,
            isRequired: true,
            adminConfig: {
                isReadOnly: true,
            },
        },
        operation: {
            label: '動作',
            type: Text,
            adminConfig: {
                isReadOnly: true,
            },
        },
        postSlug: {
            label: '文章Slug',
            type: Text,
            adminConfig: {
                isReadOnly: true,
            },
        },
        changedList: {
            label: '欄位更動內容',
            type: Text,
            isMultiline: true,
            adminConfig: {
                isReadOnly: true,
            },
            hooks: {
                resolveInput: async ({
                    operation,
                    existingItem,
                    originalInput,
                    resolvedData,
                    context,
                    listKey,
                    fieldPath, // Field hooks only
                }) => {
                    const changedList =
                        resolvedData[fieldPath] || existingItem[fieldPath]
                    const formatedChangedList = formatChangedList(changedList)
                    return formatedChangedList
                },
            },
        },
        summary: {
            label: '已更動重點摘要',
            type: HTML,
            adminConfig: {
                isReadOnly: true,
            },
        },
        content: {
            label: '已更動內文',
            type: HTML,
            adminConfig: {
                isReadOnly: true,
            },
        },
        actionList: {
            label: '已更動內文',
            type: HTML,
            adminConfig: {
                isReadOnly: true,
            },
        },
        citation: {
            label: '已更動內文',
            type: HTML,
            adminConfig: {
                isReadOnly: true,
            },
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
        read: allowRoles(admin, moderator),
        update: allowRoles(admin),
        create: allowRoles(admin, contributor, editor, moderator),
        delete: allowRoles(admin),
    },

    adminConfig: {
        defaultColumns: 'name, operation, createdAt',
        defaultSort: '-createdAt',
    },
    labelField: 'name',
}
