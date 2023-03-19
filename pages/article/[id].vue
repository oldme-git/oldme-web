<template>
  <div class="article">
    <h1 class="title">{{ details.title }}</h1>
    <div class="head">
      <span class="author">
        <i class="fa fa-user-o"></i>
        {{ details.author }}
      </span>
      <span class="create">
        <i class="fa-regular fa-clock"></i>
        {{ details.updatedAt }}
      </span>
    </div>
    <p class="description">
      {{ details.description }}
    </p>
    <div class="content rich" v-html="details.content"></div>
  </div>
</template>

<script setup>
import {useRoute} from "nuxt/app";
import api from "../../utils/api";
const route = useRoute()

const id = route.params.id

let details = ref()
let {data: d, error: err} = await useFetch(api + "/app/article/show/" + id)

try {
  if (d.value.code !== 0) {
    console.log(d.value.message)
  } else {
    details.value = d.value.data
  }
} catch (e) {
  console.log(e)
}

if (process.client) {
  // 判断该文章是否存在，不存在跳转至404
  if (details.value.id === undefined) {
    window.location.href = "/404"
  }
  console.log(details.value.id)
  // 点击图片可以查看大图片
  const img = document.getElementsByTagName("img")
  for (let i of img) {
    i.addEventListener("click", () => {
      let src = i.getAttribute("src")
      window.open(src)
    })
  }
}

useHead({
  title: details.value.title + " - oldme",
  meta: [
    {  name: "keywords", content: details.value.tags },
    {  name: "description", content: details.value.description }
  ]
})
</script>
