<script setup>
const list = inject('searchResult-singer')
</script>

<template>
<div class="container" >
  <div class="lists" v-for="i in list">
    <img :src="i.picUrl">
    <div class="right">
      <div class="name">
        <div class="name-1">{{i.name}}</div>
        <div class="name-2">{{i.fansGroup?.text}}</div>
      </div>
      <div class="follow">
        + 关注
      </div>
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
  background-color: #fff;
}
.lists{
    display: flex;
    padding: 5Px 3Px;
    img{
      height: 50Px;
      width: 50Px;
      border-radius: 50%;
      object-fit: cover;
    }
    .right{
      width: 100%;
      display: flex;
      align-items: center;
      border-bottom: 1Px solid rgba(0,0,0,.1);
    }
    .name{
      flex:1;
      margin-left: 25Px;
      line-height: 25Px;
      color: #000;;
      font-size: 17Px;
      &-1{
        padding: 5Px 0;
      }
      &-2{
        font-size: 15Px;
        color: rgb(2, 132 ,199)
      }
    }
    .follow{
      font-size: 13Px;
      padding: 5PX 9Px;
      border-radius: 15Px;
      border: 1.5Px solid $color-theme;
      color: $color-theme;
    }
  }
</style>