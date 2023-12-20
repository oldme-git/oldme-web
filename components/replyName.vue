<template>
  <i class="reply-user-icon fa fa-user"></i>
  <a :href="site" v-if="site.length > 0">{{ name }}</a>
  <span v-else>{{ name }}</span>
  <span v-if="pName.length > 0">&nbsp;回复&nbsp;{{ pName }}</span>
</template>

<script setup>
const props = defineProps({
  name: String,
  site: String,
  pName: {
    type: String,
    default: ""
  }
})
</script>
