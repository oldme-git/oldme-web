<template>
  <div class="article">
    <h1 class="title">关于我</h1>
    <div class="head">
      <span class="author">
        <i class="fa fa-user-o"></i>
        half
      </span>
      <span class="create">
        <i class="fa-regular fa-clock"></i>
        2022-12-12 23:13:06
      </span>
    </div>
    <div class="content rich" v-html="html"></div>
  </div>
</template>

<script setup>
const html = `<h1>个人信息</h1>
<p>感谢您浏览本博客。本博客主要用来分享IT类知识，也顺便记录我自己的学习历程。如果恰好你看到某一篇博客并因此而有所获益，那可就太棒了！限于本人才疏智浅，文章中难免存在谬误，也请你联系我帮助我补偏救弊吧！谢谢~联系方式：tyyn1022@163.com。</p>
<p>本人是南京一个微不足道的程序员，喜欢乒乓球、科学、文学与音乐，兴趣爱好比较广泛，什么新奇古怪的东西都喜欢尝试。另外，我在生活工作是一个比较活泼的人，哈哈，我身边的人都还是觉得我很开朗的。我还有一个特别酷的偶像，她的名字叫中岛美雪，是一位日本歌手！另外，我也喜欢Beyond、刀郎、老鹰乐队的歌。是一个十足的音乐发烧友。</p>
<p><img class="tinymce-rich-img" style="display: block; margin-left: auto; margin-right: auto;" src="http://api.oldme.top/static/rich/202303/cqxqbag57uwx3dxal5.jpg" width="800" /></p>`
</script>
