<template>
  <div id="article-list">
    <ul class="list-2">
      <li v-for="l in list">
        <NuxtLink class="bg-main" :to="'/article/' + l.id">
          <div class="left">
            <img :src="l.thumb" :alt="l.title">
          </div>
          <div class="right">
            <h2 class="title">{{ l.title }}</h2>
            <p class="description">描述： {{ l.description }}</p>
            <p class="time"><i class="fa fa-clock-o"></i> {{ dateYmd(l.createdAt) }}</p>
          </div>
        </NuxtLink>
      </li>
    </ul>
    <div>
      <div v-if="list.length===0">
        <span class="no-result" v-if="search">
          没有搜索到内容，请重新搜索
        </span>
        <p class="loading" v-else>
          <i class="fa fa-spin fa-spinner"></i>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from "../utils/api"
import {useRoute} from "nuxt/app"
import {dateYmd, getQueryVariable} from "~/utils/func";

const route = useRoute()
let page = ref(1)
let list = ref([])
let search = ref("")
let grp = ref("")

if (process.client) {
  search = getQueryVariable("search")
  grp = getQueryVariable("grp")
}

onMounted(() => {
  loadData()
  window.addEventListener("scroll", scrollEvent)
})

async function loadData() {
  let {data: d, error: err} = await useFetch(api + "/app/article/list/" + grp, {
    query: {
      page,
      search
    }
  })

  try {
    if (d.value.code !== 0) {
      console.log(d.value.message)
    } else {
      let dataList = d.value.data.list
      let len = dataList.length
      if (len > 0) {
        if (process.client) {
          addScroll()
        }
        for (let i = 0; i < dataList.length; i++) {
          list.value.push(dataList[i])
        }
      }
    }
  } catch (e) {
    console.log(e)
  }
}

// 开始监听
function addScroll() {
  window.addEventListener("scroll", scrollEvent)
}

// 停止监听
function removeScroll() {
  window.removeEventListener("scroll", scrollEvent)
}

// 滚动监听事件
function scrollEvent () {
  // 已经滚动的高度
  let scroll = document.documentElement.scrollTop || document.body.scrollTop
  let top = window.screen.height + scroll
  // body高度
  let bodyH = document.body.clientHeight
  if (top + 500 > bodyH) {
    removeScroll()
    page.value++
    loadData()
  }
}

</script>
