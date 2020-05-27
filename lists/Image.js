const { Text, Checkbox, Select, Relationship } = require('@keystonejs/fields');
const { DateTimeUtc } = require('@keystonejs/fields-datetime-utc');
const { atTracking, byTracking } = require('@keystonejs/list-plugins');
//const { File } = require('@keystonejs/fields');
//const GCSFile = require('../fields/GCSFile');

module.exports = {
    fields: {
        /*

        type: GCSFile,
        initial: true,
        autoCleanup: true,
        datePrefix: 'YYYYMMDDHHmmss',
        // TODO move these settings to config
        bucket: bucket,
        destination: 'assets/images/',
        publicRead: true,
        resize: resizeImage,
        resizeOpts: [{
            target: 'desktop',
            width: 2000,
            height: null,
            options: {
                watermark: '/public/images/20171025EA-0142.png',
                watermarkBase: 2000
            }
        }, {
            target: 'tablet',
            width: 1200,
            height: null,
            options: {
                watermark: '/public/images/20171025EA-0142.png',
                watermarkBase: 2000
            }
        }, {
            target: 'mobile',
            width: 800,
            height: null,
            options: {
                watermark: '/public/images/20171025EA-0142.png',
                watermarkBase: 2000
            }
        }, {
            target: 'square',
            width: 1400,
            height: 1400,
            options: {
                watermark: '/public/images/20171025EA-0142.png',
                watermarkBase: 2000
            }
        }, {
            target: 'tiny',
            width: 150,
            height: null,
            options: {
                watermark: '/public/images/20171025EA-0142.png',
                watermarkBase: 2000
            }
        }],
        extractIPTC: extractIPTC
        */
        /*image: {
            type: Types.GcsImage,
            initial: true,
            autoCleanup: true,
            datePrefix: 'YYYYMMDDHHmmss',
            // TODO move these settings to config
            bucket: bucket,
            destination: 'assets/images/',
            publicRead: true,
            resize: resizeImage,
            resizeOpts: [{
                target: 'desktop',
                width: 2000,
                height: null,
                options: {
                    watermark: '/public/images/20171025EA-0142.png',
                    watermarkBase: 2000
                }
            }, {
                target: 'tablet',
                width: 1200,
                height: null,
                options: {
                    watermark: '/public/images/20171025EA-0142.png',
                    watermarkBase: 2000
                }
            }, {
                target: 'mobile',
                width: 800,
                height: null,
                options: {
                    watermark: '/public/images/20171025EA-0142.png',
                    watermarkBase: 2000
                }
            }, {
                target: 'square',
                width: 1400,
                height: 1400,
                options: {
                    watermark: '/public/images/20171025EA-0142.png',
                    watermarkBase: 2000
                }
            }, {
                target: 'tiny',
                width: 150,
                height: null,
                options: {
                    watermark: '/public/images/20171025EA-0142.png',
                    watermarkBase: 2000
                }
            }],
            extractIPTC: extractIPTC
        },*/
        description: {
            type: Text
        },
        copyright: {
            type: Select,
            dataType: 'string',
            options: 'Creative-Commons, Copyrighted',
            defaultValue: 'Copyrighted'
        },
        topics: {
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
            type: Text,
        },
        createTime: {
            type: DateTimeUtc,
            defaultValue: new Date()
        },
        sale: {
            type: Checkbox
        },
    },
    plugins: [
        atTracking(),
        byTracking(),
    ],
    adminConfig: {
        defaultColumns: 'description',//, image',
        defaultSort: '-createTime',
    },
}