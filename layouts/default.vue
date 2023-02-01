<template>
  <div class="layout">
    <div class="header">
      <div class="header-title">
        <NuxtLink class="title" to="/">oldme 博客</NuxtLink>
        <p>春天有油菜花开 秋天则有桔梗盛放</p>
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
  import {navigateTo} from "nuxt/app";

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
