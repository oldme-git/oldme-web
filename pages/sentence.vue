<template>
  <div class="bg-main">
    <p class="text poem">{{ sentence?.poem }}</p>
    <p class="c-slave slang">{{ sentence?.slang }}</p>
  </div>
</template>

<script setup>
import api from "~/utils/api";

let sentence = ref()

let {data: sentenceData, error: err} = await useFetch(api + "/app/sentence")

try {
  if (sentenceData.value.code !== 0) {
    console.log(sentenceData.value.message)
  } else {
    sentence.value = sentenceData.value.data
  }
} catch (e) {
  console.log(e)
}

</script>

<style scoped lang="scss">
.poem {
  font-size: 1.4rem;
  white-space: pre-line;
}

.slang {
  font-size: 1.2rem;
  margin-top: 10rem;
}
</style>
