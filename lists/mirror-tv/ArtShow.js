const { Relationship, Slug, Text } = require('@keystonejs/fields')

const { byTracking } = require('@keystonejs/list-plugins')
const { atTracking } = require('../../helpers/list-plugins')

const {
    admin,
    moderator,
    editor,
    allowRoles,
} = require('../../helpers/access/mirror-tv')
const ImageRelationship = require('../../fields/ImageRelationship')
const HTML = require('../../fields/HTML')
const cacheHint = require('../../helpers/cacheHint')
const TextHide = require('../../fields/TextHide')
const { controlCharacterFilter } = require('../../utils/controlCharacterFilter')
const { parseResolvedData } = require('../../utils/parseResolvedData')

module.exports = {
    fields: {
        slug: {
            label: 'Slug',
            type: Slug,
            isRequired: true,
            isUnique: true,
        },
        name: {
            label: '單集名稱',
            type: Text,
            isRequired: true,
        },
        heroImage: {
            label: '首圖',
            // type: Relationship,
            type: ImageRelationship,
            ref: 'Image',
            // isRequired: true,
        },
        heroVideo: {
            label: '影片',
            type: Relationship,
            ref: 'Video',
            // isRequired: true,
        },
        content: {
            label: '內文',
            type: HTML,
            // type: Text,
        },
        author: {
            label: '導演',
            type: Relationship,
            ref: 'Contact',
        },
        series: {
            label: '相關單元',
            type: Relationship,
            ref: 'Serie.post',
            many: true,
        },
        contentApiData: {
            label: 'Content API Data',
            type: TextHide,
            adminConfig: {
                isReadOnly: true,
            },
        },
        contentHtml: {
            label: 'Content HTML',
            type: TextHide,
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
        update: allowRoles(admin, moderator, editor),
        create: allowRoles(admin, moderator, editor),
        delete: allowRoles(admin, moderator),
    },
    hooks: {
        resolveInput: async ({ existingItem, originalInput, resolvedData }) => {
            await controlCharacterFilter(
                originalInput,
                existingItem,
                resolvedData
            )

            await parseResolvedData(existingItem, resolvedData, ['content'])

            return resolvedData
        },
        beforeChange: async ({ existingItem, resolvedData }) => {},
    },
    adminConfig: {
        // defaultColumns: 'schedule, time, updatedAt',
        // defaultSort: '-updatedAt',
    },
    labelField: 'name',
    cacheHint: cacheHint,
}
