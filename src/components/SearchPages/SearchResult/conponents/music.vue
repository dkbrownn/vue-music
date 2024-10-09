<script setup>

</script>

<template>
<div class="container">
  <div class="song-music">
    <div class="song-music-bar">
      <span class="play iconfont">&#xe609;</span>
      <span class="text">播放全部</span>
    </div>
    <div class="song-music-content" v-for="i in 9">
      <div class="text">
        <div class="song-name">罗生门</div>
        <div class="ar-info">张子豪</div>
      </div>
      <span class="iconfont mv">&#xe85a;</span>
      <span class="iconfont more" >&#xe747;</span>
    </div>
  </div>
</div>
</template>

<style scoped lang='scss'>
.container{
  position: absolute;
  top:50Px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-x: auto;
  padding: 0 15Px;
}
.song-music{
  background-color: rgba(150, 121, 219,.5);
  &-bar{
    height: 61Px;
    display: flex;
    align-items: center;
    z-index: 1;
    position: relative;
    border-bottom: 1Px solid $color-text-d;
    span{
      font-size:15Px;
      margin: 0 9Px;
    }
    .play{
      font-size: 21Px;
      color: $color-theme;
    }
    .download{
      margin-left: auto;
    }
    .list{
      font-size: 21Px;
    }
  }
  &-content{
    height: 59Px;
    display: flex;
    align-items: center;
    border-bottom: 1Px solid $color-text-d;
    span{
      font-size: 19Px;
      padding: 9Px;
      color:$color-text-ll;
    }
    .text{
      padding: 9Px;
      color:$color-text-ll;
      .song-name{
        font-size: 17Px;
      }
      .ar-info{
        font-size: 13Px;
        padding-top:3Px;
      }
    }
    .mv{
      margin-left: auto;
    }
  }
}
</style>