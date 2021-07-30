const { Relationship } = require('@keystonejs/fields')

class CustomRelationShipImplementation extends Relationship.implementation {
    constructor(path, { editorConfig }) {
        super(...arguments)
    }
}

module.exports = {
    Implementation: CustomRelationShipImplementation,
    MongoRelationshipInterface: Relationship.adapters.mongoose,
    KnexRelationshipInterface: Relationship.adapters.knex,
    PrismaRelationshipInterface: Relationship.adapters.prisma,
}
