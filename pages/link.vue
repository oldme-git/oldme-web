<template>
  <div class="article bg-main">
    <h1 class="title">友情链接</h1>
    <div class="link mt1">
      <table class="table">
        <tr>
          <th>名称</th>
          <th>描述</th>
        </tr>
        <tr v-for="item in list">
          <td>
            <a class="link-title" :href="item.link">{{ item.name }}</a>
          </td>
          <td>{{ item.description }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script setup>
import api from "../utils/api";

const list = ref([])
const {data: dLink, error: errHot} = await useFetch(api + "/app/link", {
  query: {
    basis: 1
  }
})

try {
  if (dLink.value.code !== 0) {
    console.log(dLink.value.message)
  } else {
    let dataList = dLink.value.data.list
    let len = dataList.length
    if (len > 0) {
      for (let i = 0; i < dataList.length; i++) {
        list.value.push(dataList[i])
      }
    }
  }
} catch (e) {
  console.log(e)
}

</script>
