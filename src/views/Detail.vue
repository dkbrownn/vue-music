<script setup>
import { getRecommandContent } from '@/api/test'
import { useScroll } from '@vueuse/core'
const el = ref(null)
const { y }  = useScroll(el)
const show = ref(false)
watch(y, () => {
  if (y.value > 163) {
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
getDetail(id)
const loading = computed(() => {
  return Object.keys(list.value).length === 0
})
const showToast = ref(false)
</script>

<template>
  <div class="wrapper" v-loading="loading">
    <div class="top-bar">
      <span class="iconfont" @click="$router.back">&#xe612;</span>
      <span class="song-text">歌单</span>
      <span class="iconfont">&#xe752;</span>
      <span class="iconfont dot">&#xe747;</span>
    </div>
    <div class="song-music-fix-bar" v-show="show">
      <span class="play iconfont">&#xe609;</span>
      <span class="text">播放全部</span>
      <span class="download iconfont">&#xe608;</span>
      <span class="list iconfont">&#xe62d;</span>
    </div>
    <div class="song" ref="el">
      <div class="song-content">
        <div class="song-content-block" :style="{'background-image': `url(${list.coverImgUrl})`}"></div>
        <div class="song-content-info">
          <div class="name">{{ list.description }}</div>
          <div class="user">
            <div class="user-icon"></div>
            <span class="user-name">你好云音乐</span>
          </div>
          <div class="tag">
            <span v-for="i in 3" class="tag-info">华语</span>
          </div>
        </div>
      </div>
      <div class="song-music">
        <div class="song-music-bar">
          <span class="play iconfont">&#xe609;</span>
          <span class="text">播放全部</span>
          <span class="download iconfont">&#xe608;</span>
          <span class="list iconfont">&#xe62d;</span>
        </div>
        <div class="song-music-content" v-for="(item, index) in list.tracks">
          <span class="iconfont index">{{index}}</span>
          <div class="text">
            <div class="song-name">{{item.al.name}}</div>
            <div class="ar-info">{{item.ar[0].name}}</div>
          </div>
          <span class="iconfont mv">&#xe85a;</span>
          <span class="iconfont more" @click="() =>showToast=true">&#xe747;</span>
        </div>
      </div>
    </div>
    <Toast v-show="showToast" @change="() =>showToast=false" />
  </div>
</template>

<style scoped lang="scss">
.wrapper{
  position: absolute;
  top:0;
  left: 0;
  right:0;
  bottom: 0;
  background-color: rgba(68, 1, 225, 0.5);
  .song-music-fix-bar{
    position: relative;
    z-index: 100;
    height: 61Px;
    display: flex;
    align-items: center;
    margin-top:3Px;
    background-color: rgba(150, 121, 219);
    span{
      font-size:15Px;
      margin: 0 9Px;
    }
    .play{
      font-size: 21Px;
      color: $color-theme;
    }
    .download{
      margin-left: auto;
    }
    .list{
      font-size: 21Px;
    }
  }
  .top-bar{
    display: flex;
    align-items: center;
    padding: 25Px 6Px 11Px 6Px;
    .song-text{
      margin-right: auto;
      font-size: 21Px;
      padding-left: 25Px;
    }
    .iconfont{
      font-size:23Px;
      padding: 0 13Px;
    }
    .dot{
      font-size:29Px;
    }
  }
  .song{
    position: absolute;
    top: 69Px;
    bottom: 25Px;
    left:0;
    right:0;
    overflow-y: auto;
    .song-content{
      display: flex;
      height: 125Px;
      padding: 15Px 9Px 9Px 9Px;
      &-info{
        font-size: 21Px;
        padding: 0 9Px 0 9Px;
        .name{
          display: inline-block;
          padding-bottom: 9Px;
          width: 125px;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
          // white-space: nowrap;
        }
        .user{
          padding-bottom: 9Px; 
          display: flex;
          align-items: center;
          &-icon{
            width: 21Px;
            height: 21Px;
            border-radius: 50%;
            background-color: coral;
          }
          &-name{
            font-size: 11Px;
            margin-left: 11Px;
          }
        }
        .tag{
          font-size: 11Px;
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
    
    &-music{
      border-top-left-radius: 16Px;
      border-top-right-radius: 16Px;
      background-color: rgba(150, 121, 219,.5);
      &-bar{
        height: 61Px;
        display: flex;
        align-items: center;
        z-index: 1;
        position: relative;
        span{
          font-size:15Px;
          margin: 0 9Px;
        }
        .play{
          font-size: 21Px;
          color: $color-theme;
        }
        .download{
          margin-left: auto;
        }
        .list{
          font-size: 21Px;
        }
      }
      &-content{
        height: 59Px;
        display: flex;
        align-items: center;
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
          }
          .ar-info{
            font-size: 13Px;
            padding-top:3Px;
          }
        }
        .mv{
          margin-left: auto;
        }
      }
    }
  }
}
</style>