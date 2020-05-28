const { Text, DateTime,  Integer, Relationship } = require('@keystonejs/fields');

module.exports = {
    fields: {
        id:{type:Text},
        V: {type:Integer},
        createTime:{type:DateTime},
        description:{type:Text},
        // tags:{type:}, //
        title:{type:Text},
        video:{type:Relationship, ref:'GCSFile.id'}, // 這行會出問題
    }
}
