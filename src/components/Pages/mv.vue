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
    <div class="his-play" @click="$router.push('/hislisten')">
      <span class="iconfont">&#xe8bd;</span>最近播放
    </div>
    <div class="my-love" @click="$router.push('/mylove')">
      <span class="iconfont">&#xe8bd;</span>我的喜欢
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
  overflow-y: auto;
  padding: 15Px 9Px 0 9Px;
  font-size: 21Px;
  color:#000;
  background-color: rgb(241 245 249);
  .iconfont {
    font-size: 17Px;
  }
  .his-play, .my-love{
    text-align: center;
    display: inline-block;
    width: 100Px;
    line-height: 40Px;
    font-size:15Px;
    background-color: #fff;
    padding: 0 15Px;
    border-radius: 17Px;
    color:rgba(0,0,0,.9);
    margin-right: 25Px;
    span{
      padding:0 15Px 0 0;
      color:rgba(0,0,0,.5);
    }
  }
}
</style>