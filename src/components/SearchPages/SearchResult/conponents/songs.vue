<script setup>
const list = inject('searchResult-SongList')
</script>

<template>
<div class="container">
  <div class="lists" v-for="i in list">
    <img :src="i.coverImgUrl">
      <div class="name">
        <div class="name-1">{{i.name}}</div>
        <div class="name-2">
          <span>{{ i.trackCount }}首</span>
          ,by<span>{{ i.creator.nickname }}</span>
          <span>,播放{{ i.playCount }}次</span>
        </div>
        <div class="name-3">{{i.recommendText}}</div>
      </div>
    </div>
</div>
</template>

<style scoped lang='scss'>
.container{
  position: absolute;
  top:39Px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-x: auto;
  padding: 0 15Px;
  background-color:#fff;
  color:#000;
}
.lists{
    display: flex;
    align-items: center;
    padding: 5Px 3Px;
    img{
      height: 65Px;
      width: 65Px;
      border-radius: 9%;
      object-fit: cover;
    }
    .name{
      flex:1;
      margin-left: 25Px;
      line-height: 25Px;
      font-size: 14Px;
      &-1{
        padding: 5Px 0;
        font-size: 16Px;
      }
      &-2{
        color:rgba(0,0,0,.6);
      }
      &-3{
        font-size: 13Px;
        color: rgb(2, 132 ,199)
      }
    }
  }
</style>