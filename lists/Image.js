const { Text, Select, Relationship, File, Url } = require('@keystonejs/fields');
const { atTracking, byTracking } = require('@keystonejs/list-plugins');
const { ImageAdapter } = require('../lib/ImageAdapter');
const access = require('../helpers/access');
const gcsDir = 'assets/images/'

module.exports = {
    fields: {
        title: {
            label : '標題',
            type: Text,
            isRequired: true
        },
        file: {
            type: File,
            adapter: new ImageAdapter(gcsDir),
            isRequired: true,
        },
        copyright: {
            label: '版權',
            type: Select,
            dataType: 'string',
            options: 'Creative-Commons, Copyrighted',
            defaultValue: 'Copyrighted'
        },
        topic: {
            label: '專題',
            type: Relationship,
            ref: 'Topic'
        },
        tags: {
            label: '標籤',
            type: Relationship,
            ref: 'Tag',
            many: true
        },
        keywords: {
            label: '關鍵字',
            type: Text
        },
        urlOriginal: { type: Url, access: { read: false, create: true } },
        urlDesktopSized: { type: Url, access: { read: false, create: true } },
        urlMobileSized: { type: Url, access: { read: false, create: true } },
        urlTabletSized: { type: Url, access: { read: false, create: true } },
        urlTinySized: { type: Url, access: { read: false, create: true } },
    },
    plugins: [
        atTracking(),
        byTracking(),
    ],
    access: {
        update: access.userIsAboveAuthorOrOwner,
        create: access.userIsNotContributor,
        delete: access.userIsAboveAuthorOrOwner,
    },
    adminConfig: {
        defaultColumns: 'title, image, createdAt',
        defaultSort: '-createdAt',
    },
    hooks: {
        // Hooks for create and update operations
        resolveInput: ({ operation, existingItem, resolvedData, originalInput }) => {
            if (resolvedData.file) {
                resolvedData.urlOriginal = resolvedData.file._meta.url.urlOriginal
                resolvedData.urlDesktopSized = resolvedData.file._meta.url.urlDesktopSized
                resolvedData.urlMobileSized = resolvedData.file._meta.url.urlMobileSized
                resolvedData.urlTabletSized = resolvedData.file._meta.url.urlTabletSized
                resolvedData.urlTinySized = resolvedData.file._meta.url.urlTinySized
            }

            console.log("resolveInput RESOLVED DATA", resolvedData)
            return resolvedData
        },
    },
    labelField: 'title',
}
