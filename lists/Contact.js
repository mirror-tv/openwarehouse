const { Text, Url } = require('@keystonejs/fields');
const { Markdown } = require('@keystonejs/fields-markdown');
const { atTracking, byTracking } = require('@keystonejs/list-plugins');

module.exports = {
    fields: {
        name: {
            label: '作者姓名',
            type: Text,
            isRequired: true
        },
        //email: { type: Types.Email, initial: true, index: true },
        //image: { label: '照片', type: Types.ImageRelationship, ref: 'Image' },
        homepage: {
            label: '個人首頁',
            type: Url
        },
        facebook: {
            label: 'Facebook',
            type: Url
        },
        twitter: {
            label: 'Twitter',
            type: Url
        },
        instatgram: {
            label: 'Instatgram',
            type: Url
        },
        address: {
            label: 'address',
            type: Text
        },
        bio: {
            label: '簡介',
            type: Markdown,
            collapse: true
        },
    },
    plugins: [
        atTracking(),
        byTracking(),
    ],
    adminConfig: {
        defaultColumns: 'name, email, homepage'
    },
}