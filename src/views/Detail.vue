<script setup>
import { getRecommandContent, getSongUrl } from '@/api/test'
import { useScroll } from '@vueuse/core'
import { usePlayStateStore } from '@/store/playerState';
const store = usePlayStateStore()
const el = ref(null)
const { y }  = useScroll(el)
const show = ref(false)
watch(y, () => {
  if (y.value > 217) {
    show.value = true
  } else {
    show.value = false
  }
})
const list = ref([])
const route = useRoute()
const id = route.params.id
const getDetail = async (id) => {
  const res = await getRecommandContent(id)
  console.log(res.data.playlist)
  list.value = res.data.playlist
}
const playSong = async (songList, index) => {
  console.log('click')
  // const res = await getSongUrl(id)
  // console.log(res.data.data)
  store.selectPlay(songList, index)
}
getDetail(id)
const loading = computed(() => {
  return Object.keys(list.value).length === 0
})
// const songBar = ref(null)
// onMounted(() => {
//   console.log(offsetTop(songBar))
// })

//Tabbar，添加播放列表功能
const showToast = ref(false)
const info = ref({})
const addToPlayList = (obj) => {
  showToast.value = true
  info.value = obj
}
const showList = reactive({
  show: false,
  List :[],
  type: 1
})
const onClick = (list) => {
  console.log('onClick')
  showList.show = true
  showList.List = list
}
</script>

