<script setup lang='ts'>
import { getTopList, getTopListSummary, getContent } from '@/api/test'
const list = ref([])
const showThree = ref([])
// const detail = ref(null)
const get = async () => {
  const res = await getTopList()
  const res1 = await getTopListSummary()
  const res3 = await getContent()
  console.log(res, res1.data.list,'res3', res3)
  showThree.value = res1.data.list
  list.value = res.data.list
}
/* const getDetail = async (id) => {
  const res = await getRecommandContent(id)
  console.log(res.data.playlist.tracks)
} */
onMounted(() => {
  get()
})
const loading = computed(() => {
  return list.value.length === 0
})
</script>

<template>
<div class="container" v-loading="loading">
  <div class="top">
    <span class="iconfont icon">&#xe654;</span>
    <span class="text">官方榜</span>
  </div>
  <div v-for="(item, index) in list" class="block" @click="$router.push(`/songdetail/${item.id}`)">
    <div class="type">{{item.name}}</div>
    <span class="time">{{item.updateFrequency}}</span>
    <div class="content">
      <div class="content-img" :style="{ 'background-image': `url(${item.coverImgUrl})` }"></div>
      <div class="content-music">
        <div class="content-music-1" v-for="(value, ind) in showThree[index].tracks">{{ind}} {{value.first}} <span> - {{ value.second }}</span></div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
.container{
  position: absolute;
  top:50Px;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: aquamarine;
  overflow-x: auto;
  padding: 0 25Px;
  color:black;
  .top{
    display: flex;
    align-items: center;
    padding: 19Px 0;
    .icon{
      display: inline-block;
      color:$color-theme;
      font-size: 27Px;
    }
    .text{
      font-size: 23Px;
      padding-left: 9Px;
    }
  }
  .block{
    height: 125Px;
    background-color: antiquewhite;
    border-radius: 15Px;
    margin-bottom: 25Px;
    padding: 15PX 25Px;
    position: relative;
    .type{
      margin-bottom: 15PX;
    }
    .time{
      font-size:13Px;
      position: absolute;
      top:19Px;
      right:29Px;
    }
    .content{
      display: flex;
      &-img{     
        height: 80Px;
        min-width: 80Px;
        background-size: cover;
        border-radius: 9Px;
        margin-right: 35Px;
      }
      &-music{
        display: flex;
        flex-direction: column;
        background-color: aqua;
        font-size: 17Px;
        min-width: 0;
        &-1{
          padding:5Px 5Px;
          min-width: 0;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
          white-space: nowrap;
          span{
            color:gray;
          }
        }
      }
    }
  }
}
</style>