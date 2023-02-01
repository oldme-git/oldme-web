<template>
  <div id="article-list">
    <ul class="list-2">
      <li v-for="l in list">
        <NuxtLink :to="'/article/' + l.id">
          <div class="left">
            <img :src="l.thumb" alt="">
          </div>
          <div class="right">
            <h2 class="title">{{ l.title }}</h2>
            <p class="description">描述： {{ l.description }}</p>
            <p class="time"><i class="fa fa-clock-o"></i> {{ l.created_time }}</p>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
  import {navigateTo} from "nuxt/app";

  let list = ref([])
  for (let i = 0; i < 15; i++) {
    list.value.push({
      "id": i,
      "title": "这是一个标题这是一个标题这是一个标题这是一个标题这是一个标题这是一个标题这是一个标题这是一个标题这是一个标题",
      "created_time": "2023-1-27 21:40:06",
      "thumb": "https://cjunn.gitee.io/blog_theme_atum/style1/img/pageItem/page-item-25.jpg",
      "description": "这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介"
    })
  }
  onMounted(() => {
    window.addEventListener("scroll", () => {
      // 已经滚动的高度
      let scroll = document.documentElement.scrollTop || document.body.scrollTop
      let top = window.screen.height + scroll
      // body高度
      let bodyH = document.body.clientHeight
      if (top + 500 > bodyH) {
        for (let i = 0; i < 15; i++) {
          list.value.push({
            "title": "这是一个标题这是一个标题这是一个标题这是一个标题这是一个标题这是一个标题这是一个标题这是一个标题这是一个标题",
            "created_time": "2023-1-27 21:40:06",
            "thumb": "https://cjunn.gitee.io/blog_theme_atum/style1/img/pageItem/page-item-25.jpg",
            "description": "这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介"
          })
        }
      }
    })
  })
  function goArticle(id) {
    navigateTo("/article/" + id)
  }
</script>
