const fetch = require('node-fetch')

const videoIds = []
let requestData = { channel: '', apiKey: '' }

function getBaseUrl() {
  return `https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=${requestData.channel}&maxResults=50&key=${requestData.apiKey}&type=video`
}

// Note: The quota cost of these requests are very high.
async function fetchFromYoutube(url) {
  try {
    const res = await fetch(url)
    const data = await res.json()
    data.items.forEach((item) => videoIds.push(item.id.videoId))
    if (data.nextPageToken) {
      await fetchFromYoutube(`${getBaseUrl()}&pageToken=${data.nextPageToken}`)
    }
  } catch (err) {
    console.log(err, { method: 'fetchFromYoutube' })
  }
}

async function fetchVideoIds({ channel, apiKey }) {
  requestData = { channel, apiKey }
  try {
    await fetchFromYoutube(getBaseUrl())
  } catch (err) {
    console.log(err, { method: 'fetchVideoIds' })
  }
  return videoIds
}

module.exports = fetchVideoIds
