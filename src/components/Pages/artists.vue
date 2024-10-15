<script setup>
import { sortSinger } from '@/utils/getSingerList'
import useFixed from '@/assets/js/fixedBar';
import useShortcut from '@/assets/js/sidebar';
const singerList = ref([])
const getlist = async () => {
  const { list } = await sortSinger()
  singerList.value = list
  console.log(singerList)
} 
// /* const { groupRef } = useFixed() */
// const height = ref(null)
// const getChildren = () => {
//   console.log('1')
//   const heightAll = ref([])
//    heightAll.value = height.value.children
//    console.log(height.value.children.length)
//   /* for(let i = 0; i<heightAll.value.length; i++) {
//     console.log(heightAll[i])
//     console.log('111')
//   } */
// }
onMounted(() => {
  getlist()
}) 
const loading = computed(() => {
  return singerList.value.length == 0
})
const loadingText = '加载中...'
  
  

const { groupRef, onScroll, fixedTitle, currentIndex, show } = useFixed(singerList) 

const { shortcutList, onTouchStart, scrollRef, onTouchMove, } = useShortcut(singerList, groupRef)
</script>

<template>
  <div class="container" v-loading:[loadingText]="loading" ref="height">
    <div class="fix-key" :style="{opacity: show}">{{ fixedTitle }}</div>
    <Scroll class="scroll" :probe-type="3" @scroll="onScroll" ref="scrollRef">
      <div ref="groupRef">
        <div class="A-area" v-for="(item, key, index) in singerList">
          <div class="key">{{key}}</div>
          <div class="lists" v-for="i in item" @click="$router.push(`/singerdetail/${i.id}`)">
            <img v-lazy="i.img1v1Url" >
            <div class="name">{{i.name}}</div>
          </div>
        </div>
      </div>
    </Scroll>
    <div class="sidebar" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
      <li v-for="(item, key, index) in singerList" :data-set="index" :class="{'active': index === currentIndex}"
      >{{key}}</li>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container{
  position: absolute;
  top:50Px;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 25Px;
  .fix-key {
    position: fixed;
    top:50Px;
    left: 25Px;
    right: 25Px;
    height: 30Px;
    background-color: rgb(203 213 225);
    padding:2px 13Px;
    color:rgba(0, 0, 0, 1);
    border-bottom-left-radius: 13Px;
    border-bottom-right-radius: 13Px;
    font-size: 21Px;
    z-index:500;
  }
  .scroll {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
.active{
  color:$color-sub-theme;
}
.A-area{
  .key{
    background-color: rgb(203 213 225);
    padding:2px 13Px;
    color:rgba(0, 0, 0, 1);
    border-bottom-left-radius: 13Px;
    border-bottom-right-radius: 13Px;
    font-size: 21Px;
  }
  .lists{
    display: flex;
    align-items: center;
    padding: 6Px 3Px;
    img{
      height: 25px;
      width: 25px;
      border-radius: 50%;
    }
    .name{
      flex:1;
      margin-left: 15Px;
      line-height: 55Px;
      color:rgb(0, 0, 0);
      border-bottom: 1Px solid rgb(73, 71, 71, .3);
      font-size: 7.7px;
    }
  }
}
.sidebar{
  position: fixed;
  right:5Px;
  top: 50%;
  transform: translateY(-50%);
  width: 21Px;
  background-color: rgb(203 213 225);
  color:rgba(0,0,0,.5);
  border-radius: 6Px;
  text-align: center;
  padding: 13Px 0;
  li{
    font-size: 7px;
    font-weight: 500;
    padding: 5Px 0;
  }
}

</style>