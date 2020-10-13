const { Text } = require('@keystonejs/fields')

class NewDateTime extends Text.implementation {
  constructor(path, { dateTime }) {
    super(...arguments)
    this.dateTime = dateTime
  }

  extendAdminMeta(meta) {
    return { ...meta, dateTime: this.dateTime }
  }
}

module.exports = {
  NewDateTime,
  // define how a queries and mutations
  // should be translated into SQL or MongoDB actions
  // (we're just going to going to re-export the adapters for the Integer field)
  MongoIntegerInterface: Text.adapters.mongoose,
  KnexIntegerInterface: Text.adapters.knex,
}
