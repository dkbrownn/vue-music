<script setup>
import useSlider from './useSlider.js'
defineProps({
  banner:{
    type: Array,
    default: []
  }
})
const rootRef = ref(null)
const { currentPageIndex } = useSlider(rootRef) 
</script>

<template>
<div class="slider" ref="rootRef">
  <div class="slider-group">
    <div class="slider-page" v-for="item in banner" :key="item.bannerId">
      <img :src="item.pic" class="slider-group-img">
    </div>
    <!-- <div class="slider-page">
      <img src="http://p1.music.126.net/L2hswBgdpqYSmXSJcz4Gag==/109951169664462858.jpg" class="slider-group-img">
    </div>
    <div class="slider-page">
      <img src="http://p1.music.126.net/L2hswBgdpqYSmXSJcz4Gag==/109951169664462858.jpg" class="slider-group-img">
    </div>
    <div class="slider-page">
      <img src="http://p1.music.126.net/L2hswBgdpqYSmXSJcz4Gag==/109951169664462858.jpg" class="slider-group-img">
    </div> -->
  </div>
  <div class="dot-group">
    <span class="dot" v-for="(item, index) in banner" :key="item.banneId" :class="{ active: currentPageIndex === index }"></span>
  </div>
</div>
</template>

<style scoped lang="scss">
.slider{
  position: relative;
  &-group{
    height: 69px;
    border-radius: 3px;
    display: flex;
    overflow: hidden;
    .slider-page{
      height:inherit;
      width:inherit;
      display: inline-block;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
    }
    &-img{
      height:inherit;
      width:inherit;
    }
  }
  .dot-group{
    position: absolute;
    bottom: 3px;
    left:50%;
    transform: translateX(-50%);
    .dot{
      display: inline-block;
      height: 3px;
      width: 3px;
      border-radius: 50%;
      background-color: azure;
      margin:0 3px;
    }
    .active{
      width: 9px;
      border-radius: 2px;
    }
  }
}
</style>