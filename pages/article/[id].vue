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
    <div class="reply">
      <div class="reply-title">
        {{ replyData.total }}评论
      </div>

      <div class="reply-list">
        <div class="reply-box" v-for="item in replyData.list">
          <div class="box-title">
            <reply-name :name="item.name" :site="item.site"></reply-name>
          </div>
          <div class="box-content">
            {{ item.content }}
          </div>
          <div class="box-other">
            <a href="#replyForm" @click="replySub(item.id, item.name)">回复TA</a> {{ item.createdAt }}
          </div>

          <div class="sub-floor">
            <div class="reply-box" v-for="item2 in item.list">
              <div class="box-title">
                <reply-name :name="item2.name" :site="item2.site" :p-name="item2.pName"></reply-name>
              </div>
              <div class="box-content">
                {{ item2.content }}
              </div>
              <div class="box-other">
                <a href="#replyForm" @click="replySub(item2.id, item2.name)">回复TA</a> {{ item2.createdAt }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="reply-form mt1" id="replyForm">
        <p class="reply-form-title">
          <i class="fa-solid fa-pen-nib c-slave"></i>
          {{ replyTitle }}
          <a href="javascript:" v-if="form.pid !== 0" @click="replySubCancel">取消回复</a>
        </p>
        <div class="tips">您的邮箱不会显示出来，*必填</div>
        <form action="#" class="form">
          <div class="form-item">
            <label>
              *评论
              <textarea v-model="form.content"></textarea>
            </label>
          </div>
          <div class="form-item">
            <label>
              *显示名称
              <input type="text" v-model="form.name">
            </label>
          </div>
          <div class="form-item">
            <label>
              *电子邮箱
              <input type="text" v-model="form.email">
            </label>
          </div>
          <div class="form-item">
            <label>
              网站地址
              <input type="text" v-model="form.site">
            </label>
          </div>
          <div class="form-item mt1">
            <button type="button" @click="submit()">发表评论</button>
          </div>
        </form>
      </div>
    </div>
    <div ref="toc">
      <p class="main-title bg-slave c-main">
        本文目录
      </p>
      <div class="list-hoc">
        <div class="h2" v-for="item of navList">
          <span :data-title="item.h2.href" @click="side.close($event)">
            {{ item.h2.title }}
          </span>
          <div class="h3" v-for="item2 of item.h3">
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
import {arabToChinese, message} from "~/utils/func";
import * as side from "../../utils/side";
import ReplyName from "~/components/replyName.vue";

const route = useRoute()
const id = route.params.id

let details = ref()
const navList = ref([])
const rich = ref()
const toc = ref()
const tocRect = ref()

const replyTitle = ref("欢迎您的回复")
const replyData = ref([])
const form = ref({})

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
    {name: "keywords", content: details.value.tags},
    {name: "description", content: details.value.description}
  ]
})

onMounted(() => {
  $fetch(api + "/app/article/hist/", {
    method: "post",
    body: {
      id
    }
  })
  $fetch(api + "/app/article/reply/" + id, {
    method: "get"
  }).then((res) => {
    if (res.code === 0) {
      replyData.value = res.data
    } else {
      message(res.message)
    }
  })

  // 操作rich
  handelRich(rich.value)
  // 挂载目录
  mountToc()

  // 获取side-toc的Rect信息
  tocRect.value = toc.value.getBoundingClientRect()

  // 重置form
  resetForm()
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

// 重置回复form
function resetForm() {
  form.value = {
    aid: id,
    pid: 0,
    name: "",
    email: "",
    site: "",
    content: ""
  }
}

function handelRich(richDom) {
  // 判断该文章是否存在，不存在跳转至404
  if (details.value.id === undefined) {
    window.location.href = "/404"
  }
  // 点击图片可以查看大图片
  // 给图片加上alt
  const img = richDom.getElementsByTagName("img")
  for (let i of img) {
    i.addEventListener("click", () => {
      let src = i.getAttribute("src")
      window.open(src)
    })
    i.setAttribute("alt", details.value.title)
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
    item.innerText = arabToChinese(indexH2 + 1) + "、" + item.innerText
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
    item.setAttribute("data-index", indexH2 + "-" + indexH3.toString())
    // 为h3:after做bg-slave
    item.innerText = (indexH3 + 1) + ". " + item.innerText
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

// 提交
function submit() {
  $fetch(api + "/app/reply", {
    method: "post",
    body: form.value
  }).then((res) => {
    if (res.code === 0) {
      message("感谢您的回复，审核后会在回复区显示")
      resetForm()
      replySubCancel()
    } else {
      message(res.message)
    }
  })
}

// 子回复
function replySub(id, name) {
  replyTitle.value = "回复给 " + name
  form.value.pid = id
}

// 取消子回复
function replySubCancel() {
  form.value.pid = 0
  replyTitle.value = "欢迎您的回复"
}
</script>
