<template>
  <div>
    这是一个{{ pageName }}
    <NuxtLink to="/">index</NuxtLink>
    <NuxtLink to="about">about</NuxtLink>
    <p v-for="v in list">{{ v.title }}</p>
  </div>
</template>

<script setup>
let pageName = "about"

let { data:d, error:err } = await useFetch("http://api.oldmedev.top/admin/v1/article/list", {
  headers: {
    "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6MSwiVXNlcm5hbWUiOiJhZG1pbiIsImV4cCI6MTY3Mzg1NDIxNX0.3tKy9zoA5QGPeMeSf-ozxV5rVFauAx_-MIQFcqRl4Zw"
  }
})

try {
  if (err.value.statusCode === 200) {
    let list = []
    if (d.value.code !== 0) {
      console.log(d.value.message)
    } else {
      list = d.value.data.list
    }
  }
} catch (e) {
  console.log(e)
}
</script>
