const { Text } = require('@keystonejs/fields');
const Stars = require('../fields/Stars');

module.exports = {
    fields: {
        name: { type: Text },
        rating: { type: Stars, starCount: 5 }
    },
}