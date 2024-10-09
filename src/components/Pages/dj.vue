<script setup lang='ts'>
import { getDj } from '@/api/test'
const list = ref([])
const getDjData = async () => {
  const res = await getDj()
  console.log(res)
  list.value = res.data.djRadios
}
onMounted(() => {
  getDjData()
})
const playCount = (count) => {
  if (count > 10000) {
    return count%10000 + '万'
  } else{
    return count+'万'
  }
}
</script>

<template>
<div class="container">
<span>热门电台</span>
<div class="dj" v-for="item in list">
<div class="dj-img" :style="{backgroundImage: `url(${item.picUrl})`}"></div>
<div class="dj-desc">
  <div class="dj-desc-tag">{{item.category
}}| {{ item.name }}</div>
  <div class="dj-desc-title">{{item.rcmdtext}}</div>
  <div class="dj-desc-count">{{playCount(item.
playCount)}}</div>
</div>
</div>
</div>
</template>

<style scoped lang="scss">
.container{
  position: absolute;
  top:50Px;
  bottom:0;
  left: 0;
  right: 0;
  background-color: aqua;
  overflow-y: auto;
  padding: 15Px 9Px 0 9Px;
  font-size: 21Px;
  .dj{
    margin-top:25Px;
    height: 111Px;
    background-color: antiquewhite;
    border-radius: 11Px;
    display: flex;
    align-items: center;
    padding: 0 15Px;
    &-img{
      background-color: blueviolet;
      height: 70Px;
      width: 70Px;
      background-size: cover;
    }
    &-desc{
      background-color: aqua;
      height: 70Px;
      width: 80%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin-left: 15Px;
      &-tag{
        font-size: 13Px;
        padding-bottom: 3Px;
      }
      &-title{
        font-size: 16Px;
      }
      &-count{
        font-size: 11Px;
      }
    }
  }
}
</style>