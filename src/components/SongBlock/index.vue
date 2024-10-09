<script setup>
defineProps({
  list:Array
})
const conversionNumber = (number) => {
  if (number > 10000 ) {
    return number%10000+'万'
  }
  else {
    return number
  }
}
</script>

<template>
<div class="block-container" v-for="item in list">
  <RouterLink :to="`/songdetail/${item.id}`">
    <div class="block" :style="{'background-image': `url(${item.picUrl})`}">
      <div class="iconfont listen">&#xe693; {{conversionNumber(item.playCount)}}</div>
      <span class="iconfont play">&#xe628;</span>
    </div>
  </RouterLink>
  <div class="text">{{item.name}}</div>
</div>
</template>

<style scoped lang="scss">
.block-container{
  display: inline-block;
  margin-right:3Px;
   vertical-align:top;
  .block{
    height:100Px;
    width:100Px;
    background-color: $color-highlight-background;
    position: relative;
    border-radius: 9%;
    background-size:cover;
    /* background-image: url("https://p1.music.126.net/wdKjMvO2A7XTbti5wDqtpg==/109951166784247177.jpg"); */
    .listen{
      font-size: 11Px;
      padding: 11Px 0 0 7Px;
    }
    .play{
      position: absolute;
      right:6Px;
      bottom: 6Px;
      font-size: 22Px;
    }
  }
  .text{
    width: 100Px;
    font-size: 15Px;
    padding-top: 6Px;
  }
}

</style>