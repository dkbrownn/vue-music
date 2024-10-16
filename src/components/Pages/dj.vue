<script setup lang='ts'>
import { getDj, getDjTYpe, getDjPay } from '@/api/test'
const list = ref([])
const types = ref([])
let imageList = []
const imgUrl = ref('')
const getPicUrl = (index) => {
  console.log(imageList)
  imgUrl.value = imageList[index]
}
const getDjData = async () => {
  const res = await getDj()
  const res1 = await getDjTYpe()
  const res3 = await getDjPay()
  console.log(res, res1, res3)
  list.value = res.data.djRadios
  types.value = res1.data.data
  imageList= types.value.map((item) =>{
    if (item.radios?.[0].picUrl) {
      return item.radios?.[0].picUrl
    }
  })
  getPicUrl(0)
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
const loading = computed(() => {
  return types.value.length > 0 && list.value.length > 0
})
</script>

<template>
<div class="container" v-loading="!loading">
<Scroll class="container-scroll">
  <div>
<div class="iconfont search" @click="$router.push('/search')">
    <i class="iconfont search_icon">&#xe752;</i>
    <input placeholder="搜索歌曲、歌手"/>
</div>
<div class="category">
  <div class="img" :style="{
        'background-image': `url(${imgUrl})`
  }"></div>
  <Scroll class="scroll-type" :scrollX="true">
    <div class="scroll-type-wrapper">
      <div class="type" v-for="(i, index) in types" @click="getPicUrl(index)">
        <span>{{ i.categoryName }}</span>
      </div>
    </div>
  </Scroll>
</div>
<div class="banner"></div>
<span>为你推荐的电台 ></span>
<div class="dj-container">
  <Scroll class="scroll" :scrollX="true">
    <div class="scroll-wrapper">
      <div class="dj-type" v-for="(v, i) in 3">
        <div class="dj" v-for="item in list.slice(i*3, i*3+3)">
        <div class="dj-img" :style="{backgroundImage: `url(${item.picUrl})`}"></div>
        <div class="dj-desc">
          <div class="dj-desc-tag">{{item.category
        }} | {{ item.name }}</div>
          <div class="dj-desc-title">{{item.rcmdtext}}</div>
          <div class="dj-desc-count">
            <span>{{ item.category }}</span>
            {{playCount(item.playCount)}}</div>
        </div>
        </div>
      </div>
    </div>
  </Scroll>
</div>
</div>
</Scroll>
</div>
</template>

<style scoped lang="scss">
.container{
  position: absolute;
  top:50Px;
  bottom:0;
  left: 0;
  right: 0;
  padding: 5Px 19Px 0 19Px;
  font-size: 17Px;
  font-weight: 550;
  color:#000;
  background-color: rgb(241 245 249);
  &-scroll {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  .search {
    margin: 7Px 0 15Px 0;
    height: 25Px;
    background-color: #e9ebf2;
    padding: 3Px 19Px;
    border-radius: 29Px;
    display: flex;
    align-items: center;
    color:#90949c;
    &_icon {
      left: 13Px;
      font-size:19Px;
      color:rgba(0, 0, 0, .5)
    }
    input{
      margin-left: 6Px;
      background-color: transparent;
      border: none;
      outline: none;
      font-size: 17Px;
    }
  }
  .category{
    width: 100%;
    min-height: 25Px;
    display: flex;
    .scroll-type {
    overflow: hidden;
    width: 100%;
    display: flex;
    align-items: center;
    &-wrapper {
      white-space: nowrap;
      div {
        display: inline-block;
        vertical-align: middle;
        text-align: center;
      }
    }
    }
    .img{
      height: 19px;
      min-width: 19px;
      border-radius: 5Px;
      background-size: cover;
    }
    .type {
      padding:6Px 15Px;
      background-color: #fff;
      margin: 0 5Px;
      flex-shrink: 0;
      border-radius: 5Px;
      display: flex;
      align-items: center;
      justify-content: center;
      border:1Px solid rgba(0, 0, 0, .1);
      span{
        font-size: 7px;
        color:rgba(0,0,0,.7);
        font-weight: 600;
        letter-spacing: 1.5Px;
      }
    }
  }
  .banner {
    height: 150Px;
    background-color: rgba(180, 199, 227, 0.5);
    margin:21Px 0;
  }
  .dj-container {
    .scroll {
      height: 100%;
      width: 100%;
      overflow: hidden;
      display: flex;
      &-wrapper{
        white-space: nowrap;
        //vertical-align: top;
      }
      .dj-type {
        display: inline-block;
      }
    }
  }
  .dj{
    margin:13Px 25Px 13Px 0;
    height: 111Px;
    width: 300Px;
    border-radius: 11Px;
    display: flex;
    align-items: center;
    padding: 0 15Px;
    background-color:#fff;
    &-img{
      height: 80Px;
      min-width: 80Px;
      border-radius: 9Px;
      background-size: cover;
    }
    &-desc{
      height: 80Px;
      width: 65%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 15Px;
      &-tag,  &-count{
        width: 100%;
        font-size: 12.5Px;
        padding: 3Px 0;
        color:#90949c;
        font-weight: 400;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
        white-space: nowrap;
      }
      &-title{
        width: 100%;
        font-size: 15Px;
        font-weight: 600;
        padding: 3Px 0;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
        white-space: nowrap;
      }
      &-count {
        span {
          display: inline-block;
          vertical-align: middle;
          padding:1.5Px 1Px;
          border-radius: 3Px;
          color:rgb(0, 68, 193);
          border: 1Px solid rgb(0, 68, 193);
          font-size: 8Px;
        }
      }
    }
  }
}
</style>