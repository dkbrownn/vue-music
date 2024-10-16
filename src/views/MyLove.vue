<script setup>
import { usePlayStateStore } from '@/store/playerState'
const store = usePlayStateStore()

//toast逻辑
const showToast = ref(false)
const info = ref({})
const addToPlayList = (obj) => {
  showToast.value = true
  info.value = obj
}

//处理顶部栏
const songRef = ref(null)
const opacity = ref(0)
const scrollY = ref(0)
function onScroll (pos) {
  scrollY.value = pos.y
  console.log(pos)
}
watch(scrollY, (newY) => {
  console.log(newY)
  if (newY < -36) {
    opacity.value = 1
  }
  else {
    opacity.value = 0
  }
})
</script>

<template>
<div class="wrapper">
  <div class="top-bar">
    <div class="background" :style="{ opacity}"></div>
      <span class="iconfont back" @click="$router.back">&#xe612;</span>
      <span class="song-text">我的喜欢</span>
  </div>
  <Scroll class="scroll" @scroll="onScroll" :probe-type="3"><div class="scroll-wrapper">
  <div class="song-music" ref="songRef">
    <div class="song-music-bar" ref="songBar">
      <span class="play iconfont">&#xe609;</span>
      <span class="text">播放全部</span>
      <!-- <span class="list iconfont" >&#xe62d;</span> -->
    </div>
    <div class="song-music-content" v-for="(item, index) in store.state.favariteList" @click="store.selectPlay(store.state.favariteList, index)">
      <div class="text">
        <div class="song-name">{{item.name}}</div>
        <div class="ar-info">
          <span class="fee" v-show="item.fee === 1">VIP</span>
          {{item.ar[0].name}} {{item.al?.name}}</div>
          <div class="award" v-show="item.awardName">{{ item.awardName }}</div>
      </div>
      <span class="iconfont mv">&#xe645;</span>
      <span class="iconfont more" @click.stop="addToPlayList(
      {songName:item.name,arName:item.ar[0].name,img:item.al.picUrl,allInfo: item})">&#xe747;</span>
    </div>
  </div>
</div></Scroll>
  <Toast :info="info" :show="showToast" @change="() => showToast = false"/>
</div>
</template>

<style scoped lang='scss'>
.wrapper{
  position: absolute;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
  .scroll {
    width: 100%;
    height: 100%;
    &-wrapper {
      position: relative;
      padding: 3Px 15Px;
    }
  }
  .top-bar{
    display: flex;
    align-items: center;
    padding: 15Px 6Px 9Px 6Px;
    position: relative;
    z-index: 1;
    color:#000;
    .background {
      position: absolute;
      left: 0;
      top:0;
      right: 0;
      bottom: 0;
      background-color: #fff;
      z-index:-1;
      opacity: 1;
      transition: all .5s;
    }
    .song-text{
      margin-right: auto;
      font-size: 17Px;
      padding-left: 15Px;
    }
    .iconfont{
      font-size:21Px;
      padding: 0 13Px;
    }
    .back{
      font-weight: 600;
    }
  }
  .song-music{
    &-bar{
      height: 50Px;
      display: flex;
      align-items: center;
      z-index: 1;
      position: relative;
      color:#000;
      border-bottom: 1Px solid rgb(185, 185, 185,.5);
      span{
        font-size:17Px;
        margin: 0 15Px 0 0;
      }
      .play{
        font-size: 25Px;
        color: $color-theme;
      }
      .list{
        margin-left: auto;
        font-size: 25Px;
      }
    }
    &-content{
      padding: 6Px;
      display: flex;
      align-items: center;
      border-bottom: 1Px solid rgb(185, 185, 185,.5);
      span{
        font-size: 25Px;
        padding: 9Px;
        color:#000;
      }
      .index{
        font-size: 15Px;
        color:rgba(0,0,0,.5)
      }
      .text{
        padding: 0Px 1Px;
        color:rgba(0,0,0,.9);
        .song-name{
          font-size: 15.5Px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        .ar-info{
          font-size: 13Px;
          padding-top:7Px;
          color:rgba(0,0,0,.7);
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          .fee {
              font-size: 10Px;
              padding: 0 2.5Px;
              border-radius: 5Px;
              border:1Px solid $color-theme;
              color:$color-theme;
          }
        }
      }
      .mv{
        margin-left: auto;
        color:rgba(0,0,0,.3);
        font-weight: 500;
        font-size: 23Px;
      }
      .more{
        color:rgba(0,0,0,.3);
        font-size: 23Px;
      }
    }
  }
}
</style>