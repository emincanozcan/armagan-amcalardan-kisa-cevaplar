const fetch = require('node-fetch')
const sliceIntoChunks = require('./slice-into-chunks')

function processData(videos) {
  let re = /(.*?)\(([0-9]{2}):([0-9]{2})\)/gm
  const processedData = []

  videos.forEach((video) => {
    const key = video.id
    const { description } = video.snippet
    const matchedLines = [...description.matchAll(re)]
    matchedLines.forEach((currentLine, i) => {
      let body = currentLine[1].trim()
      if (body.startsWith('-')) body = body.slice(1).trim()

      const start = { minute: currentLine[2], second: currentLine[3] }
      const end = matchedLines[i + 1]
        ? { minute: matchedLines[i + 1][2], second: matchedLines[i + 1][3] }
        : {}
      processedData.push({ videoId: key, body, start, end })
    })
  })
  return processedData
}

async function fetchQAs({ apiKey }, videoIds) {
  let data = []
  const urls = sliceIntoChunks(videoIds, 49).map((chunkedVideoIds) => {
    const urlVideoIds = chunkedVideoIds.map((vId) => `&id=${vId}`).join('')
    return `https://youtube.googleapis.com/youtube/v3/videos?part=snippet${urlVideoIds}&key=${apiKey}`
  })

  let jsonResponses = await Promise.all(
    urls.map((url) => fetch(url).then((response) => response.json()))
  )

  jsonResponses.forEach((jsonResp) => {
    data = [...data, ...processData(jsonResp.items)]
  })

  return data
}

module.exports = fetchQAs
