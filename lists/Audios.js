const { Text, DateTime, Integer, Relationship } = require('@keystonejs/fields');

module.exports = {
    fields: {
        id:{type:Text},
        V: {type:Integer},
        coverPhoto:{type:Text},
        createTime:{type:DateTime},
        description:{type:Text},
        audio:{type:Relationship, ref:'GCSFile.id'}, // 這行會出問題
        // tags:{type:}, //list?
        title:{type:Text},
    }
}
