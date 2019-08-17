const { chain } = require('stream-chain')
const { parser } = require('stream-json')
const { streamArray } = require('stream-json/streamers/StreamArray')

const fs = require('fs')

const pipeline = chain([
    fs.createReadStream('songs.json'),
    parser(),
    streamArray()
])

let objectCounter = 0

pipeline.on('data', () => {
    ++objectCounter
})

pipeline.on('end', () => {
    console.log(`Found ${objectCounter} objects`)
})