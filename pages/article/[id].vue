<template>
  <div class="article">
    <h1 class="title">{{ details.title }}</h1>
    <div class="head">
      <span class="author">
        <i class="fa fa-user-o"></i>
        {{ details.author }}
      </span>
      <span class="create">
        <i class="fa fa-clock-o"></i>
        {{ details.createdAt }}
      </span>
    </div>
    <p class="description">
      {{ details.description }}
    </p>
    <div class="content">
      {{ details.content }}
    </div>
  </div>
</template>

<script setup>
  import {useRoute} from "nuxt/app";
  const route = useRoute()
  const id = route.params.id
  const details = {
    "title": "这是一个标题",
    "author": "half",
    "description": "教你写个hello world教你写个hello world教你写个hello world教你写个hello world",
    "content": "我是内容",
    "createdAt": "2023-02-01"
  }
</script>
