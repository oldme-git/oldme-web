<template>
  <div class="bg-main">
    <p class="text poem">{{ poem?.poem }}</p>
    <p class="c-slave slang">{{ slang?.slang }}</p>
  </div>
</template>

<script setup>
import api from "~/utils/api";

let poem = ref()
let slang = ref()

let {data: poemData, error: poemErr} = await useFetch(api + "/app/poem")
let {data: slangData, error: slangErr} = await useFetch(api + "/app/slang")

try {
  if (poemData.value.code !== 0) {
    console.log(poemData.value.message)
  } else {
    poem.value = poemData.value.data
  }
} catch (e) {
  console.log(e)
}

try {
  if (slangData.value.code !== 0) {
    console.log(slangData.value.message)
  } else {
    slang.value = slangData.value.data
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
