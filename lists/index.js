module.exports.createLists = function (keystone) {
    const UserSchema = require('./User');
    const MovieSchema = require('./Movie');
    keystone.createList('User', UserSchema);
    keystone.createList('Movie', MovieSchema);
};