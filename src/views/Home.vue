<template lang="pug">
.max-w-2xl.w-full.mx-auto.px-4
  input.px-4.py-3.mb-4.shadow-md.rounded-md.w-full(
    type="text",
    v-model="searchText",
    placeholder="Sorularda Ara..."
  )
  .text-sm.text-right.text-gray-700.mb-8 Toplam {{ data.length }} cevaptan {{ QADataFiltered.length }} tanesi gösteriliyor.
  QA(v-for="(QA, i) in QADataFiltered", :key="QA.body", :qa="QA")
</template>

<script>
import QA from "@/components/qa";
import data from "@/data.json";
import { computed, ref } from "vue";

export default {
  name: "Home",
  components: { QA },
  setup() {
    const searchText = ref("");

    // not `real` random but enough for this use case
    data.sort(() => 0.5 - Math.random())

    const QADataFiltered = computed(() =>
      data.filter((QA) =>
        QA.body.toLowerCase().includes(searchText.value.toLowerCase())
      )
    );

    return { QADataFiltered, data, searchText };
  },
};
</script>
