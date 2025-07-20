<template>
  <div class="article bg-main">
    <h1 class="title">读书日记</h1>
    <div class="head mb2">
      <span>
        读书原为修身，正己才能正人正世；不修身不正己而去正人正世者，无一不是盗名欺世。
      </span>
    </div>
    <div class="reading mt1">
      <table class="table">
        <tr>
          <th>书名</th>
          <th>作者</th>
          <th>状态</th>
          <th>完结时间</th>
        </tr>
        <tr v-for="item in list">
          <td>{{ item.name }}</td>
          <td>{{ item.author }}</td>
          <td :class="[{'giveup': item.status === 1},{'finished': item.status === 2}]">
            {{ statusText(item.status) }}
          </td>
          <td>{{ dateText(item.finished_at) }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script setup>
import api from "../utils/api";

const list = ref([])
const {data: dReading, error: errHot} = await useFetch(api + "/app/reading")

try {
  if (dReading.value.code !== 0) {
    console.log(dReading.value.message)
  } else {
    let dataList = dReading.value.data.list
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

function statusText(status) {
  switch (status) {
    case 1:
      return "弃读"
    case 2:
      return "正常完结"
    case 3:
      return "粗读完结"
    case 4:
      return "网文完结"
    case 8:
      return "特殊书类"
    case 9:
      return "在读"
  }
}

function dateText(date) {
  if (date === "") {
    return "-"
  }
  return date
}
</script>
