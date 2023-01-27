<template>
  <div class="menu">
    <div>
      <h1 class="main-title">
        热门文章
      </h1>
      <ul class="list-hot">
        <li :data-sort="i+1" v-for="(l, i) in list">{{ l.title }}</li>
      </ul>
    </div>

    <div class="mt1">
      <h1 class="main-title">
        近期文章
      </h1>
      <ul class="list-1">
        <li :data-sort="i+1" v-for="(l, i) in list">{{ l.title }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
  let list = ref([])
  for (let i = 0; i < 10; i++) {
    list.value.push({
      "title": "这是一个标题"
    })
  }
</script>
