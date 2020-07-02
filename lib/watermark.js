const fs = require('fs')
const cp = require('child_process')
const spawn = cp.spawn;
const path = require('path')

async function addWatermark(stream, id) {
    console.log("===ADD WATERMARK!===")
    let newLocal = `./${id}_tmp`
    let newLocalMarked = `./${id}_tmp_watermark`
    let image = fs.createWriteStream(newLocal)

    await new Promise((resolve, reject) => {
        stream.pipe(image).on('finish', async () => {
            const args = ['-gravity', 'SouthEast', './public/images/20171025EA-0142.png', newLocal, newLocalMarked]
            console.log("CWD: ", process.cwd())
            const composite = spawn('composite', args);
            image.pipe(composite.stdin);
            composite.on('close', (code) => {
                if (code !== 0) {
                    console.log(`Process exited with code ${code}`);
                }
                else {
                    console.log(`Process completed`);
                }
            });
        })
    })

    return fs.createReadStream(newLocalMarked)

    //composite -gravity SouthEast ./public/images/20171025EA-0142.png ./fuckkmt.jpg ./watermarked.jpg



}


module.exports = { addWatermark }
// composite.stdout.pipe(path.basename(input).split('.')[0]+'watermarked'+path.basename(input).split('.')[1])

// Pipe the image magick output to a file. Could just as easily pipe it to a http response or any other stream.
// composite.stdout.pipe( fs.createWriteStream("out.jpg") );