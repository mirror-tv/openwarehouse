const { Text, Checkbox, Select, Relationship } = require('@keystonejs/fields');
const { DateTimeUtc } = require('@keystonejs/fields-datetime-utc');
const { atTracking, byTracking } = require('@keystonejs/list-plugins');

module.exports = {
    fields: {
        name: {
            label: '網址名稱（英文）',
            type: Text,
            isRequired: true,
            isUnique: true
        },
        title: {
            label: '標題',
            type: Text,
            isRequired: true,
            defaultValue: 'untitled'
        },
        subtitle: {
            label: '副標',
            type: Text,
            isRequired: false
        },
        state: {
            label: '狀態',
            type: Select,
            options: 'draft, published, scheduled, archived, invisible',
            defaultValue: 'draft'
        },
        publishedDate: {
            label: '發佈日期',
            type: DateTimeUtc,
            defaultValue: new Date(),
            dependsOn: {
                '$or': {
                    state: [
                        'published',
                        'scheduled'
                    ]
                }
            }
        },
        sections: {
            label: '分區',
            type: Relationship,
            ref: 'Section',
            many: true
        },
        categories: {
            label: '分類',
            type: Relationship,
            ref: 'PostCategory',
            many: true
        },
        writers: {
            label: '作者',
            type: Relationship,
            ref: 'Contact',
            many: true
        },
        photographers: {
            label: '攝影',
            type: Relationship,
            ref: 'Contact',
            many: true
        },
        camera_man: {
            label: '影音',
            type: Relationship,
            ref: 'Contact',
            many: true
        },
        designers: {
            label: '設計',
            type: Relationship,
            ref: 'Contact',
            many: true
        },
        engineers: {
            label: '工程',
            type: Relationship,
            ref: 'Contact',
            many: true
        },
        vocals: {
            label: '主播',
            type: Relationship,
            ref: 'Contact',
            many: true
        },
        extend_byline: {
            label: '作者（其他）',
            type: Text
        },
        heroVideo: {
            label: 'Leading Video',
            type: Relationship,
            ref: 'Video'
        },
        //heroImage: { label: '首圖', type: Types.ImageRelationship, ref: 'Image' },
        heroCaption: {
            label: '首圖圖說',
            type: Text
        },
        //heroImageSize: { label: '首圖尺寸', type: Types.Select, options: 'extend, normal, small', default: 'normal', dependsOn: { heroImage: { '$regex': '.+/i' } } },
        style: {
            label: '文章樣式',
            type: Select,
            options: 'article, wide, projects, photography, script, campaign, readr',
            defaultValue: 'article'
        },
        //brief: { label: '前言', type: Types.Html, wysiwyg: true, height: 150 },
        //content: { label: '內文', type: Types.Html, wysiwyg: true, height: 400 },
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
        //albums: { label: '專輯', type: Types.Relationship, ref: 'Album', many: true },
        //audio: { label: '語音素材', type: Types.Relationship, ref: 'Audio' },
        relateds: {
            label: '相關文章',
            type: Relationship,
            ref: 'Post',
            many: true
        },
        og_title: {
            label: 'FB分享標題',
            type: Text
        },
        og_description: {
            label: 'FB分享說明',
            type: Text
        },
        //og_image: { label: 'FB分享縮圖', type: Types.ImageRelationship, ref: 'Image' },
        device: {
            label: '裝置',
            type: Select,
            options: 'all, web, app',
            defaultValue: 'all'
        },
        adTrace: {
            label: '追蹤代碼',
            type: Text,
            isMultiline: true
        },
        createTime: {
            type: DateTimeUtc,
            defaultValue: new Date()
        },
        isFeatured: {
            label: '置頂',
            type: Checkbox
        },
        isAdvertised: {
            label: '廣告文案',
            type: Checkbox
        },
        hiddenAdvertised: {
            label: 'google廣告違規',
            type: Checkbox
        },
        isCampaign: {
            label: '活動',
            type: Checkbox
        },
        isAdult: {
            label: '18禁',
            type: Checkbox
        },
        lockJS: {
            label: '鎖定右鍵',
            type: Checkbox
        },
        isAudioSiteOnly: {
            label: '僅用於語音網站',
            type: Checkbox
        }
    },
    plugins: [
        atTracking(),
        byTracking(),
    ],
    adminConfig: {
        defaultColumns: 'title, name, state|20%, author|20%, categories|20%, publishedDate|20%',
        defaultSort: '-publishedDate',
    },
}