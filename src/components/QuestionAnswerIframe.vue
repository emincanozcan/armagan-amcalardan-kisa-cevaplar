<template lang="pug">
.iframe-wrapper
  iframe(:src="embedUrl", frameborder="0")
</template>

<script>
export default {
  name: 'QuestionAnswerIframe',
  props: {
    start: Object,
    end: Object,
    videoId: String
  },
  setup(props) {
    console.log(props)
    const getTime = ({ minute, second }) =>
      parseInt(minute) * 60 + parseInt(second)

    const embedUrlBase = `https://www.youtube.com/embed/${props.videoId}?autoplay=1`
    const timeStart = `&start=${getTime(props.start)}`
    const timeEnd = props.end ? `${'&end=' + getTime(props.end)}` : ''

    const embedUrl = embedUrlBase + timeStart + timeEnd
    return { embedUrl }
  }
}
</script>
<style scoped>
.iframe-wrapper {
  position: relative;
  padding-top: 56.25%;
}
iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
