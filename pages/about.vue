<template>
  <div>
    这是一个{{ pageName }}
    <NuxtLink to="/">index</NuxtLink>
    <NuxtLink to="about">about</NuxtLink>
    <p v-for="v in list">{{ v.title }}</p>
  </div>
</template>
<script setup>
let { data:res } = await useFetch("http://api.oldmedev.top/admin/v1/article/list", {
  headers: {
    "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6MSwiVXNlcm5hbWUiOiJhZG1pbiIsImV4cCI6MTY3Mzc4NjY3MH0.HdfSKJS45v9ELRQYmzUjna4MIkKjmJx70hBy46I__84"
  }
})
let list = []
if (res.value.code !== 0) {
  console.log(res.value.message)
} else {
  list = res.value.data.list
}
</script>

