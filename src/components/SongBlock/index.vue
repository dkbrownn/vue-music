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
    </div>
  </RouterLink>
  <div class="text">{{item.name}}</div>
</div>
</template>

<style scoped lang="scss">
.block-container{
  display: inline-block;
  vertical-align:top;
  color:#000;
  padding:5Px 5Px;
  place-self: center;
  .block{
    width:91%;
    aspect-ratio: 1 / 1;
    margin:0 auto;
    background-color: $color-highlight-background;
    position: relative;
    border-radius: 9%;
    background-size:cover;
    .listen{
      font-size: 5px;
      padding: 7Px 0 0 7Px;
      color: #100f0f;
    }
  }
  .text{
    width: 91%;
    font-size: 6.5px;
    padding-top: 6Px;
    overflow: hidden;
    margin: 0 auto;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}

</style>