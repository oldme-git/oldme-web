<template>
  <div class="article bg-main">
    <h1 class="title">{{ details.title }}</h1>
    <div class="head">
      <span class="author">
        <i class="fa-regular fa-user"></i>
        {{ details.author }}
      </span>
      <span class="create">
        <i class="fa-regular fa-clock"></i>
        create: {{ date(details.createdAt) }}
        update: {{ date(details.updatedAt) }}
      </span>
    </div>
    <p class="description">
      <span class="bg-slave"></span>
      {{ details.description }}
    </p>
    <div class="content rich" id="rich" ref="rich" v-html="details.content"></div>
    <div ref="toc">
      <p class="main-title bg-slave c-main">
        本文目录
      </p>
      <div class="list-hoc">
        <div class="h2" v-for="item of navList">
          <span :data-title="item.h2.href" @click="side.close($event)">
            {{ item.h2.title }}
          </span>
          <div class="h3"  v-for="item2 of item.h3">
            <span :data-title="item2.href" @click="side.close($event)">
              {{ item2.title }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useRoute} from "nuxt/app";
import api from "../../utils/api";
import {arabToChinese} from "~/utils/func";
import * as side from "../../utils/side";

const route = useRoute()
const id = route.params.id

let details = ref()
const navList = ref([])
const rich = ref()
const toc = ref()
const tocRect = ref()

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


useHead({
  title: details.value.title + " - oldme",
  meta: [
    {  name: "keywords", content: details.value.tags },
    {  name: "description", content: details.value.description }
  ]
})

onMounted(() => {
  $fetch(api + "/app/article/hist/", {
    method: "post",
    body: {
      id
    }
  })
  // 操作rich
  handelRich(rich.value)
  // 挂载目录
  mountToc()
  // 滚动监听
  // addScroll()

  // 获取side-toc的Rect信息
  tocRect.value = toc.value.getBoundingClientRect()
})

// 卸载目录
onBeforeUnmount(() => {
  unMountToc()
})

// 挂载目录至side
function mountToc() {
  document.getElementById("side-toc").append(toc.value)
}

// 卸载side目录
function unMountToc() {
  document.getElementById("side-toc").innerHTML = ""
}

function handelRich(richDom) {
  // 判断该文章是否存在，不存在跳转至404
  if (details.value.id === undefined) {
    window.location.href = "/404"
  }
  // 点击图片可以查看大图片
  const img = richDom.getElementsByTagName("img")
  for (let i of img) {
    i.addEventListener("click", () => {
      let src = i.getAttribute("src")
      window.open(src)
    })
  }

  // 生成导航目录数组
  let nav = []

  // 设置h2标签的id值与class值
  const h2 = richDom.getElementsByTagName("h2")
  let indexH2 = 0
  for (let item of h2) {
    let id = "title-" + indexH2
    item.setAttribute("id", id)
    item.setAttribute("class", "bg-slave c-main")
    item.setAttribute("data-index", indexH2.toString())
    item.innerText = arabToChinese(indexH2+1) + "、" + item.innerText
    nav[indexH2] = {
      "h2": {
        "title": item.innerText,
        "href": "#" + id
      },
      "h3": []
    }
    indexH2++
  }

  // h3标题的处理
  const h3 = richDom.getElementsByTagName("h3")
  // 递归追溯自己的h2标题
  const getH2 = (dom) => {
    // 先获取上一个节点
    let prev = dom.previousElementSibling
    if (prev) {
      if (prev.tagName === "H2") {
        return prev
      } else {
        return getH2(prev)
      }
    }
  }
  let currH2, prevH2, currH2Title = "", indexH3 = 0
  for (let item of h3) {
    // 当前h3的h2
    currH2 = getH2(item)
    if (currH2 !== prevH2) {
      // 重置索引
      indexH3 = 0
    } else {
      currH2Title = currH2.getAttribute("id")
    }
    // 载入当前的h2进入上一次的记录中
    prevH2 = currH2
    let indexH2 = currH2.getAttribute("data-index")
    let id = currH2.getAttribute("id") + "-" + indexH3
    item.setAttribute("id", id)
    item.setAttribute("data-index",  indexH2 + "-" + indexH3.toString())
    // 为h3:after做bg-slave
    item.innerText = (indexH3+1) + ". " + item.innerText
    nav[indexH2].h3[indexH3] = {
      "title": item.innerText,
      "href": "#" + id
    }
    indexH3++
  }

  // 设置a标签的class值
  const a = richDom.getElementsByTagName("a")
  for (let item of a) {
    item.setAttribute("class", "c-slave")
  }

  navList.value = nav
}

// 滚动监听事件
function scrollEvent() {
  if (process.client) {
    let toc = document.getElementById("side-toc")
    // 获取已经滚动的高度
    let top = document.documentElement.scrollTop || document.body.scrollTop
    // 获取toc距离视窗上边距的高度
    const topToc = tocRect.value.top
  }
}

// 开始监听，向 window 中挂在滚动监听事件
function addScroll() {
  if (process.client) {
    window.addEventListener("scroll", scrollEvent)
  }
}

// 停止监听，移除 window 中的滚动监听事件
function removeScroll() {
  if (process.client) {
    window.removeEventListener("scroll", scrollEvent)
  }
}

// 时间只显示 Y-m-d
function date(dateTime) {
  const res = dateTime.match(/\d+-\d+-\d+/)
  try {
    return res[0]
  } catch (e) {
    console.log(e)
    return ""
  }
}

</script>
