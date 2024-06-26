<template>
  <div class="palette">
    <p class="text">
      主题色 <i class="fa fa-hand-o-right"></i>
    </p>
    <div class="uint" v-for="(item, index) of palette" @click="setTheme(index)">
      <div class="left" :style="{backgroundColor: item[0]}"></div>
      <div class="right" :style="{backgroundColor: item[1]}"></div>
    </div>
  </div>
</template>

<script setup>
import {palette, setTheme} from "~/utils/scheme";
</script>