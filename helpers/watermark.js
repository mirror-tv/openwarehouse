const fs = require('fs')
const cp = require('child_process')
const execSync = cp.execSync
const path = require('path')
// const { watermark } = require('purejswatermark')

async function addWatermark(id, origFilename) {
    console.log('ready to add watermark')

    let name = origFilename.split('.')[0]
    let ext = origFilename.split('.')[1]

    const originalImagePath = `public/images/${id}-${name}.${ext} `
    const watermartImagePath = 'public/images/2020-mirror-logo.png'
    const options = { opacity: 0.9 } // opcacity should be less than one

    try {
        return new Promise(async (resolve, reject) => {
            try {
                const imageWithWatermark = await watermark.addWatermark(
                    originalImagePath,
                    watermartImagePath,
                    options
                )
                resolve(imageWithWatermark)
            } catch (err) {
                console.log(err)
                throw new Error('cannot get watermark image')
            }
        })
    } catch (err) {
        console.log('error getting watermark', err)
    }

    // let newLocalMarked = `./${id}-${name}_tmp_watermark.${ext}`

    // console.log('newLocalMarked', newLocalMarked)

    // let image = fs.createWriteStream(`./public/images/${id}-${name}_tmp.${ext}`)
    // execSync(
    //     `composite -gravity SouthEast public/images/2020-mirror-logo.png public/images/${id}-${name}_tmp.${ext} ${newLocalMarked}`
    // )
    // return fs.createReadStream(newLocalMarked)
    // //composite -gravity SouthEast ./public/images/2020-mirror-logo.png ./fuckkmt.jpg ./watermarked.jpg
}

module.exports = { addWatermark }
// composite.stdout.pipe(path.basename(input).split('.')[0]+'watermarked'+path.basename(input).split('.')[1])
// Pipe the image magick output to a file. Could just as easily pipe it to a http response or any other stream.
// composite.stdout.pipe( fs.createWriteStream("out.jpg") );
