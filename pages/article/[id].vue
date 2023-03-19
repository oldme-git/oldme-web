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
        {{ details.createdAt }}
      </span>
    </div>
    <p class="description">
      {{ details.description }}
    </p>
    <div ref="toc">
      <h1 class="main-title">
        本文目录
      </h1>
      <div class="list-hoc">
        <div class="h1" v-for="item of navList">
          <a :href="item.h1.href">
            {{ item.h1.title }}
          </a>
          <div class="h2"  v-for="item2 of item.h2">
            <a :href="item2.href">
              {{ item2.title }}
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="content rich" id="rich" ref="rich" v-html="details.content"></div>

  </div>
</template>

<script setup>
import {useRoute} from "nuxt/app";
import api from "../../utils/api";
import {arabToChinese} from "~/utils/func";
const route = useRoute()

const id = route.params.id

let details = ref()
const navList = ref([])
const rich = ref()
const toc = ref()

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

onMounted(() => {
  handelRich(rich.value)
})

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

  // 设置h1标签的id值
  const h1 = richDom.getElementsByTagName("h1")
  let indexH1 = 0
  for (let item of h1) {
    let id = "title-" + indexH1
    item.setAttribute("id", id)
    item.setAttribute("data-index", indexH1.toString())
    item.innerText = arabToChinese(indexH1+1) + "、" + item.innerText
    nav[indexH1] = {
      "h1": {
        "title": item.innerText,
        "href": "#" + id
      },
      "h2": []
    }
    indexH1++
  }

  // h2标题的处理
  const h2 = richDom.getElementsByTagName("h2")
  // 递归追溯自己的h1标题
  const getH1 = (dom) => {
    // 先获取上一个节点
    let prev = dom.previousElementSibling
    if (prev) {
      if (prev.tagName === "H1") {
        return prev
      } else {
        return getH1(prev)
      }
    }
  }
  let currH1, prevH1, currH1Title = "", indexH2 = 0
  for (let item of h2) {
    // 当前h2的h1
    currH1 = getH1(item)
    if (currH1 !== prevH1) {
      // 重置索引
      indexH2 = 0
    } else {
      currH1Title = currH1.getAttribute("id")
    }
    // 载入当前的h1进入上一次的记录中
    prevH1 = currH1
    let indexH1 = currH1.getAttribute("data-index")
    let id = currH1.getAttribute("id") + "-" + indexH2
    item.setAttribute("id", id)
    item.setAttribute("data-index",  indexH1 + "-" + indexH2.toString())
    item.innerText = (indexH2+1) + ". " + item.innerText
    nav[indexH1].h2[indexH2] = {
      "title": item.innerText,
      "href": "#" + id
    }
    indexH2++
  }

  navList.value = nav
}

useHead({
  title: details.value.title + " - oldme",
  meta: [
    {  name: "keywords", content: details.value.tags },
    {  name: "description", content: details.value.description }
  ]
})
</script>
