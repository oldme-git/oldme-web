<template>
  <div class="menu">
    <div class="xs-search">
      <Search />
    </div>

    <Palette />

    <div id="side-toc" class="side-toc mt1"></div>

    <div>
      <p class="main-title bg-slave c-main">
        网站导航
      </p>
      <ul class="list-1">
        <li>
          <NuxtLink to="/about">
            <i class="fa fa-user mr1"></i>
            &nbsp;关于我
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/article/20">
            <i class="fa fa-heart mr1"></i>
            关于本站
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/reading">
            <i class="fa fa-book mr1"></i>
            读书日记
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="https://github.com/oldme-git" target="_blank">
            <i class="fa fa-github mr1"></i>
            我的Github
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/link">
            <i class="fa fa-link mr1"></i>
            友情链接
          </NuxtLink>
        </li>
      </ul>
    </div>

    <div>
      <p class="main-title bg-slave c-main">
        热门文章
      </p>
      <ul class="list-hot">
        <li :data-sort="i+1" v-for="(l, i) in listHot">
          <NuxtLink :to="'/article/' + l.id">{{ l.title }}</NuxtLink>
        </li>
      </ul>
    </div>

    <div class="mt1">
      <p class="main-title bg-slave c-main">
        近期文章
      </p>
      <ul class="list-1">
        <li v-for="l in listNew">
          <NuxtLink :to="'/article/' + l.id">{{ l.title }}</NuxtLink>
        </li>
      </ul>
    </div>

    <div class="mt1">
      <p class="main-title bg-slave c-main">
        分类
      </p>
      <ul class="list-1">
        <li v-for="l in listGrp">
          <a :href="'/?grp=' + l.id">
            {{ l.name }} ({{ l.article_count }})
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import api from "../utils/api";
import Palette from "~/layouts/palette.vue";

const listHot = ref([])
const listNew = ref([])
const listGrp = ref([])

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
    basis: 2
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

const {data: dGrp, error: errGrp} = await useFetch(api + "/app/article/group/list", {
  query: {
    basis: 2
  }
})

try {
  if (dGrp.value.code !== 0) {
    console.log(dGrp.value.message)
  } else {
    let dataList = dGrp.value.data.list
    let len = dataList.length
    if (len > 0) {
      for (let i = 0; i < dataList.length; i++) {
        listGrp.value.push(dataList[i])
      }
    }
  }
} catch (e) {
  console.log(e)
}
</script>