<template>
  <div class="wrapper" v-loading="loading">
    <div class="background"></div>
    <div class="top-bar">
      <span class="iconfont back" @click="$router.back">&#xe612;</span>
      <span class="song-text">歌单</span>
      <span class="iconfont dot">&#xe747;</span>
    </div>
    <div class="song-music-fix-bar" v-show="show">
      <span class="play iconfont">&#xe609;</span>
      <span class="text">播放全部</span>
      <span class="list iconfont">&#xe62d;</span>
    </div>
    <div class="song" ref="el">
      <Scroll class="song-scroll">
      <div>
      <div class="song-content">
        <div class="song-content-block" :style="{'background-image': `url(${list.coverImgUrl})`}"></div>
        <div class="song-content-info">
          <div class="name">{{ list.name }}</div>
          <div class="user">
            <div class="user-icon"></div>
            <span class="user-name">你好云音乐</span>
          </div>
          <div class="tag">
            <span v-for="i in 3" class="tag-info">华语</span>
          </div>
        </div>
      </div>
      <div class="desc">{{ list.description }}</div>
      <div class="iconfont icon">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="song-music">
        <div class="song-music-bar" ref="songBar">
          <span class="play iconfont">&#xe609;</span>
          <span class="text" @click="playSong(list.tracks, 0)">播放全部</span>
          <span class="list iconfont" @click="onClick(list.tracks)">&#xe62d;</span>
        </div>
        <div class="song-music-content" v-for="(item, index) in list.tracks" @click="playSong(list.tracks, index)">
          <span class="iconfont index" @click.stop="store.randomPlay(list.tracks)" >{{index + 1}}</span>
          <!-- @click.stop="store.randomPlay(list.tracks)" -->
          <div class="text">
            <div class="song-name">{{item.name}}</div>
            <div class="ar-info">
              <span class="fee">VIP</span>
              {{item.ar[0].name}} {{item.al.name}}
            </div>
            <div class="award" v-show="item.awardTags">{{ item.awardTags }}</div>
          </div>
          <span class="iconfont mv">&#xe645;</span>
          <span class="iconfont more" @click.stop="addToPlayList(
            {songName:item.name,arName:item.ar[0].name,img:item.al.picUrl,allInfo: item}
          )">&#xe747;</span>
        </div>
      </div>
      </div>
      </Scroll>
    </div>
    <PlayList :showList="showList" @change="() => showList.show = false"/>
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
  background-color: rgba(0,0,0,0);
  .background{
    position: absolute;
    background-color: rgb(250, 113, 113);
    height: 50%;
    left: 0;
    right: 0;
  }
  .song-music-fix-bar{
    position: relative;
    z-index: 100;
    height: 50Px;
    display: flex;
    align-items: center;
    margin-top:3Px;
    background-color:#fff;
    color: #000;
    animation: fixBar .5s ease-in-out;
    padding:0 9Px;

    span{
      font-size:15Px;
      margin: 0 9Px;
    }
    .play{
      font-size: 21Px;
      color: $color-theme;
    }
    .list{
      font-size: 21Px;
      margin-left: auto;
    }
  }
  
  .top-bar{
    display: flex;
    align-items: center;
    padding: 9Px 6Px 9Px 6Px;
    position: relative;
    z-index: 1;
    .song-text{
      margin-right: auto;
      font-size: 15Px;
      padding-left: 15Px;
    }
    .iconfont{
      font-size:19Px;
      padding: 0 13Px;
    }
    .back{
      font-weight: 600;
    }
    .dot{
      font-size:25Px;
    }
  }
  .song{
    position: absolute;
    top: 59Px;
    bottom: 0;
    left:0;
    right:0;
    overflow-y: auto;
    &-scroll {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .song-content{
      display: flex;
      padding: 5Px 9Px 9Px 9Px;
      &-info{
        flex:1;
        font-size: 17Px;
        padding: 0 9Px 0 9Px;
        .name{
          margin-bottom: 5Px;
          width: 125px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          line-height: 25Px;
          font-size: 15Px;
        }
        .user{
          padding-bottom: 9Px; 
          display: flex;
          align-items: center;
          &-icon{
            width: 29Px;
            height: 29Px;
            border-radius: 50%;
            background-color: coral;
          }
          &-name{
            font-size: 13Px;
            margin-left: 11Px;
          }
        }
        .tag{
          font-size: 11Px;
          margin-top:5Px;
          &-info{
            display: inline-block;
            background-color: gray;
            margin: 0 6Px;
            text-align: center;
            width: 29Px;
            line-height: 15Px;
            border-radius: 1Px;
          }
        }
      }
      &-block{
        height:99Px;
        width:99Px;
        min-width:99Px;
        background-size: cover;
        border-radius: 9Px;
      }
    }
    .desc{
      padding:0 9Px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      line-height: 17Px;
      font-size: 14Px;
    }
    .icon {
      display: flex;
      height: 71Px;
      justify-content: space-around;
      align-items: center;
      div {
        height: 36Px;
        width: 100Px;
        background-color: rgba(229, 229, 229, .3);
        border-radius: 19Px;
      }
    }
    &-music{
      border-top-left-radius: 16Px;
      border-top-right-radius: 16Px;
      background-color: white;
      padding: 0 9Px;
      &-bar{
        height: 50Px;
        display: flex;
        align-items: center;
        z-index: 1;
        position: relative;
        color:#000;
        border-bottom: 1Px solid rgb(185, 185, 185,.5);
        span{
          font-size:17Px;
          margin: 0 9Px;
        }
        .play{
          font-size: 23Px;
          color: $color-theme;
        }
        .list{
          font-size: 21Px;
          margin-left: auto;
        }
      }
      &-content{
        display: flex;
        align-items: center;
        border-bottom: 1Px solid rgb(185, 185, 185,.5);
        padding: 5Px 0;
        span{
          font-size: 19Px;
          padding: 9Px;
          color:#000;
        }
        .index{
          font-size: 15Px;
          color:rgba(0,0,0,.5)
        }
        .text{
          padding: 0Px;
          color:rgba(0,0,0,.9);
          .song-name{
            font-size: 16Px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
          .ar-info{
            font-size: 12Px;
            padding-top:7Px;
            width: 250Px;
            color:rgba(0,0,0,.7);
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-all;
            white-space: nowrap;
            padding-bottom: 2Px;
            .fee {
              font-size: 10Px;
              padding: 0 2.5Px;
              border-radius: 5Px;
              border:1Px solid $color-theme;
              color:$color-theme;
            }
          }
        }
        .mv{
          margin-left: auto;
          color:rgba(0,0,0,.3);
          font-weight: 600;
        }
        .more{
          color:rgba(0,0,0,.3)
        }
      }
    }
  }
}
@keyframes fixBar {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>