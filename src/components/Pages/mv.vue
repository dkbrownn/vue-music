<script setup>
import { getMv } from '@/api/test'
const list = ref([])
const getMvData = async () => {
  const res = await getMv()
  console.log(res)
}
onMounted(() => {
  getMvData()
})
</script>

<template>
<div class="container">
<span>最新MV</span>
<div class="grid">
  <div class="grid-mv"></div>
</div>
<span>推荐MV</span>
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