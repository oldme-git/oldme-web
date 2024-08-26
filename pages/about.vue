<template>
  <div class="article bg-main">
    <h1 class="title">关于我</h1>
    <div class="head mb2">
      <span class="author">
        <i class="fa fa-user-o"></i>
        {{ details.author }}
      </span>
      <span class="create">
        <i class="fa fa-clock"></i>
        {{ details.createdAt }}
      </span>
    </div>
    <div class="content rich" v-html="details.content"></div>
    <reply :id="id"></reply>
  </div>
</template>

<script setup>
import api from "~/utils/api";

const id = "1"
let details = ref()

let {data: d, error: err} = await useFetch(api + "/app/about")

try {
  if (d.value.code !== 0) {
    console.log(d.value.message)
  } else {
    details.value = d.value.data
  }
} catch (e) {
  console.log(e)
}

useHead({
  title: details.value.title + " - oldme",
  meta: [
    {  name: "keywords", content: details.value.tags },
    {  name: "description", content: details.value.description }
  ]
})
</script>
