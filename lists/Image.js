const { File, Text, DateTime, Checkbox, Integer } = require('@keystonejs/fields');
const GCSFile = require('../fields/GCSFile');
// const resizeImage =

module.exports = {
    fields: {
        id:{type:Text},
        V: {type:Integer},
        copyright:{type:Text},
        createTime:{type:DateTime},
        description:{type:Text},
        image:{type:GCSFile},
        keywords:{type:Text},
        sale:{type:Checkbox},
        // tags:{type:},
        topics:{type: Text},


    }

}
