const { Storage } = require('@google-cloud/storage');
const moment = require('moment')
const path = require('path')
const gcskeyfile = './configs/gcskeyfile.json';
const ffmpeg = require('fluent-ffmpeg')
const fs = require('fs')
const spawn = require('child_process').spawn
// process.env.GOOGLE_APPLICATION_CREDENTIALS = 'configs/gcskeyfile.json'
// GOOGLE_APPLICATION_CREDENTIALS

module.exports.GCSAdapter = class {
    constructor(gcsDir, gcskeyfilePath = gcskeyfile) {
        gcskeyfilePath = path.resolve(gcskeyfile)
        if (!gcskeyfilePath) {
            throw new Error('GCSAdapter needs you specifies GOOGLE_APPLICATION_CREDENTIALS, should be a string path')
        }
        process.env.GOOGLE_APPLICATION_CREDENTIALS = gcskeyfilePath
        this.storage = new Storage()
        this.bucket = this.storage.bucket('mirrormedia-files')
        this.gcsDir = gcsDir
    }

    getFilename({ id, originalFilename }) {
        return `${id}-${originalFilename}`;
    }

    getDuration(stream, id) {
        const newLocal = `./${id}_tmp`;
        let local = fs.createWriteStream(newLocal) //save a local at server
        stream.pipe(local)
        let local_readstream = fs.createReadStream(`./${id}_tmp`)

        const command = ffmpeg(local_readstream)
        duraion = spawn(`ffprobe -i ${newLocal} -show_entries format=duration -v quiet -of csv="p=0"`)
        return float(duraion)
        // stream.pipe()
        // command.ffprobe(function (err, data) {
        //     if (err){
        //         console.error('\nERROR[1]: ' + err); //exited code 1
        //         throw err; //pipe:0: Invalid data found when processing input
        //     }
        //     else {
        //         console.log('\nMETADATA[1]: ' + JSON.stringify(data.format.duration));
        //         fs.unlink(`${id}_tmp`, (err) => {
        //             if (err) throw err;
        //             console.log(`${id}_tmp was deleted`);
        //           });
        //         return data.format.duration;
        //     }
        // });
    }

    // https://googleapis.dev/nodejs/storage/latest/Bucket.html#upload
    // https://googleapis.dev/nodejs/storage/latest/File.html#createWriteStream
    async save({ stream, filename, mimetype, encoding, id }) {
        const baseName = path.basename(filename)
        // const file = this.bucket.file(`${this.gcsDir}${baseName}`)
        const nowtime = moment(new Date()).format("YYYYMMDDhhmmss");
        let ext = baseName.split(".")[1]
        let uploadedName = `${nowtime}-${id}.${ext}`
        let file = this.bucket.file(`${this.gcsDir}${uploadedName}`) //filename saved on GCS

        let _meta = {}

        // if (mimetype.match('^video/*')) {
            // // video
            // console.log("TYPE: ",typeof(stream))
            // const duration = this.getDuration(stream, id)
            // mimedata.duration = duration
            // console.log("V Duration: " + duration)
        // } else if (mimetype.match('^audio/')) {
            // //audio
            // const duration = this.getDuration(stream, id)
            // mimedata.duration = duration
            // console.log("A Duration: " + duration)
        // }

        try {
            await this.uploadFile(stream, file, baseName);
            var mimeInfo = await file.getMetadata();
        } catch (err) { console.log(err) }

        _meta.mimeInfo = mimeInfo
        _meta.url = this.PublicUrl(uploadedName)
        return { id, filename, _meta }
    }

    async uploadFile(stream, file, baseName) {
        return new Promise((resolve, reject) => {
            const write = file.createWriteStream(this.getOptions(baseName))
            stream.pipe(write);
            write
            .on('error', function (err) {
				console.log(err);
				reject(err);
			})
			.on('finish', function () {
				file.makePublic(function (err, apiResponse) {
					if (err) {
						return reject(err);
					}
					resolve(apiResponse);
				});
			});
        })
        
    }

    getOptions(filename) {
        // let destination = `${this.gcsDir}${filename}`;
        let options = {
            gzip: true,
            // destination: destination,
            metadata: {
                cacheControl: 'public, max-age=31536000',
            },
            public: true
        };
        return options
    }

    async delete(filename) {
        await this.bucket.file(filename).delete();

        console.log(`gs://${this.gcsDir}${filename} deleted.`);
    }

    async makePublic(filename) {
    // Makes the file public
        await this.bucket.file(`${this.gcsDir}{filename}`).makePublic();

        // console.log(`gs://${filename} is now public.`);
    }

    PublicUrl(filename) {
        let s = `https://storage.googleapis.com/mirrormedia-files/${this.gcsDir}${filename}`
        return s
    }
}


