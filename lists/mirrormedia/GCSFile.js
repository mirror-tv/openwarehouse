const { Text, Integer } = require('@keystonejs/fields');
const { atTracking, byTracking } = require('@keystonejs/list-plugins');
const { admin, moderator, editor, allowRoles } = require('../../helpers/mirrormediaAccess');

module.exports = {
    fields: {
        fileName: { type: Text },
        fileType: { type: Integer },
        gcsBucket: { type: Text },
        gcsDir: { type: Text },
        size: { type: Integer },
        url: { type: Text },
        height: { type: Integer },
        width: { type: Integer },
        iptc: { type: Text },
        urlDesktopSized: { type: Text },
        urlMobileSized: { type: Text },
        urlTabletSized: { type: Text },
        urlTinySized: { type: Text },
    },
    plugins: [
        atTracking(),
        byTracking(),
    ],
    access: {
        update: allowRoles(admin, moderator, editor),
        create: allowRoles(admin, moderator, editor),
        delete: allowRoles(admin),
    },
    adminConfig: {
        defaultColumns: 'fileName, fileType, gcsDir, url, createdAt',
        defaultSort: '-createdAt',
    },
}
