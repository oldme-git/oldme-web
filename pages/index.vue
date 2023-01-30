<template>
  <div>
    <ul class="list-2">
      <li v-for="l in list">
        <div class="left">
          <img :src="l.thumb" alt="">
        </div>
        <div class="right">
          <h2 class="title">{{ l.title }}</h2>
          <p class="description">{{ l.description }}</p>
          <p class="time">{{ l.created_time }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
  let list = ref([])
  for (let i = 0; i < 10; i++) {
    list.value.push({
      "title": "这是一个标题",
      "created_time": "2023-1-27 21:40:06",
      "thumb": "https://cjunn.gitee.io/blog_theme_atum/style1/img/pageItem/page-item-2.jpg",
      "description": "这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介这是简介"
    })
  }
</script>
