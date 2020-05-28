const { File, Text, Integer } = require('@keystonejs/fields');
const GCSAdapter = require('../../lib/GCSAdapter')

const {KnexAdapter} = require('@keystonejs/adapter-knex')

class GCSFile extends File.implementation {
  constructor(path) {
    super(...arguments);
    this.keystone = keystone;
    this.fileAdapter = new GCSAdapter('configs/gcskeyfile.json');

  }

  // addToTableSchema(table){
  //   {filename: {type:Text},
  //     filetype: {type:Text},
  //       gcsBucket: {type:Text},
  //       gcsDir:{type:Text},
  //       size: {type:Integer},
  //       url: {type:Text},
  //   }
  // }

  extendAdminMeta(meta) {
    return { ...meta };
  }
}



module.exports = {
  GCSFile,
  KnexAdapter,
};
