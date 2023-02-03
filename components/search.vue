<template>
  <div class="search">
    <input type="text" placeholder="请输入关键词搜索" v-model="searchText" @keyup.enter="search">
    <button class="btn" @click="search">
      <i class="fa fa-search"></i>
    </button>
  </div>
</template>

<script setup>
import {navigateTo} from "nuxt/app";

let searchText = ref("")
if (process.client) {
  const getQueryVariable = (variable) => {
    let query = window.location.search.substring(1)
    let vars = query.split("&")
    for (let i = 0; i < vars.length; i++) {
      let pair = vars[i].split("=")
      if (pair[0] == variable) {
        return pair[1]
      }
    }
    return false
  }
  if (getQueryVariable("search")) {
    searchText.value = getQueryVariable("search")
  }
}

function search() {
  if (searchText.value) {
    window.location.href = "/?search=" + searchText.value
  } else {
    window.location.href = "/"
  }
}
</script>
