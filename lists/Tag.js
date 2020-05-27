const { Text, Checkbox, Select, Relationship } = require('@keystonejs/fields');
const { atTracking, byTracking } = require('@keystonejs/list-plugins');

module.exports = {
    fields: {
        name: {
            label: '標籤名稱',
            type: Text,
            isRequired: true,
            isUnique: true
        },
        //brief: { label: '前言', type: Types.Html, wysiwyg: true, height: 150 },
        sections: {
            label: '分區',
            type: Relationship,
            ref: 'Section',
            many: true
        },
        style: {
            type: Select,
            options: 'feature, listing, tile, full',
            defaultValue: 'feature'
        },
        leading: {
            label: '標頭樣式',
            type: Select,
            options: 'video, slideshow, image'
        },
        //heroVideo: { label: 'Leading Video', type: Types.Relationship, ref: 'Video', dependsOn: { leading: 'video' } },
        //heroImage: { label: '首圖', type: Types.ImageRelationship, ref: 'Image', dependsOn: { leading: 'image' } },
        //heroImageSize: { label: '首圖尺寸', type: Types.Select, options: 'extend, normal, small', default: 'normal', dependsOn: { heroImage: { '$regex': '.+/i' } } },
        og_title: {
            label: 'FB分享標題',
            type: Text
        },
        og_description: {
            label: 'FB分享說明',
            type: Text
        },
        //og_image: { label: 'FB分享縮圖', type: Types.ImageRelationship, ref: 'Image' },
        isAudioSiteOnly: {
            label: '僅用於語音網站',
            type: Checkbox
        },
        isFeatured: {
            label: '置頂',
            type: Checkbox
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
    },
    plugins: [
        atTracking(),
        byTracking(),
    ]
}