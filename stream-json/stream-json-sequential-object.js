const StreamArray = require('stream-json/streamers/StreamArray')

const { Writable } = require('stream')
const path = require('path')
const fs = require('fs')

let jsonFilename = 'songs.json'

const fileStream = fs.createReadStream(path.join(__dirname, jsonFilename))
// const fileStream = fs.createReadStream(jsonFilename)
const jsonStream = StreamArray.withParser()

const processingStream = new Writable({
    write({key, value}, encoding, callback) {
        setTimeout(() => {
            console.log(value)
            callback()
        }, 1000)
    },
    objectMode: true//operate with objects, not buffers
})

//pipe the stream
fileStream.pipe(jsonStream)
jsonStream.pipe(processingStream)


fileStream.on('data', data => {
    console.log(data)
});

processingStream.on('finish', () => {
    console.log(`Processed ${jsonFilename}`)
})