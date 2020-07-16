const fs = require('fs')
const cp = require('child_process')
const spawn = cp.spawn;

async function addWatermark(stream, id) {
    console.log("===ADD WATERMARK!===")
    let newLocal = `./${id}_tmp`
    // let newLocalMarked = `./${id}_tmp_watermark`
    let newLocalMarked = './undefined_tmp_watermark'
    let image = fs.createWriteStream(newLocal)
    stream.pipe(image)
    const args = ['-gravity', 'SouthEast', 'public/images/20171025EA-0142.png', newLocal, newLocalMarked]
    const composite = spawn('composite', args);
    let image_read = fs.createReadStream(newLocal);
    image_read.pipe(composite.stdin);
    return fs.createReadStream(newLocalMarked)


    // await new Promise((resolve, reject) => {
    //     stream.pipe(image).on('finish', () => {
    //         // const args = ['-gravity', 'SouthEast', 'public/images/20171025EA-0142.png', newLocal, newLocalMarked]
    //         console.log("CWD: ", process.cwd())
    //         const composite = spawn('composite', args);
    //         let image_read = fs.createReadStream(newLocal);
    //         try {
    //             image_read.pipe(composite.stdin);
    //             composite.on('close', (code) => {
    //                 if (code !== 0) {
    //                     console.log(`Process exited with code ${code}`);
    //                 } else {
    //                     console.log(`Process completed`);
    //                 }
    //             })
    //                 .on('error', (err) => {
    //                     console.log(err)
    //                     console.log("GRRRRR")
    //                 })
    //         } catch (err) {
    //             console.log(err)
    //             console.log("ERRR...")
    //             return fs.createReadStream(newLocalMarked)
    //         }
    //     })
    //
    // })
    //
    // return fs.createReadStream(newLocalMarked)

    //composite -gravity SouthEast ./public/images/20171025EA-0142.png ./fuckkmt.jpg ./watermarked.jpg


}


module.exports = {addWatermark}
// composite.stdout.pipe(path.basename(input).split('.')[0]+'watermarked'+path.basename(input).split('.')[1])

// Pipe the image magick output to a file. Could just as easily pipe it to a http response or any other stream.
// composite.stdout.pipe( fs.createWriteStream("out.jpg") );