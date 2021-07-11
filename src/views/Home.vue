<script>
import Container from '@/components/Container'
import QuestionAnswer from '@/components/QuestionAnswer'
import data from '@/data.json'
import { computed, ref } from 'vue'

export default {
  name: 'Home',
  components: { QuestionAnswer, Container },
  setup() {
    const searchText = ref('')

    // not `real` random but enough for this use case
    data.sort(() => 0.5 - Math.random())

    const QADataFiltered = computed(() =>
      data.filter((QA) =>
        QA.body.toLowerCase().includes(searchText.value.toLowerCase())
      )
    )

    return { QADataFiltered, data, searchText }
  }
}
</script>

<template lang="pug">
container
  input.search(
    type='text',
    v-model='searchText',
    placeholder='Sorularda Ara...'
  )
  p.qa-count Toplam {{ data.length }} cevaptan {{ QADataFiltered.length }} tanesi gösteriliyor.
  QuestionAnswer(
    v-for='QAData in QADataFiltered',
    :key='QAData.body',
    :QAData='QAData'
  )
</template>

<style lang="scss" scoped>
input.search {
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 3px #ccc;
  border-radius: 0.5rem;
  width: 100%;

  &:focus {
    outline: none;
    box-shadow: 0 0 3px 1px rgb(0, 119, 255);
  }
}

p.qa-count {
  font-size: 0.875rem;
  text-align: right;
  color: #444;
  margin-bottom: 2rem;
}
</style>
