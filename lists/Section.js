const { Text, Checkbox, Select, Relationship } = require('@keystonejs/fields');
const { atTracking, byTracking } = require('@keystonejs/list-plugins');

module.exports = {
    fields: {
        name: {
            label: '名稱',
            type: Text,
            isRequired: true
        },
        title: {
            label: '中文名稱',
            type: Text,
            isRequired: true
        },
        //image: { label: 'Logo', type: Types.ImageRelationship, ref: 'Image' },
        description: {
            label: '簡介',
            type: Text
        },
        categories: {
            label: '分類',
            type: Relationship,
            ref: 'PostCategory',
            many: true
        },
        extend_cats: {
            label: '其他分類',
            type: Relationship,
            ref: 'PostCategory',
            many: true
        },
        //heroImage: { label: '首圖', type: Types.ImageRelationship, ref: 'Image' },
        style: {
            type: Select,
            options: 'feature, listing, tile, full, video, light',
            defaultValue: 'feature'
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
        timeline: {
            label: 'Twitter 帳號',
            type: Text
        },
        topics: {
            label: '專題',
            type: Relationship,
            ref: 'Topic',
            many: true
        },
        css: {
            label: 'CSS',
            type: Text,
            isMultiline: true
        },
        javascript: {
            label: 'JavaScript',
            type: Text,
            isMultiline: true
        },
        isAudioSiteOnly: {
            label: '僅用於語音網站',
            type: Checkbox,
            defaultValue: false
        },
        isFeatured: {
            label: '置頂',
            type: Checkbox,
            defaultValue: false
        },
    },
    plugins: [
        atTracking(),
        byTracking(),
    ],
}