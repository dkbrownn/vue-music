<script setup>
import { sortSinger } from '@/utils/getSingerList'
import useFixed from '@/assets/js/fixedBar';
const singerList = ref([])
const getlist = async () => {
  const { list } = await sortSinger()
  singerList.value = list
} 
/* const { groupRef } = useFixed() */
const height = ref(null)
const getChildren = () => {
  console.log('1')
  const heightAll = ref([])
   heightAll.value = height.value.children
   console.log(height.value.children.length)
  /* for(let i = 0; i<heightAll.value.length; i++) {
    console.log(heightAll[i])
    console.log('111')
  } */
}
onMounted(() => {
  getlist()
  console.log(height.value.children)
  getChildren()
}) 
const loading = computed(() => {
  return singerList.value.length == 0
})
const loadingText = '加载中...'
</script>

<template>
  <div class="container" v-loading:[loadingText]="loading" ref="height">
    <div class="A-area" v-for="(item, key) in singerList">
      <div class="key">{{key}}</div>
      <div class="lists" v-for="i in item" @click="$router.push(`/singerdetail/${i.id}`)">
        <img :src="i.img1v1Url">
        <div class="name">{{i.name}}</div>
      </div>
    </div>
    <div class="sidebar">
      <li v-for="(item, key) in singerList" :class="{'active': key === 'A'}">{{key}}</li>
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
  overflow-x: auto;
  padding: 0 25Px;
}
.active{
  color:$color-sub-theme;
}
.A-area{
  margin-top:5Px;
  .key{
    background-color: rgba(27, 24, 29, 0.5);
    padding:3px 15Px;
    color:rgba(211, 209, 209, 0.5);
    border-bottom-left-radius: 13Px;
    border-bottom-right-radius: 13Px;
  }
  .lists{
    display: flex;
    align-items: center;
    padding: 5Px 3Px;
    img{
      height: 55Px;
      width: 55Px;
      border-radius: 50%;
    }
    .name{
      flex:1;
      margin-left: 15Px;
      line-height: 55Px;
      color:rgb(153, 155, 157);
      border-bottom: 2Px solid rgb(73, 71, 71, .3);
      font-size: 17Px;
    }
  }
}
.sidebar{
  position: fixed;
  right:5Px;
  top: 50%;
  transform: translateY(-50%);
  width: 21Px;
  background-color: rgba(153, 155, 157, .5);
  color:rgba(255,255,255,.7);
  border-radius: 6Px;
  text-align: center;
  li{
    font-size: 19Px;
    padding: 3Px 0;
  }
}
</style>