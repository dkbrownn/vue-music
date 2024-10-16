<script setup>
import usePullUpLoad from '../../use-pull-up-load'
import { searchResult } from '@/api/test'
const result = inject('searchResult-song')

// const inputVal = inject('inputVal')
// console.log(inputVal)
// const emit = defineEmits(['pull-up'])
// const handelPull = () => {
//   emit('pull-up')
// }

// const hasMore = ref(true)
// const offset = ref(1)
// const { scroll, rootRef, isPullUpLoad } = usePullUpLoad(searchMore)

// const pullUpLoading = computed(() => {
//   return isPullUpLoad.value && hasMore.value
// })

// async function searchMore () {
//   if (!hasMore.value) {
//     return
//   } else {
//     offset.value++
//     const res = await searchResult({ keywords: inputVal.value, type :1, offset: offset.value })
//     hasMore.value = res.data.result.hasMore
//     resultSongs.value = res.data.result.songs
//   }
// }
</script>

<template>
<div class="container">
   <Scroll class="scroll">
    <div class="song-music"  ref="rootRef">
    
          <div class="song-music-bar">
            <span class="play iconfont">&#xe609;</span>
            <span class="text">播放全部</span>
          </div>
          <div class="song-music-content" v-for="i in result.songs">
            <div class="text">
              <div class="song-name">{{i.name}}</div>
              <div class="ar-info">{{i.artists?.[0].name}}</div>
            </div>
            <span class="iconfont mv">&#xe645;</span>
            <span class="iconfont more" >&#xe747;</span>
          </div>
    </div>
  </Scroll>
</div>
</template>

<style scoped lang='scss'>
.container{
  position: absolute;
  top:50Px;
  bottom: 0;
  left: 0;
  right: 0;
  .scroll {
    height: 100%;
    width: 100%;
  }
}
.song-music{
  background-color: #fff;
  padding: 3Px 9Px;
  color:rgba(0,0,0,.9);
  &-bar{
    height: 50Px;
    display: flex;
    align-items: center;
    z-index: 1;
    position: relative;
    border-bottom: 1Px solid $color-text-d;
    span{
      font-size:19Px;
      margin: 0 9Px;
    }
    .play{
      font-size: 25Px;
      color: $color-theme;
    }
  }
  &-content{
    padding: 6Px;
    display: flex;
    align-items: center;
    border-bottom: 1Px solid rgba(0,0,0,.1);
    span{
      font-size: 19Px;
      padding: 9Px;
      color:rgba(0,0,0,.5);
    }
    .text{
      padding: 0Px 1Px;
      color:rgba(0,0,0,.9);
      .song-name{
        font-size: 17Px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .ar-info{
        font-size: 15Px;
        padding-top:3Px;
        color:rgba(0,0,0,.7);
      }
    }
    .mv{
      margin-left: auto;
      font-weight: 500;
      font-size: 25Px;
    }
    .more {
      color:rgba(0,0,0,.5);
      font-size: 25Px;
    }
  }
}
</style>