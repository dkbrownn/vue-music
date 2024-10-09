<script setup>
import Music from './conponents/music.vue'
import Songs from './conponents/songs.vue'
import Singer from './conponents/singer.vue'
import User from './conponents/user.vue'
const tab = ref(0)
const tabActive = (index) => {
  tab.value = index
}
const list = ['单曲', '歌单', '歌手', '用户']
</script>

<template>
<div class="tabs">
  <div class="tab" v-for="(i, index) in list" @click="tabActive(index)" :class="{ active: index === tab }">{{i}}</div>
</div>
<div v-show="tab === 0">
  <Music/>
</div>
<div  v-show="tab === 1">
  <Songs/>
</div>
<div  v-show="tab === 2">
  <Singer/>
</div>
<div v-show="tab === 3">
  <User/>
</div>
</template>

<style scoped lang='scss'>
.tabs{
  display: flex;
  .tab{
    flex:1;
    text-align: center;
    font-size: 19Px;
    padding: 5Px 0;
  }
  .active{
    border-bottom: 3Px solid $color-sub-theme;
    background-color: $color-text-ll;
  }
}
</style>