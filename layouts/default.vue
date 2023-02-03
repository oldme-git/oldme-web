<template>
  <div class="layout">
    <div class="header">
      <div class="header-title">
        <NuxtLink class="title" to="/">oldme 博客</NuxtLink>
        <p>{{ saying }}</p>
      </div>
      <div class="menu" @click="isOpen = !isOpen">
        <i class="fa fa-bars" v-if="!isOpen"></i>
        <i class="fa fa-close" v-if="isOpen"></i>
      </div>
      <div class="lg-search">
        <Search />
      </div>
    </div>
    <div class="body" id="body">
      <div class="main" :class="{'main-open': isOpen, 'main-close': !isOpen}">
        <slot />
      </div>
      <div class="sidebar" id="sidebar" :class="{'sidebar-open': isOpen, 'sidebar-close': !isOpen}">
        <Menu />
      </div>
    </div>
  </div>
</template>

<script setup>
import api from "../utils/api";

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
    document.getElementById("__nuxt").style.overflowX = "auto"
    document.getElementById("body").style.height = "92rem"
  } else {
    document.getElementById("__nuxt").style.overflowX = "hidden"
    document.getElementById("body").style.height = "auto"
  }
})
</script>
