<template lang="pug">
.space-x-4
  .w-full.bg-white.text-gray-800.text-sm.rounded-md.shadow-md.my-4.py-4.px-4
    .flex.flex-col.items-center.justify-between.space-y-4(
      class="md:flex-row md:space-y-0 md:space-x-8"
    )
      .text-left {{ body }}
      button.flex-shrink-0.bg-blue-500.text-white.px-4.py-2.rounded-md.font-medium.shadow-sm.text-xs(
        @click="showAnswer = !showAnswer"
      ) {{ showAnswer ? 'Cevabı Gizle' : 'Cevabı Gör' }}
    .mt-4(v-if="showAnswer")
      p.text-xs.text-gray-500.text-right.mb-4 (Video cevabın verildiği zamandan başlar.)
      iframe.w-full.h-60(class="sm:h-80 md:h-96", :src="embedUrl", frameborder="0")
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  name: "QA",
  props: { qa: Object },
  setup(props) {
    const showAnswer = ref(false);

    const getTime = ({ minute, second }) =>
      parseInt(minute) * 60 + parseInt(second);

    // @TODO: refactor embedUrl generation...
    const embedUrl = `https://www.youtube.com/embed/${
      props.qa.videoId
    }?autoplay=1&start=${getTime(props.qa.start)}${
      Object.keys(props.qa.end).length > 0
        ? "&end=" + getTime(props.qa.end)
        : ""
    }`;

    return {
      body: props.qa.body,
      showAnswer,
      embedUrl,
    };
  },
};
</script> 