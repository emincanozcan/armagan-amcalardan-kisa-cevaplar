<template lang="pug">
.qa
  .question-area
    p.question-text {{ QAData.body }}
    button.answer-toggle-btn(@click="showAnswer = !showAnswer") {{ showAnswer ? "Cevabı Gizle" : "Cevabı Gör" }}
  .answer-area(v-if="showAnswer")
    p (Video cevabın verildiği zamandan başlar.)
    qa-iframe(:start="QAData.start", :end="QAData.end", :video-id="QAData.videoId")
</template>

<script>
import QaIframe from '@/components/QuestionAnswerIframe'
import { ref } from 'vue'

export default {
  name: 'QA',
  props: { QAData: Object },
  components: { QaIframe },
  setup() {
    const showAnswer = ref(false)
    return { showAnswer }
  }
}
</script>

<style lang="scss" scoped>
.qa {
  background: white;
  border-radius: 0.5rem;
  filter: drop-shadow(0 4px 3px rgba(0, 0, 0, 0.07));
  margin: 1rem 0;
  padding: 1rem;
}

.question-area {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.question-text {
  color: #222;
  line-height: 1.5;
  font-size: 0.875rem;
}

.answer-toggle-btn {
  flex-shrink: 0;
  background: rgb(59, 130, 246);
  color: #fff;
  padding: 0.5rem 0;
  width: 8rem;
  margin-top: 0.5rem;
  font-weight: 600;
  font-size: 0.75rem;
  border-radius: 0.3rem;
}

.answer-area {
  margin-top: 0.5rem;

  p {
    color: #4b4b4b;
    font-size: 0.75rem;
    text-align: center;
    margin-bottom: 1rem;
  }
}

@media screen and (min-width: 720px) {
  .question-area {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
  .answer-toggle-btn {
    margin-left: 2rem;
    margin-top: 0;
    width: 6rem;
  }
  .answer-area p {
    text-align: right;
  }
}
</style>
