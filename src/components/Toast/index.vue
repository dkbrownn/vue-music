<script setup>
import { usePlayStateStore } from '@/store/playerState'
const store = usePlayStateStore()
const { state } = store
const emit = defineEmits(['change'])
const close_toast = () => { 
  console.log('click')
  
}
defineProps({
  info: {
    type: Object,
    default: {}
  },
  show: {
    type: Boolean,
    default: false
  }
})
const pushToPlayList = (song) => {
  const result = store.pushToPlayList(song)
  emit('change')
  if (result === 1) {
    console.log('已在列表')
  }
  if (result === 0) {
    console.log('添加成功')
  }
  console.log(store.state)
}
</script>

<template>
  <div>
    <div class="hide-wrapper" @click.prevent="emit('change')" v-if="show">
    </div>
    <!-- <teleport to="body"> -->
    <transition name="slide">
      <div class="container-toast" @click.stop="" v-if="show">
      <!-- <div class="close" @click="close_toast">X</div> -->
      <div class="top-info">
        <img :src="info.img"/>
        <div class="song-info">
          <div class="song-info-name">歌曲:{{ info.songName }}</div>
          <div class="song-info-ar">{{info.arName}}</div>
        </div>
      </div>
      <div class="func">
        <div class="iconfont">
          <span class="icon">&#xe6a5;</span>
          <span class="func-name" @click="pushToPlayList(info.allInfo)">添加到播放列表</span>
        </div>
      </div>
      ...
      </div>
    </transition>
</div>
<!-- </teleport> -->
</template>

<style lang="scss" >
.hide-wrapper{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,.25);
}
.container-toast{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height:40%;
  background-color: #fff;
  border-top-left-radius: 15Px;
  border-top-right-radius: 15Px;
  padding:11Px 15Px;
  z-index:5;
  font-size: 15Px;
  color: #000;
  .top-info{
    display: flex;
    align-items: center;
    padding: 5Px 0 9Px 0 ;
    border-bottom: 1Px solid rgba(0,0,0,.1);
    img {
      height: 55Px;
      width: 55Px;
      object-fit: cover;
      border-radius: 5Px;
    }
    .song-info {
      margin-left: 15Px;
      line-height: 25Px;
      &-ar{
        color:rgba(0,0,0,.5);
        font-size: 14Px;
      }
    }
  }
  .func{
    margin:15Px 0;
    font-size: 15Px;
    font-weight: 400;
    .iconfont{
      display: flex;
      align-items: center;
    }
    .icon {
      font-size: 21Px;
      color:#f44336;
    }
    .func-name{
      padding: 0 9Px;
      font-size: 13Px;
      color:rgba(0,0,0,.7)
    }
  }
  
  .close{
    text-align: end;
    padding: 9PX 9Px;
  }
}
 .slide-enter-active {
    animation-name: slideInUp;
    animation-duration: .3s;
    animation-fill-mode: forwards
}
.slide-leave-active {
    animation-name: slideOutDown;
    animation-duration: .3s;
    animation-fill-mode: forwards
}
@keyframes slideInUp {
    0% {
        transform: translate3d(0, 100%, 0);
        visibility: visible;
    }
 
    to {
        transform: translateZ(0);
    }
}
@keyframes slideOutDown {
    0% {
        transform: translateZ(0);
    }
 
    to {
        visibility: hidden;
        transform: translate3d(0, 100%, 0);
    }
}
.delay-leave-active {
    -webkit-animation-delay: .3s;
    -moz-animation-delay: .3s;
    -o-animation-delay: .3s;
    animation-delay: .3s;
}
</style>