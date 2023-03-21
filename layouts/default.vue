<template>
  <div class="layout">
    <div class="header">
      <div class="header-title">
        <NuxtLink class="title" to="/">oldme 博客</NuxtLink>
        <p>{{ saying }}</p>
      </div>
      <div class="menu" id="side-menu" @click="isOpen = !isOpen">
        <i class="fa fa-bars" id="side-i-open"></i>
        <i class="fa fa-close" id="side-i-close"></i>
      </div>
      <div class="lg-search">
        <Search />
      </div>
    </div>
    <div class="body" id="body">
      <div class="main main-close" id="main">
        <slot />
      </div>
      <div class="sidebar sidebar-close" id="sidebar">
        <Menu />
      </div>
    </div>
  </div>
</template>

<script setup>
import api from "../utils/api";
import * as side from "../utils/side";

let isOpen = ref(false)
let saying = ref()

let {data: d, error: err} = await useFetch(api + "/app/saying")
try {
  if (d.value.code !== 0) {
    console.log(d.value.message)
  } else {
    saying.value = d.value.data.Saying
  }
} catch (e) {
  console.log(e)
}
watch (isOpen, (status) => {
  if (status) {
    side.open()
  } else {
    side.close()
  }
})
</script>
