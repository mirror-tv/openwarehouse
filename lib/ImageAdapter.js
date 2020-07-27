const { GCSAdapter } = require('./GCSAdapter.js')
const im = require('imagemagick-stream');
const fs = require('fs');
const moment = require('moment')
const urlBase = 'https://storage.cloud.google.com/mirrormedia-files/'

const resizeTarget = {
    tiny: { height: 84, width: 150 },
    mobile: { height: 450, width: 800 },
    tablet: { height: 675, width: 1200 },
    desktop: { height: 713, width: 1268 }
}

class ImageAdapter extends GCSAdapter {

    async save({ stream, filename, mimetype, encoding, id }) {
        // const baseName = path.basename(filename)
        const nowtime = moment(new Date()).format("YYYYMMDDhhmmss");
        let _meta = {}
        // let ext = baseName.split(".")[1]
        // console.log("GOT FILENAME:", filename) // This happened before hook resolveInput

        stream.pipe(fs.createWriteStream(`./${id}_local_tmp`))
        var url = {}
        //Save to GCS
        try {
            for (const key in resizeTarget) {
                const resized_filename = `${nowtime}-${id}-${key}.${ext}`

                switch (key) {
                    case 'tiny':
                        url.urlTinySized = `${urlBase}${this.gcsDir}${resized_filename}`
                    case 'mobile':
                        url.urlMobileSized = `${urlBase}${this.gcsDir}${resized_filename}`
                    case 'tablet':
                        url.urlTabletSized = `${urlBase}${this.gcsDir}${resized_filename}`
                    case 'desktop':
                        url.urlDesktopSized = `${urlBase}${this.gcsDir}${resized_filename}`
                }
                this.saveGCS(resized_filename, stream, key);
            }
            this.saveOriginalSizedImage(nowtime, id, ext, stream, url);

        }
        catch (err) { console.log(err) }
        _meta.url = url
        
        return { id, filename, _meta }
    }

    sync_save(stream, id) {
        const nowtime = moment(new Date()).format("YYYYMMDDhhmmss");
        let _meta = {}
        stream.pipe(fs.createWriteStream(`./${id}_local_tmp`)) //不能pipe?
        var url = {}
        //Save to GCS
        try {
            for (const key in resizeTarget) {
                const resized_filename = `${nowtime}-${id}-${key}`

                switch (key) {
                    case 'tiny':
                        url.urlTinySized = `${urlBase}${this.gcsDir}${resized_filename}`
                    case 'mobile':
                        url.urlMobileSized = `${urlBase}${this.gcsDir}${resized_filename}`
                    case 'tablet':
                        url.urlTabletSized = `${urlBase}${this.gcsDir}${resized_filename}`
                    case 'desktop':
                        url.urlDesktopSized = `${urlBase}${this.gcsDir}${resized_filename}`
                }
                this.saveGCS(resized_filename, stream, key);
            }
            this.saveOriginalSizedImage(nowtime, id, '', stream, url);

        }
        catch (err) { console.log(err) }
        _meta.url = url

        return  _meta
    }

    saveGCS(resized_filename, stream, key) {
        const file = this.bucket.file(`${this.gcsDir}${resized_filename}`) //get the upload path
        const write = file.createWriteStream(this.getOptions(resized_filename));

        stream.pipe(im().resize(`${resizeTarget[key].width}x${resizeTarget[key].height}`)).pipe(write) //resize and upload
    }

    saveOriginalSizedImage(nowtime, id, ext, stream, url) {
        const originalSize = this.bucket.file(`${this.gcsDir}${nowtime}-${id}.${ext}`);
        const originalWrite = originalSize.createWriteStream(this.getOptions());
        stream.pipe(originalWrite);
        url.urlOriginal = `${urlBase}${this.gcsDir}${nowtime}-${id}.${ext}`
    }

    delete(file) {

    }

    PublicUrl(filename) {
        let s = `https://storage.googleapis.com/${this.bucket}/${filename}`
        return s
    }
}


module.exports = { ImageAdapter }