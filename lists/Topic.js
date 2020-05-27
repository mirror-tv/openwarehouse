const { Text, Checkbox, Select, Relationship } = require('@keystonejs/fields');
const { atTracking, byTracking } = require('@keystonejs/list-plugins');

module.exports = {
    fields: {
        name: {
            label: '專題名稱',
            type: Text,
            isRequired: true
        },
        subtitle: {
            label: '副標',
            type: Text
        },
        state: {
            label: '狀態', type: Select,
            options: 'draft, published',
            defaultValue: 'draft'
        },
        //brief: { label: '前言', type: Types.Html, wysiwyg: true, height: 150 },
        //heroImage: { label: '專題主圖', type: Types.ImageRelationship, ref: 'Image' },
        leading: {
            label: '標頭樣式',
            type: Select,
            options: 'video, slideshow, image'
        },
        sections: {
            label: '分區',
            type: Relationship,
            ref: 'Section',
            many: true
        },
        //heroVideo: { label: 'Leading Video', type: Types.Relationship, ref: 'Video', dependsOn: { leading: 'video' } },
        //heroImage: { label: '首圖', type: Types.ImageRelationship, ref: 'Image', dependsOn: { leading: 'image' } },
        //heroImageSize: { label: '首圖尺寸', type: Select, options: 'extend, normal, small', default: 'normal', dependsOn: { heroImage: { '$regex': '.+/i' } } },
        og_title: {
            label: 'FB分享標題',
            type: Text
        },
        og_description: {
            label: 'FB分享說明',
            type: Text
        },
        //og_image: { label: 'FB分享縮圖', type: Types.ImageRelationship, ref: 'Image' },
        title_style: {
            label: '專題樣式',
            type: Select,
            options: 'feature, wide',
            defaultValue: 'feature'
        },
        type: {
            label: '型態',
            type: Select,
            dataType: 'string',
            options: 'list, timeline, group, portrait wall, wide',
            defaultValue: 'list'
        },
        source: {
            label: '資料來源',
            type: Select,
            options: 'posts, activities',
            dependsOn: {
                type: 'timeline'
            }
        },
        sort: {
            label: '時間軸排序',
            type: Select,
            options: 'asc, desc',
            dependsOn: {
                type: 'timeline'
            }
        },
        tags: {
            label: '標籤',
            type: Relationship,
            ref: 'Tag',
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
        dfp: {
            label: 'DFP code',
            type: Text
        },
        mobile_dfp: {
            label: 'Mobile DFP code',
            type: Text
        },
        isFeatured: {
            label: '置頂',
            type: Checkbox,
            defaultValue: false
        }
    },
    plugins: [
        atTracking(),
        byTracking(),
    ]
}