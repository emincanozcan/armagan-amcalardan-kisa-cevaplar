const fetch = require("node-fetch");
const sliceIntoChunks = require("./slice-into-chunks")
function processData(videos) {
  let re = /(.*?)\(([0-9]{2}):([0-9]{2})\)/gm;
  const processedData = []

  videos.forEach(video => {
    const key = video.id;
    const { description } = video.snippet
    const matchedLines = [...description.matchAll(re)];
    matchedLines.forEach(line => {
      let body = line[1].trim();
      if (body.startsWith('-')) body = body.slice(1).trim()
      processedData.push({ videoId: key, body, minute: line[2], second: line[3] })
    })
  });
  return processedData;
}

async function fetchQAs({ apiKey }, videoIds) {
  let data = [];
  const urls = sliceIntoChunks(videoIds, 49)
    .map(chunkedVideoIds => {
      const urlVideoIds = chunkedVideoIds.map(vId => `&id=${vId}`).join('');
      return `https://youtube.googleapis.com/youtube/v3/videos?part=snippet${urlVideoIds}&key=${apiKey}`;
    })

  let jsonResponses = await Promise.all(
    urls.map(url => fetch(url).then(response => response.json()))
  );

  jsonResponses.forEach(jsonResp => {
    data = [ ...data, ...processData(jsonResp.items) ]
  })

  return data;
}

module.exports = fetchQAs