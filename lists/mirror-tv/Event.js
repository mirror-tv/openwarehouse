const {
    Slug,
    Text,
    Select,
    Relationship,
    Url,
    Checkbox,
} = require('@keystonejs/fields')
const { atTracking, byTracking } = require('@keystonejs/list-plugins')
const access = require('../../helpers/access')
const NewDateTime = require('../../fields/NewDateTime/index.js')

module.exports = {
    fields: {
        name: {
            label: '名稱',
            type: Text,
            isRequired: true,
        },
        state: {
            label: '狀態',
            type: Select,
            options: 'draft, scheduled, published',
            defaultValue: 'draft',
        },
        publishTime: {
            label: '發佈時間',
            type: NewDateTime,
        },
        categories: {
            label: '分類',
            type: Relationship,
            ref: 'Category',
            many: true,
        },
        eventType: {
            label: '活動類型',
            type: Select,
            options: 'embedded, video, image, logo, mod',
        },
        startTime: {
            label: '開始時間',
            type: NewDateTime,
        },
        endTime: {
            label: '結束時間',
            type: NewDateTime,
        },
        video: {
            label: '影片',
            type: Relationship,
            ref: 'Video',
            /*dependsOn: {
                'eventType': 'video'
            }*/
        },
        image: {
            label: '圖片',
            type: Relationship,
            ref: 'Image',
            /*dependsOn: {
                '$or': [
                    { 'eventType': 'image' },
                    { 'eventType': 'logo' }
                ]
            }*/
        },
        embedCode: {
            label: 'Embed Code',
            type: Text,
            isMultiline: true,
            /*dependsOn: {
                '$or': [
                    { 'eventType': 'embedded' },
                    { 'eventType': 'mod' }
                ]
            }*/
        },
        link: {
            label: '連結',
            type: Url,
            /*dependsOn: {
                'eventType': 'logo'
            }*/
        },
        isFeatured: {
            label: '置頂',
            type: Checkbox,
        },
    },
    plugins: [atTracking(), byTracking()],
    access: {
        update: access.userIsAdminOrModeratorOrOwner,
        create: access.userIsAboveAuthor,
        delete: access.userIsAdminOrModeratorOrOwner,
    },
    adminConfig: {
        defaultColumns: 'name, eventType, state, startTime, endTime',
        defaultSort: '-startTime',
    },
}
