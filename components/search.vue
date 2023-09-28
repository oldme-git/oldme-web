<template>
  <div class="search">
    <input type="text" placeholder="请输入关键词搜索" v-model="searchText" @keyup.enter="search">
    <button class="btn" @click="search">
      <i class="fa fa-search"></i>
    </button>
  </div>
</template>

<script setup>
import {getQueryVariable} from "~/utils/func";

let searchText = ref("")
if (process.client) {
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
