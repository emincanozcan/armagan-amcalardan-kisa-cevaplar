const fetchQAs = require('./build-utils/fetch-qas')
const fetchVideoIds = require('./build-utils/fetch-video-ids')
const fs = require('fs')

const buildData = {
  channel: 'UCANCsbie9EorvBNWfpVntGQ',
  apiKey: ''
}

async function generateData() {
  const videoIds = await fetchVideoIds(buildData)
  const data = await fetchQAs(buildData, videoIds)
  fs.writeFile('src/data.json', JSON.stringify(data), (err) => {
    if (err) throw err
  })
}

generateData()
