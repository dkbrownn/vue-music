<script setup>
import { usePlayStateStore } from '@/store/playerState'
import useMode from '../Player/use-mode';
const store = usePlayStateStore()
const { state } = store
const emit = defineEmits(['change'])
const pushToPlayList = (song) => {
  const result = store.pushToPlayList(song)
  console.log(result,store.state)
}
const pushToFavarite = (song) => {
  const res = store.pushToFavarite(song)
  console.log(res)
}
// const deleteFromPlayList = (i) => {
//   const index = state.playList.findIndex((song) => {
//     return song.id === i.id
//   })
//   state.playList.splice(index,1)
// }
defineProps({
  showList: {
    type: Object,
    default:{show: false, List: [] ,type: 0 }
  }
})
const { handleMode } = useMode(1)

const { deleteSong } = store

const deleteAll = () => {
  store.state.playList = []
  store.state.playing = false
}

const currentSong = computed(() => {
  return store.currentSong()
})
</script>

<template>
  <div class="container">
    <transition name="hide">
      <div class="hide-wrapper" v-show="showList.show" @click="emit('change')">
      </div>
    </transition>
    <transition name="slide" v-show="showList.show">
      <div class="container-toast">
        <div class="circle"></div>
        <div class="list-info" v-show="showList.type === 0">当前播放</div>
         <div class="list-info" v-show="showList.type === 1">当前歌单</div>
        <div class="top-info">
            <span class="iconfont mode" v-show="state.playMode === 0" @click="handleMode">&#xe61c; 列表循环</span>
            <span class="iconfont mode" v-show="state.playMode === 1"
            @click="handleMode">&#xe6a3; 单曲循环</span>
            <span class="iconfont mode" v-show="state.playMode === 2"
            @click="handleMode">&#xe601; 随机播放</span>
            <span class="iconfont collect" v-show="showList.type === 0">&#xe74e;</span>
            <span class="iconfont add" v-show="showList.type === 1"
            @click="store.pushAllToPlayList(showList)"
            >&#xe620;</span>
            <span class="iconfont delete" v-show="showList.type === 0"
            @click="deleteAll">&#xe7a6;</span>
        </div>
        <Scroll class="func">
          <div>
            <div class="item" v-for="(i, index) in showList.List"
            :class="{
              playing: currentSong.id === i.id
            }"
            >
              <span class="fee"  v-show="i.fee === 1">VIP</span>
              <span class="info">{{ i.name }}-<span>{{ i.ar?.[0].name }}</span></span>
              <div class="iconfont add" @click="pushToPlayList(i)" v-show="showList.type === 1">&#xe620;</div>
              <div class="iconfont delete" @click="deleteSong(i, index)" v-show="showList.type === 0">&#xe653;</div>
            </div>
          </div>
        </Scroll>
        <div class="close"  @click="emit('change')">关闭</div>
      </div>
    </transition>
</div>
</template>

<style lang="scss" scoped>
.hide-wrapper{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,.15);
  z-index:100;
}
.container-toast{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height:50%;
  background-color: #f8f8f8;
  border-top-left-radius: 15Px;
  border-top-right-radius: 15Px;
  padding:1Px 15Px 11Px 15Px ;
  z-index:200;
  font-size: 15Px;
  color: #000;
  display: flex;
  flex-direction: column;
  .circle {
    margin: 5Px auto 9Px auto;
    width: 50Px;
    height: 6Px;
    background-color: #ededed;;
  }
  .list-info {
    text-align: center;
    font-size: 18Px;
  }
  .iconfont{
    color:rgba(0,0,0,.7);
  }
  .mode{
    display: inline-block;
    width: 111Px;
    padding: 6Px;
    text-align: center;
    font-size: 15Px;
    border-radius: 19Px;
    background-color: #ededed;
    color:#000;
    font-weight: 400;
  }
  .top-info{
    display: flex;
    align-items: center;
    padding: 5Px 0 9Px 0 ;
    .collect {
      margin-left: auto;
      font-size: 21Px;
    }
    .add {
      margin-left: auto;
    }
    .delete, .add {
      display: inline-block;
      font-size: 21Px;
      padding-left: 15Px;
    }
  }
  .func{
    margin:15Px 0 0 0;
    font-size: 15Px;
    font-weight: 400;
    font-size: 25Px;
    overflow:hidden;
    height: 100%;
    .item{
      display: flex;
      align-items: center;
      padding:5Px 5Px;
      .info {
        font-size: 15Px;
        font-weight:Regular 400;
        span {
          font-size: 14Px;
          margin-left: 3Px;
          color:rgba(0,0,0,.7)
        }
      }
      .fee {
        font-size: 10Px;
        padding: 0 2.5Px;
        border-radius: 5Px;
        border:1Px solid $color-theme;
        color:$color-theme;
        vertical-align: middle;
        margin-right:3Px;
      }
      .delete, .add {
        line-height: 25Px;
        font-size: 19Px;
        padding: 0 0 0 15Px;
        margin-left: auto;
        color:rgba(0,0,0,.5);
        font-weight: 300;
      }
    }
  }
  .close{
    text-align: center;
    padding:9Px 0 0 0;
  }
}

.playing {
  color:rgb(250, 113, 113);
  span {
    color:rgb(250, 113, 113) !important;
  }
}
.slide-enter-active {
  animation: slideUp .3s ease-in-out;
}
.slide-leave-active {
   animation: slideDown .3s ease-in-out;
}
.hide-enter-active {
  animation: onHide .3s ease-in-out;
}
.hide-leave-active {
   animation: offHide .3s ease-in-out;
}
@keyframes slideUp {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes slideDown {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(100%);
    opacity: 0;
  }
}
@keyframes onHide {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes offHide {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>