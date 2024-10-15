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
  <Scroll class="scroll">
    <div>
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
        <div class="content-music-1" v-for="(value, ind) in showThree[index].tracks">{{ind+1}} {{value.first}} <span> - {{ value.second }}</span></div>
      </div>
    </div>
  </div>
  </div>
</Scroll>
</div>
</template>

<style scoped lang="scss">
.container{
  position: absolute;
  top:50Px;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(241 245 249);
  overflow-x: auto;
  padding: 0 25Px;
  color:black;
  .scroll {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .top{
    display: flex;
    align-items: center;
    padding: 19Px 0;
    .icon{
      display: inline-block;
      color:$color-theme;
      font-size: 13px;
    }
    .text{
      font-size: 9px;
      padding-left: 9Px;
    }
  }
  .block{
    background-color: #fff;
    border-radius: 15Px;
    margin-bottom: 25Px;
    padding: 9Px 25Px 15Px 25Px;
    position: relative;
    .type{
      margin-bottom: 9Px;
      font-weight: 400;
      font-size: 9px;
    }
    .time{
      font-size:6px;
      position: absolute;
      top:13Px;
      right:29Px;
      color:rgba(0,0,0,.5)
    }
    .content{
      display: flex;
      align-items: center;
      &-img{     
        height: 36px;
        min-width: 36px;
        background-size: cover;
        border-radius: 9Px;
        margin-right: 15Px;
      }
      &-music{
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: 6.7px;
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