<script setup>
import { usePlayStateStore } from '@/store/playerState'
const store = usePlayStateStore()
const playing = computed(() => store.state.playing)
const currentSong = computed(() => store.currentSong())
const handlePlay = () => {
  store.state.playing = ! store.state.playing
  console.log(store.state)
}
const handleFullCreen = () => {
  store.state.fullScreen = true
}
const img = ref(null) 
watch(() => store.state.playing, () => {
  if (!store.state.playing) {
    img.value.style.animationPlayState = 'paused'
  } else {
    img.value.style.animationPlayState = ''
  }
})

//控制PlayList组件
// const test = computed(() => {
//   console.log('change')
//   return store.state.playList.slice()
// })
const showList = reactive({
  show:false,
  List: [],
  type: 0
})
watch(() =>store.state.playList,(newVal) => {
  console.log('watch')
  showList.List = newVal
},{deep:true, immediate: true })
</script>

<template>
  <Transition name="miniplay">
    <div class="mini-play" v-show="store.state.playList.length !== 0 && !store.state.fullScreen" @click="handleFullCreen">
      <div class="img" ref="img" :style="{backgroundImage: `url(${currentSong.al?.picUrl})`}"></div>
      <div class="info">{{ currentSong.name }} <span>- {{ currentSong.ar?.[0].name }}</span></div>
      <div class="control iconfont" @click.stop="handlePlay">
        <span v-show="playing">&#xea81;</span>
        <span v-show="!playing">&#xe628;</span>
      </div>
      <div class="list iconfont" @click.stop="() => showList.show = true">&#xe62d;</div>
    </div>
  </Transition>
  <PlayList :showList="showList" @change="() => showList.show = false"/>
</template>

<style scoped lang='scss'>
.mini-play{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  height: 40Px;
  padding: 5Px 5Px 5Px 15Px;
  align-items: center;
  background-color: #FFF;
  box-shadow: inset 0 2px 3px 0 rgba(139, 137, 137, 0.1);
  color: #000;
  .img{
    width: 40Px;
    height: 40Px;
    border-radius: 50%;
    background-size: cover;
    animation: rotate 20s linear infinite;
  }
  .info {
    font-size: 15Px;
    padding:0 15Px;
    flex:1;
    span{
      color:gray;
      font-size: 13Px;
    }
  }
  .control {
    text-align: center;
    padding:5Px 5Px 5Px 6Px;
    font-size: 19Px;
    border-radius: 50%;
    border: 2Px solid rgb(207, 205, 205);
  }
  
  // .svg {
  //    height: 100%;
  //    width: 19Px;
  //    background-color: antiquewhite;
  //    stroke-width: 8px;
  //     transform-origin: center;
  //     .progress-background {
  //       transform: scale(0.9);
  //       stroke: $color-theme-d;
  //     }
  //     .progress-bar {
  //       transform: scale(0.9) rotate(-90deg);
  //       stroke: $color-theme;
  //       stroke-dashoffset:255;
  //     }
  // }
  }
  .list {
    padding: 0 5Px 0 15Px;
    font-size: 27Px;
  }
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  25% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.miniplay-enter-from {
    opacity: 0;
    transform: translate3d(0,100Px,0);
  }
  .miniplay-leave-to {
    opacity: 0;
    transform: translate3d(0,100Px,0);
  }
  .miniplay-enter-active, .miniplay-leave-active {
    transition: all .6s cubic-bezier(.45,0,.55,1);
  }
</style>