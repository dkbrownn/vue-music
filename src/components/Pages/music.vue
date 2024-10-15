<script setup>
import { getTest, Test, Recommand, Login, getRecommandContent, getRecommandContent1 } from '@/api/test'
import pinyin from 'pinyin';
import { computed } from 'vue';
const list = ref([])
const recommandList = ref([])
const get = async () => {
  const res = await getTest(100)
  const res1 = await Test()
  const res2 = await Recommand()
  //const res3 = await getRecommandContent1()
  const res5 = await getRecommandContent()
  console.log(res, res1, res2)
  console.log(res5)
  const arr = pinyin("Wiz_h张子豪",{
    mode:"surname",
    style: 1
  })
  console.log(arr[0])
  list.value = res1.data.banners
  recommandList.value = res2.data.result
  console.log(list.value, recommandList.value)
}
onMounted(() => {
  get()
})
const loading = computed(() => {
  if (list.value.length !== 0 && recommandList.value.length !== 0) {
    return false
  } else {
    return true
  }
})
console.log(loading)
const loadingText = '正在拼命加载中'
</script>

<template>
  <div class="container">
    <div class="slider-wrapper" v-loading:[loadingText]="loading">
      <div class="slider-content">
        <Slider v-if="list.length" :banner="list"></Slider>
      </div>
    </div>
    <div class="middle">
      <span class="icon" >
        <span class="iconfont">&#xe604;</span>
      </span>
      <span class="icon" >
        <span class="iconfont">&#xe603;</span>
      </span>
      <span class="icon" >
        <span class="iconfont">&#xe605;</span>
      </span>
      <span class="icon">
         <span class="iconfont">&#xe606;</span>
      </span><span class="icon" >
         <span class="iconfont">&#xe69c;</span>
      </span>
    </div>
    <div class="title">
      <span>推荐歌单</span>
      <div class="right" @click="$router.push('/musiclists')">查看更多</div>
    </div>
    <div class="block-container">
      <SongBlock :list="recommandList.slice(0,16)" class="item"/>
    </div>
    
  </div>
</template>

<style scoped lang="scss">
.container{
  position: absolute;
  top: 50Px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
  padding: 5Px;
  background-color: #fff;
  color:#000;
  .middle{
    display: flex;
    align-items: center;
    height: 70Px;
    justify-content: space-around;
    .icon{
      display: flex;
      align-items: center;
      background-color: #f44336;
      border-radius: 50%;
      span {
        padding:9Px;
        color: #fff;;
        font-size: 25Px;
      }
    }
  }
  .title{
    height: 50Px;
    padding: 5Px 15Px;
    font-size: 19Px;
    display: flex;
    align-items: center;
    font-weight: 700;
    .right {
      font-size: 13Px;
      font-weight: 400;
      margin-left: auto;
      padding: 6Px 15Px;
      border: 1.5Px solid rgba(230, 230, 230, 0.5);
      border-radius: 25Px;
    }
  }
}
.slider-wrapper {
  height: 69px;
  margin:5px 9px;
  border-radius: 3px;
  overflow: hidden;
}
.block-container {
  display: grid;
  // grid-template-columns: 1fr 1fr 1fr;
  // grid-template-rows: 1fr 1fr 1fr;
  row-gap: 3Px;
  column-gap: 3Px;
  .item {
    place-self: center;
  }
}
@media screen and (max-width: 500Px) {
  .block-container {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
@media screen and (min-width: 500Px) {
  .block-container {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
</style>