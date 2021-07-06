const app = require('express')()
const http = require('http').createServer(app)
const YouTubeNotifier = require('youtube-notification')
const fetchQAs = require('./build-utils/fetch-qas')
const questions = require('./data.json')
const { writeFile } = require('fs')

const port = process.env.PORT || 3001

http.listen(port)

const notifier = new YouTubeNotifier({
  hubCallback: 'https://armagan-amcalardan-kisa-cevaplar.vercel.app/notifier'
})

notifier.setup()

notifier.on('notified', async (data) => {
  const videoId = data.video.id
  const apiKey = ''

  const newQuestions = await fetchQAs({ apiKey }, [videoId])

  const questionList = questions.filter(
    (q) => q.videoId != newQuestions[0].videoId
  )
  questionList.push(...newQuestions)

  writeFile('./data.json', JSON.stringify(questionList), (err) => {
    if (err) throw err
  })
})

notifier.subscribe('UCANCsbie9EorvBNWfpVntGQ')

app.use('/notifier', notifier.listener())
