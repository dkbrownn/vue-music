<script setup lang='ts'>
import { getSingerFins, getSingerInfo, getTopFifty, getSingerName } from '@/api/test.js'
import { usePlayStateStore } from '@/store/playerState.js'
import { storeToRefs } from 'pinia'

const store = usePlayStateStore()
const { state } = store
const singerAllInfo = reactive({
  /* info: '',
  fins: '',
  topFifty: '',
  img: '' */
})
const route = useRoute()
const getSingerDetail = async () => {
  const fins = await getSingerFins(route.params.id)
  const info = await getSingerInfo(route.params.id)
  const topFifty = await getTopFifty(route.params.id)
  /* const name = await getSingerName(route.params.id) */
  console.log(topFifty.data.songs, info.data.data
, fins.data.data.fansCnt)
  singerAllInfo.fins = fins.data.data.fansCnt
  singerAllInfo.info = info.data.data.secondaryExpertIdentiy
  singerAllInfo.topFifty = topFifty.data.songs
   singerAllInfo.img = info.data.data.artist.cover
}
onMounted(() => {
  getSingerDetail()
})
const loading = computed(() => {
  return Object.keys(singerAllInfo).length !== 4
})
/* const { state } = storeToRefs(usePlayStateStore())
const { change } = usePlayStateStore()
console.log(state, reactive({}),  usePlayStateStore()) */
/* const store = usePlayStateStore()
 const { state } = storeToRefs(store) */

const showToast = ref(false)
const info = ref({})
const addToPlayList = (obj) => {
  showToast.value = true
  info.value = obj
}
// const showList = reactive({
//   show: false,
//   List :[]
// })
// const onClick = (list) => {
//   console.log('onClick')
//   showList.show = true
//   showList.List = list
// }
</script>

<template>
  <div class="wrapper" v-loading="loading">
    <div class="top-bar">
      <span class="iconfont back" @click="$router.back">&#xe612;</span>
      <span class="iconfont dot">&#xe747;</span>
    </div>
    <div class="backgroud-img" :style="{'background-image': `url(http://p1.music.126.net/EawqbkXCxGmxZ6nnqTKxKw==/109951165566992331.jpg)`}"></div>
    <div class="song" ref="el">
      <div class="song-info">
        <div class="song-info-cname">Beyond</div>
        <div class="song-info-yname">超越</div>
        <div class="song-info-fins">{{singerAllInfo.fins}}粉丝</div>
        <div class="song-info-title"><span v-for="value in singerAllInfo.info">{{ value.expertIdentiyName
 }}、</span></div>
      </div>
      <div class="song-music">
        <div class="song-music-bar">
          <span class="play iconfont">&#xe609;</span>
          <span class="text" @click="store.selectPlay(singerAllInfo.topFifty,0)">播放全部</span>
        </div>
        <div class="song-music-content" v-for="(item, index) in singerAllInfo.topFifty" @click="store.selectPlay(singerAllInfo.topFifty,index)">
          <span class="iconfont index">{{index}}</span>
          <div class="text">
            <div class="song-name">{{item.name}}</div>
            <div class="ar-info">
          <span class="fee" v-show="item.fee === 1">VIP</span>
          {{item.ar[0].name}} {{item.al?.name}}</div>
          <div class="award" v-show="item.awardName">{{ item.awardName }}</div>
          </div>
          <span class="iconfont mv">&#xe645;</span>
          <span class="iconfont more"  @click.stop="addToPlayList(
            {songName:item.name,arName:item.ar[0].name,img:item.al.picUrl,allInfo: item})">&#xe747;</span>
        </div>
      </div>
    </div>
    <Toast :info="info" :show="showToast" @change="() => showToast = false"/>
  </div>
</template>

<style scoped lang="scss">
.wrapper{
  position: absolute;
  top:0;
  left: 0;
  right:0;
  bottom: 0;
  color:#000;
  .top-bar{
    display: flex;
    align-items: center;
    padding: 15Px 6Px 15Px 6Px;
    background-color: transparent;
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    z-index: 100;
    .iconfont{
        font-size:23Px;
        padding: 0 13Px;
      }
    .back{
      margin-right: auto;
      font-size: 25Px;
      padding-left: 5Px;
      color:#fff;
    }
    .dot{
      font-size:29Px;
      color:#fff;
    }
  }
  .backgroud-img{
    padding-top: 91%;
    background-size: cover;
    background-position: center; 
    background-repeat: no-repeat;
  }
  .song{
    position: absolute;
    top: 0Px;
    bottom: 0;
    left:0;
    right:0;
    overflow-y: auto;
    &-info{
      display: flex;
      flex-direction: column;
      font-size: 23Px;
      align-items: center;
      justify-content:space-around;
      background-color: #fff;
      margin:325Px 25Px 25Px 25Px;
      padding:15Px 0;
      border-radius: 25Px;
      box-shadow: 3Px 9Px 9Px 3Px rgba(197, 195, 195, .3);
      &-cname{
        font-size: 23Px;
        padding-bottom: 10Px;
      }
      &-yname, &-fins{
        padding-bottom: 5Px;
        font-size: 15Px;
      }
      &-title{
        font-size: 17Px;
      }
    }
    &-music{
      margin-top:29Px;
      border-top-left-radius: 16Px;
      border-top-right-radius: 16Px;
      background-color: rgba(255,255,255);
      &-bar{
        height: 61Px;
        display: flex;
        align-items: center;
        z-index: 1;
        position: relative;
        margin-left: 9Px;
        border-bottom: 1.5Px solid rgb(250 250 250);
        span{
          font-size:17Px;
        }
        .play{
          font-size: 23Px;
          color:$color-theme;
          border-radius: 50%;
          margin-right: 19Px;
        }
      }
      &-content{
        display: flex;
        align-items: center;
        border-bottom: 1.5Px solid rgb(237, 237, 239);
        margin-left: 9Px;
        padding: 6Px 0;
        span{
          font-size: 17Px;
          padding: 9Px;
          color:rgba(0,0,0,.5);
        }
        .text{
          color:#000;
          width: 61%;
          padding-left: 5Px;
          .song-name{
            font-size: 15.5Px;
            color:#000;
            line-height: 25Px;
          }
          .ar-info{
            width: 100%;
            font-size: 13.5Px;
            line-height: 25Px;
            color:rgba(0,0,0,.6);
            @include no-wrap();
            .fee {
              font-size: 10Px;
              padding: 0 2.5Px;
              border-radius: 5Px;
              border:1Px solid $color-theme;
              color:$color-theme;
            }
          }
          .award {
            width: 100%;
            font-size: 13.5Px;
            line-height: 19Px;
            color: rgb(234, 88, 12);
            @include no-wrap();
            background-color: rgb(255 237 213);
          }
        }
        .mv{
          margin-left: auto;
          margin-right: 15Px;
          color:rgb(101, 100, 100,.7);
          font-size: 23Px;
        }
        .more{
          color:rgb(101, 100, 100,.7);
          font-size: 23Px;
        }
      }
    }
  }
}
</style>