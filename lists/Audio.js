const { Text, Relationship } = require('@keystonejs/fields');
const { atTracking, byTracking } = require('@keystonejs/list-plugins');
const access = require('../helpers/access');

module.exports = {
    fields: {
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
        }
    },
    plugins: [
        atTracking(),
        byTracking(),
    ],
    access: {
        update: access.userIsAdminOrModeratorOrOwner,
        create: access.userIsNotContributor,
        delete: access.userIsAdminOrModeratorOrOwner,
    },
    adminConfig: {
        defaultColumns: 'title, audio, tags, createdAt',
        defaultSort: '-createdAt',
    },
    plural: 'Audios'
}