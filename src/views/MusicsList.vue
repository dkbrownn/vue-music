<script setup>
import { Recommand } from '@/api/test';
const recommandList = ref([])
const getList = async () => {
  const res = await Recommand()
  recommandList.value = res.data.result
}
onMounted(() => {
  getList()
})
</script>

<template>
<div class="top">
  <span class="back iconfont" @click="$router.push('/find')">&#xe612;</span>
  <span class="name">歌单广场</span>
</div>
<Scroll class="scroll">
  <div>
    <div class="div">你的推荐歌单</div>
    <div class="block-container">
      <SongBlock :list="recommandList" class="item"/>
    </div>
  </div>
</Scroll>
</template>

<style scoped lang='scss'>
.top {
  height: 50Px;
  width: 100%;
  background-color: #fff;
  position: relative;
  z-index:1;
  .back {
    font-size: 21Px;
    vertical-align: middle;
  }
  .name {
    margin-left: 25Px;
    font-size: 21Px;
    vertical-align: middle;
  }
}
.scroll {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top:59Px;
  .div {
    font-size: 21Px;
    padding: 0 15Px 15Px 25Px;
    font-weight: 600;
  }
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