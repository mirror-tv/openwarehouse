const { Field } = require('@keystonejs/fields');

class GCSFile extends File.implementation {
  constructor(path, { starCount = 5 }) {
    super(...arguments);
    this.starCount = starCount;
  }

  extendAdminMeta(meta) {
    return { ...meta, starCount: this.starCount };
  }
}

module.exports = {
  Stars,
  KnexIntegerInterface: Integer.adapters.knex,
};