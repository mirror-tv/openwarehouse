// import {keystone} from "../../index";

const { File } = require('@keystonejs/fields');
// const fs = require('fs');
// const CloudStorageAdapter = require('keystone-storage-adapter-cloud-storage')
const GCSAdapter = require('../../lib/GCSAdapter')
// const keyFilename = require('../../configs/gcskeyfile')
const {KnexFileInterface} = require('@keystonejs/adapter-knex')

// options = {"keyFilename": keyFilename}


class GCSFile extends File.implementation {
  constructor(path) {
    super(...arguments);
    this.keystone = keystone;
    this.fileAdapter = new GCSAdapter('configs/gcskeyfile.json');

  }



  extendAdminMeta(meta) {
    return { ...meta };
  }
}



module.exports = {
  GCSFile,
  KnexFileInterface,
};
