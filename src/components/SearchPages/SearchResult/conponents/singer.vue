<script setup>

</script>

<template>
<div class="container">
  <div class="lists" v-for="i in 9">
    <img >
      <div class="name">
        <div class="name-1">落雁</div>
        <div class="name-2">加入TA的粉丝团</div>
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
.lists{
    display: flex;
    align-items: center;
    padding: 5Px 3Px;
    img{
      height: 65Px;
      width: 65Px;
      border-radius: 9%;
      background-color: antiquewhite;
    }
    .name{
      flex:1;
      margin-left: 25Px;
      line-height: 25Px;
      color:white;
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
      border: 2Px solid $color-theme;
      color: $color-theme;
    }
  }
</style>