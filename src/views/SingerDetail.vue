<script setup lang='ts'>
import { getSingerFins, getSingerInfo, getTopFifty, getSingerName } from '@/api/test.js'
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
          <span class="text">播放全部</span>
        </div>
        <div class="song-music-content" v-for="(item, index) in singerAllInfo.topFifty">
          <span class="iconfont index">{{index}}</span>
          <div class="text">
            <div class="song-name">{{item.name}}</div>
            <div class="ar-info">{{ item.al.name }}</div>
          </div>
          <span class="iconfont mv">&#xe85a;</span>
          <span class="iconfont more">&#xe747;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper{
  position: absolute;
  top:0;
  left: 0;
  right:0;
  bottom: 0;
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
      color:$color-background;
    }
    .dot{
      font-size:29Px;
      color:$color-background;
    }
  }
  .backgroud-img{
    padding-top: 100%;
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
      height:115Px;
      font-size: 23Px;
      align-items: center;
      justify-content:space-around;
      background-color: rgba(25,25,25,.7);
      margin:325Px 25Px 25Px 25Px;
      padding:25Px 0;
      border-radius: 25Px;
      box-shadow: 1Px 2Px  rgba(197, 195, 195, .1);
      &-cname{
        font-size: 25Px;
        padding-bottom: 5Px;
      }
      &-yname, &-fins{
        padding-bottom: 5Px;
        font-size: 17Px;
      }
      &-title{
        font-size: 21Px;
      }
    }
    &-music{
      margin-top:29Px;
      border-top-left-radius: 16Px;
      border-top-right-radius: 16Px;
      background-color: $color-background;
      &-bar{
        height: 61Px;
        display: flex;
        align-items: center;
        z-index: 1;
        position: relative;
        margin-left: 9Px;
        border-bottom: 1Px solid rgba(69, 66, 66, .5);
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
        height: 69Px;
        display: flex;
        align-items: center;
        border-bottom: 1Px solid rgba(69, 66, 66, 1);
        margin-left: 9Px;
        span{
          font-size: 19Px;
          padding: 9Px;
          color:$color-text-ll;
        }
        .text{
          padding: 9Px;
          color:$color-text-ll;
          .song-name{
            font-size: 17Px;
            color:aliceblue;
          }
          .ar-info{
            font-size: 12Px;
            padding-top:5Px;
          }
        }
        .mv{
          margin-left: auto;
          margin-right: 15Px;
          color:gray
        }
      }
    }
  }
}
</style>