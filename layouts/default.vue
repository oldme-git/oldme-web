<template>
  <div class="layout">
    <div class="header">
      <div class="header-title">
        <h1>oldme 博客</h1>
        <p>春天有油菜花开 秋天则有桔梗盛放</p>
      </div>
<!--      <button @click="isOpen = true">点击</button>-->
      <div class="menu" @click="isOpen = !isOpen">
        <i class="fa fa-bars" v-if="!isOpen"></i>
        <i class="fa fa-close" v-if="isOpen"></i>
      </div>
<!--      <div class="search">-->
<!--        <input type="text" placeholder="请输入关键词搜索">-->
<!--        <i class="fa fa-search"></i>-->
<!--      </div>-->
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
  let isOpen = ref(false)

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
