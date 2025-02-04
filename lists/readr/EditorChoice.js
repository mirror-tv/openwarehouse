const {
    Integer,
    Text,
    Select,
    Relationship,
    Url,
} = require('@keystonejs/fields')
const CustomRelationship = require('../../fields/CustomRelationship')
const { byTracking } = require('@keystonejs/list-plugins')
const { atTracking } = require('../../helpers/list-plugins')
const {
    admin,
    moderator,
    editor,
    allowRoles,
} = require('../../helpers/access/readr')
const cacheHint = require('../../helpers/cacheHint')
const NewDateTime = require('../../fields/NewDateTime/index.js')

const {
    validateIfPostIsPublished,
} = require('../../utils/validateIfPostIsPublished')

module.exports = {
    fields: {
        sortOrder: {
            label: '排序順位',
            type: Integer,
            isUnique: true,
        },
        name: {
            label: '標題',
            type: Text,
            isRequired: true,
        },
        choice: {
            label: '精選文章',
            type: CustomRelationship,
            ref: 'Post',
        },
        link: {
            label: '連結',
            type: Url,
        },
        state: {
            label: '狀態',
            type: Select,
            options: 'draft, published, scheduled, archived, invisible',
            defaultValue: 'draft',
        },
        description: {
            label: '描述',
            type: Text,
        },
        heroImage: {
            label: '首圖',
            type: Relationship,
            ref: 'Image',
        },
        publishTime: {
            label: '發佈時間',
            type: NewDateTime,
            hasNowBtn: true,
            isReadOnly: false,
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
        update: allowRoles(admin, moderator, editor),
        create: allowRoles(admin, moderator, editor),
        delete: allowRoles(admin),
    },
    hooks: {
        validateInput: async ({
            existingItem,
            resolvedData,
            addValidationError,
        }) => {
            // await validateIfPostIsPublished(
            //     resolvedData,
            //     existingItem,
            //     addValidationError
            // )
        },
    },
    adminConfig: {
        defaultColumns: 'choice, state, createdAt',
        defaultSort: '-createdAt',
    },
    cacheHint: cacheHint,
}
