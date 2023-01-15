<template>
  <div>
    这是一个{{ pageName }}
    <NuxtLink to="/">index</NuxtLink>
    <NuxtLink to="about">about</NuxtLink>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageName: "index"
    }
  }
}
</script>
