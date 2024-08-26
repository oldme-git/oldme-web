<template>
  <div class="reply">
    <div class="reply-title">
      {{ replyData.total }}评论
    </div>

    <div class="reply-list">
      <div class="reply-box" v-for="item in replyData.list">
        <div class="box-title">
          <reply-name :name="item.name" :site="item.site"></reply-name>
        </div>
        <div class="box-content">
          {{ item.content }}
        </div>
        <div class="box-other">
          <a href="#replyForm" @click="replySub(item.id, item.name)">回复TA</a> {{ item.createdAt }}
        </div>

        <div class="sub-floor">
          <div class="reply-box" v-for="item2 in item.list">
            <div class="box-title">
              <reply-name :name="item2.name" :site="item2.site" :p-name="item2.pName"></reply-name>
            </div>
            <div class="box-content">
              {{ item2.content }}
            </div>
            <div class="box-other">
              <a href="#replyForm" @click="replySub(item2.id, item2.name)">回复TA</a> {{ item2.createdAt }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="reply-form mt1" id="replyForm">
      <p class="reply-form-title">
        <i class="fa fa-pencil-square-o c-slave"></i>
        {{ replyTitle }}
        <a href="javascript:" v-if="form.pid !== 0" @click="replySubCancel">取消回复</a>
      </p>
      <div class="tips">您的邮箱不会显示出来，*必填</div>
      <form action="#" class="form">
        <div class="form-item">
          <label>
            *评论
            <textarea v-model="form.content"></textarea>
          </label>
        </div>
        <div class="form-item">
          <label>
            *显示名称
            <input type="text" v-model="form.name">
          </label>
        </div>
        <div class="form-item">
          <label>
            *电子邮箱
            <input type="text" v-model="form.email">
          </label>
        </div>
        <div class="form-item">
          <label>
            网站地址
            <input type="text" v-model="form.site">
          </label>
        </div>
        <div class="form-item mt1">
          <button type="button" @click="submit()">发表评论</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import ReplyName from "~/components/replyName.vue"
import api from "~/utils/api";
import {message} from "~/utils/func";

const props = defineProps({
  id: String
})

const id = props.id
const replyTitle = ref("欢迎您的回复")
const replyData = ref([])
const form = ref({})

onMounted(() => {
  $fetch(api + "/app/article/reply/" + id, {
    method: "get"
  }).then((res) => {
    if (res.code === 0) {
      replyData.value = res.data
    } else {
      message(res.message)
    }
  })

  // 重置form
  resetForm()
})

// 重置回复form
function resetForm() {
  form.value = {
    aid: id,
    pid: 0,
    name: "",
    email: "",
    site: "",
    content: ""
  }
}

// 提交
function submit() {
  $fetch(api + "/app/reply", {
    method: "post",
    body: form.value
  }).then((res) => {
    if (res.code === 0) {
      message("感谢您的回复，审核后会在回复区显示")
      resetForm()
      replySubCancel()
    } else {
      message(res.message)
    }
  })
}

// 子回复
function replySub(id, name) {
  replyTitle.value = "回复给 " + name
  form.value.pid = id
}

// 取消子回复
function replySubCancel() {
  form.value.pid = 0
  replyTitle.value = "欢迎您的回复"
}
</script>