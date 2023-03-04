<template>
  <div class="article">
    <h1 class="title">友情链接</h1>
    <div class="head">
      <span class="author">
        <i class="fa fa-user-o"></i>
        half
      </span>
    </div>
    <div class="content rich">
      <h1>友情链接</h1>
    </div>
    <div class="link">
      <ul>
        <li>
          <span class="link-title">友情链接</span>
          <span>描述</span>
        </li>
        <li v-for="item in list">
          <a class="link-title" :href="item.link">{{ item.name }}</a>
          <span>{{ item.description }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import api from "../utils/api";

const list = ref([])
const {data: dLink, error: errHot} = await useFetch(api + "/app/link", {
  query: {
    basis: 1
  }
})

try {
  if (dLink.value.code !== 0) {
    console.log(dLink.value.message)
  } else {
    let dataList = dLink.value.data.list
    let len = dataList.length
    if (len > 0) {
      for (let i = 0; i < dataList.length; i++) {
        list.value.push(dataList[i])
      }
    }
  }
} catch (e) {
  console.log(e)
}

</script>
