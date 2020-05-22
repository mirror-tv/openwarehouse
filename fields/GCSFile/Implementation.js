import {keystone} from "../../index";

const { File } = require('@keystonejs/fields');
// const fs = require('fs');
const CloudStorageAdapter = require('keystone-storage-adapter-cloud-storage')
const keyFilename = require('./configs/gcskeyfile')
const {KnexAdapter} = require('@keystonejs/adapter-knex')

// options = {"keyFilename": keyFilename}

var cloudStorageAdapter = CloudStorageAdapter({keyFilename:keyFilename})

class GCSFile extends File.implementation {
  constructor(path) {
    super(...arguments);
    this.keystone = keystone;
    this.fileAdapter = cloudStorageAdapter;


  }



  extendAdminMeta(meta) {
    return { ...meta };
  }
}



module.exports = {
  GCSFile,
  KnexInterface,
};
