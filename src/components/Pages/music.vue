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


const conversionNumber = (number) => {
  if (number > 10000 ) {
    return number%10000+'万'
  }
  else {
    return number
  }
}
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
    <Scroll class="scroll" :scrollX="true">
      <div class="scroll-wrapper">
        <div class="block-container" v-for="item in   recommandList.slice(0,6)">
          <RouterLink :to="`/songdetail/${item.id}`">
            <div class="block" :style="{'background-image': `url(${item.picUrl})`}">
              <div class="iconfont listen">&#xe693; {{conversionNumber(item.playCount)}}</div>
            </div>
          </RouterLink>
          <div class="text">{{item.name}}</div>
        </div>
      </div>
    </Scroll>
    
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
    height: 40Px;
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
.scroll {
  width: 100%;
   display: flex;
  overflow: hidden;
  &-wrapper {
    white-space: nowrap;
    vertical-align: top;
    padding: 0 10Px;
    .block-container {
      display: inline-block;
      vertical-align:top;
      color:#000;
      padding:5Px 5Px;
      .block{
        height: 85PX;
        width: 85PX;
        background-color: $color-highlight-background;
        position: relative;
        border-radius: 9%;
        background-size:cover;
        .listen{
          font-size: 5px;
          padding: 7Px 0 0 7Px;
          color: #100f0f;
        }
      }
      .text{
        width: 85PX;
        height: 100%;
        line-height: 15Px;
        font-size: 13Px;
        padding-top: 6Px;
        white-space: wrap;
        display: -webkit-box; /* 使元素成为弹性盒子 */
        -webkit-box-orient: vertical; /* 垂直排列子元素 */
        -webkit-line-clamp: 2; /* 限制为两行 */
        overflow: hidden; /* 隐藏超出的内容 */
        text-overflow: ellipsis;
      }
    }
  }
}

</style>