// https://knexjs.org/#Schema-table

exports.up = function (knex) {
    console.log('UP')
    return knex.schema.table('Tag', (table) => {
        table.string('test')
    })
}

exports.down = function (knex) {
    console.log('DOWN')
    return knex.schema.table('Tag', (table) => {
        table.dropColumn('test')
    })
}
