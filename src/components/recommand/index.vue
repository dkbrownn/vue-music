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
  <Header></Header>
  <div v-loading:[loadingText]="loading" class="container">
    <div class="slider-wrapper">
      <div class="slider-content">
        <Slider v-if="list.length" :banner="list"></Slider>
      </div>
    </div>
    <SongBlock :list="recommandList.slice(0,9)"/>
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
  padding-bottom: 15Px;
}
.slider-wrapper {
  height: 69px;
  margin:5px 9px;
  border-radius: 3px;
  overflow: hidden;
}
</style>