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
  <div class="wrapper">
    <div class="top">
      <span class="back iconfont" @click="$router.push('/find')">&#xe612;</span>
      <span class="name">歌单广场</span>
    </div>
    <Scroll class="scroll">
      <div>
        <div class="div">你的推荐歌单</div>
        <div class="block-wrapper">
          <SongBlock :list="recommandList" class="item"/>
        </div>
      </div>
    </Scroll>
  </div>
</template>

<style scoped lang='scss'>
.wrapper {
  position: absolute;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
}
.top {
  height: 30Px;
  width: 100%;
  background-color: #fff;
  position: relative;
  z-index:1;
  padding: 6Px 15Px;
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
.block-wrapper {
  display: grid;
  row-gap: 3Px;
  column-gap: 3Px;
}
@media screen and (max-width: 450Px) {
  .block-wrapper {
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: min-content;
  }
}
@media screen and (min-width: 450Px) {
  .block-wrapper {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-auto-rows: min-content;
  }
}
</style>