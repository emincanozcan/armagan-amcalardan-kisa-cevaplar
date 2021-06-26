<template lang="pug">
.space-x-4
  .w-full.bg-white.text-gray-800.text-sm.rounded-md.shadow-md.my-4.py-4.px-4
    div(class="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-8")
      .text-left {{ body }}
      button.flex-shrink-0.bg-blue-500.text-white.px-4.py-2.rounded-md.font-medium.shadow-sm.text-xs(
        @click="showAnswer = !showAnswer"
      ) {{ showAnswer ? 'Cevabı Gizle' : 'Cevabı Gör' }}
    .mt-4(v-if="showAnswer")
      iframe(class="w-full h-60 sm:h-80 md:h-96" :src="embedUrl", frameborder="0")
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  name: "QA",
  props: { qa: Object },
  setup(props) {
    const showAnswer = ref(false);
    const embedUrl = `http://www.youtube.com/embed/${
      props.qa.videoId
    }?autoplay=1&start=${
      parseInt(props.qa.minute) * 60 + parseInt(props.qa.second)
    }`;
    return {
      body: props.qa.body,
      showAnswer,
      embedUrl,
    };
  },
};
</script> 