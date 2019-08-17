const StreamArray = require('stream-json/streamers/StreamArray')

const { Writable } = require('stream')
const path = require('path')
const fs = require('fs')

let jsonFilename = 'data/songs.json'

// const fileStream = fs.createReadStream(path.join(__dirname, jsonFilename))
const fileStream = fs.createReadStream(jsonFilename)
const jsonStream = StreamArray.withParser()

let counterProcessed = 0
const processingStream = new Writable({
    write({key, value}, encoding, callback) {
        setTimeout(() => {
            ++counterProcessed
            callback()
        }, 10)
    },
    objectMode: true//operate with objects, not buffers
})

//pipe the stream
fileStream.pipe(jsonStream)
jsonStream.pipe(processingStream)


processingStream.on('finish', () => {
    console.log(`Processed ${counterProcessed} objects via ${jsonFilename} stream`)
})