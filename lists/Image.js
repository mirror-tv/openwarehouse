const { File, Text, DateTime, Checkbox, Integer, Relationship } = require('@keystonejs/fields');
// const GCSFile = require('../fields/GCSFile');
// const resizeImage =

module.exports = {
    fields: {
        id:{type:Text},
        V: {type:Integer},
        copyright:{type:Text},
        createTime:{type:DateTime},
        description:{type:Text},
        image:{type:Relationship, ref:'GCSFile.id'}, // 這行會出問題
        keywords:{type:Text},
        sale:{type:Checkbox},
        // tags:{type:}, //list?
        topics:{type: Text},
    }
}
