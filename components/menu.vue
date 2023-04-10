<template>
  <div class="menu">
    <div class="xs-search">
      <Search />
    </div>

    <div id="side-toc" class="side-toc"></div>

    <div>
      <h1 class="main-title">
        网站导航
      </h1>
      <ul class="list-1">
        <li>
          <NuxtLink to="/about">关于我</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/link">友情链接</NuxtLink>
        </li>
      </ul>
    </div>

    <div>
      <h1 class="main-title">
        热门文章
      </h1>
      <ul class="list-hot">
        <li :data-sort="i+1" v-for="(l, i) in listHot">
          <NuxtLink :to="'/article/' + l.id">{{ l.title }}</NuxtLink>
        </li>
      </ul>
    </div>

    <div class="mt1">
      <h1 class="main-title">
        近期文章
      </h1>
      <ul class="list-1">
        <li v-for="l in listNew">
          <NuxtLink :to="'/article/' + l.id">{{ l.title }}</NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import api from "../utils/api";

const listHot = ref([])
const listNew = ref([])
const {data: dHot, error: errHot} = await useFetch(api + "/app/article/rank", {
  query: {
    basis: 1
  }
})

try {
  if (dHot.value.code !== 0) {
    console.log(dHot.value.message)
  } else {
    let dataList = dHot.value.data.list
    let len = dataList.length
    if (len > 0) {
      for (let i = 0; i < dataList.length; i++) {
        listHot.value.push(dataList[i])
      }
    }
  }
} catch (e) {
  console.log(e)
}

const {data: dNew, error: errNew} = await useFetch(api + "/app/article/rank", {
  query: {
    basis: 1
  }
})

try {
  if (dNew.value.code !== 0) {
    console.log(dNew.value.message)
  } else {
    let dataList = dNew.value.data.list
    let len = dataList.length
    if (len > 0) {
      for (let i = 0; i < dataList.length; i++) {
        listNew.value.push(dataList[i])
      }
    }
  }
} catch (e) {
  console.log(e)
}
</script>
