const { Text, Relationship, File } = require('@keystonejs/fields');
const { atTracking, byTracking } = require('@keystonejs/list-plugins');
const { GCSAdapter } = require('../lib/GCSAdapter');
const access = require('../helpers/access');

module.exports = {
    fields: {
        file: {
            type: File,
            adapter: GCSAdapter,
            isRequired: true,
        },
        title: {
            label: '標題',
            type: Text,
            isRequired: true
        },
        /*audio: {
            type: Types.GcsFile,
            initial: true,
            autoCleanup: true,
            datePrefix: 'YYYYMMDDHHmmss',
            bucket: bucket,
            destination: 'assets/audios/',
            publicRead: true,
        },*/
        coverPhoto: {
            label: '封面照片',
            type: Relationship,
            ref: 'Image'
        },
        tags: {
            label: '標籤',
            type: Relationship,
            ref: 'Tag',
            many: true
        },
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
        defaultColumns: 'title, audio, tags, createdAt',
        defaultSort: '-createdAt',
    },
    plural: 'Audios',
    labelField: 'title'
}
