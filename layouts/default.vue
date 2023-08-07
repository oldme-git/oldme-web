<template>
  <div class="layout">
    <div class="header bg-slave">
      <div class="header-title">
        <a class="title c-main" href="/">oldme 博客</a>
        <p class="c-main saying">{{ saying }}</p>
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
      <div class="sidebar sidebar-close bg-main" id="sidebar">
        <Menu />
      </div>
    </div>
  </div>
</template>

<script setup>
import api from "../utils/api";
import * as side from "../utils/side";
import scheme from "~/utils/scheme";

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
onMounted(() => {
  scheme()
})
</script>
