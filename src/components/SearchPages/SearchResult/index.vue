<script setup>
import Music from './conponents/music.vue'
import Songs from './conponents/songs.vue'
import Singer from './conponents/singer.vue'
import User from './conponents/user.vue'
import { debounce } from 'throttle-debounce'
const emit = defineEmits(['get-data'])
const tab = ref(0)
const tabActive = (index) => {
  tab.value = index
}
const list = ['单曲', '歌单', '歌手', '用户']
const debounceFunc = debounce(500, (tabVal) => {
  if (tabVal === 0){
    emit('get-data', 1 )
  }
  if (tabVal === 1) {
    emit('get-data', 1000 )
  }
  if (tabVal === 2) {
    emit('get-data', 100 )
  }
  if (tabVal === 3) {
    emit('get-data', 1002)
  }
})
watch(tab, (tabVal) => {
  debounceFunc(tabVal)
}, { immediate: true })

const onPullUp = () => {
  console.log('触发onPullUp')
}
</script>

<template>
<div class="tabs">
  <div class="tab" v-for="(i, index) in list" @click="tabActive(index)" :class="{ active: index === tab }">{{i}}
  <div class="animation"></div>
  </div>
</div>
<div v-show="tab === 0">
  <Music @pull-up="onPullUp"/>
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
    position: relative;
    flex:1;
    text-align: center;
    font-size: 19Px;
    padding: 5Px 0;
    z-index:100;
    color:#000;
  }
  .active{
    border-bottom: 3Px solid $color-sub-theme;
    .animation{
      position: absolute;
      top:0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(255, 255, 255, 0.3);
      animation: ripple .25s linear;
      z-index: -1;
    }
  }
}
@keyframes ripple {
  0% {
    opacity: 0;
    transform: scale(0);
  };
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>