<script setup>
import { usePlayStateStore } from '@/store/playerState'
import { storeToRefs } from 'pinia'
import { getSongUrl, getSongLyric } from '@/api/test'
import { set } from '@vueuse/core';
import { PLAY_MODE, SEARCH_KEY } from '@/assets/js/constant'
import { shuffle } from "@/utils/shuffle"
import { save, get } from './useStorage.js'
import { Base64 } from 'js-base64'
import Lyric from 'lyric-parser'
import { debounce } from 'throttle-debounce'
import useMode from './use-mode.js';
const songReady = ref(false) //判断是否音频加载了
const store = usePlayStateStore()
const { state } = (store)
const currentSong = computed(() => {
 const res =  store.currentSong()
 console.log(res)
  return res
})
// const a = reactive({list:[1,2,3], index: 0})
// const a = [1,2,3]
// const index = ref(0)
// let test = () => a[index.value]
// const arrIndex = computed(() => {
//   return test()
// })
// watch(arrIndex, () => {
//   console.log('你的猜想是正确的')
// })
// index.value = 1
const lyricTime = ref(0)
const currentLyric = ref(null)
const currentLineNum = ref(-1)

const fullScreen = computed(() => store.state.fullScreen)
const audioRef = ref(null)
const duration = ref('00:00')
let durationSeconds = 0
//歌曲url
watch(currentSong, async (newSong) => {
  // if (!songReady.value) {
  //   return
  // }
  console.log(currentSong, newSong)
  if (!newSong.id){
    // console.log('return')
    console.log('newSong.id')
    return
  }
  currentLyric.value = null
  currentLineNum.value = -1
  const index = state.haveListen.findIndex((song) => {
    return song.id === newSong.id
  })
  if (index === -1) {
    state.haveListen.unshift(newSong)
    save('haveListen',state.haveListen)
  }
  const res = await getSongUrl(newSong.id)
  console.log(res.data.data[0].url)
  if (res.data.data[0].url){
    const audioEl = audioRef.value
    audioEl.src = res.data.data[0].url
    console.log('play')
    state.playing = true
    audioEl.play()
    durationSeconds = res.data.data[0].time
    duration.value = conversionTime( durationSeconds / 1000)
  }
  // || !newSong.url
})
const controlPlay = () => {
  console.log(audioRef.value.paused)
  state.playing ?  pause() : play()
  function play () {
    state.playing = true
    lyricTime.value = audioRef.value.currentTime
    audioRef.value.play()
    playLyric()
  }
  function pause () {
    audioRef.value.pause()
    state.playing = false
    stopLyric()
  }
  console.log(audioRef.value.paused)
 // stopLyric()
}
const playIcon = computed(() => {
  return state.playing ? 'play' : 'pause'
})

const lastSong = () => {
  state.currentIndex >= 1 ? state.currentIndex -= 1 :  state.currentIndex = state.playList.length -1
  audioRef.value.pause()
  stopLyric()
  currentLyric.value = null
  currentLineNum.value = -1
}
const nextSong = () => {
  stopLyric()
  state.currentIndex <= state.playList.length -2 ? state.currentIndex += 1 : state.currentIndex = 0
  audioRef.value.pause()
  currentLyric.value = null
  currentLineNum.value = -1
}

// const isLove = computed(() => {
//   const id = currentSong.value.id 
//   const index = get('favariteList').findIndex((song) => {
//     return song.id === id
//   })
//   if(index !== -1) {
//     return true
//   } else {
//     return false
//   }
// })
const showLove = ref(false)
watch(currentSong, (newSong) => {
  const id = newSong.id 
   const index = get('favariteList').findIndex((song) => {
    return song.id === id
  })
  index === -1 ? showLove.value = false : showLove.value = true
})

const handleLove = (id) => {
  showLove.value = !showLove.value
  if (showLove.value) {
    const result = store.state.favariteList.findIndex((song) => {
      return song.id === id 
    })
    console.log(result)
    if (result !== -1) {
      return
    }
    const item = store.state.playList.find((song) => {
      if ( song.id === id ) {
        return song
      }
    })
    store.state.favariteList.push(item)
    console.log(store.state.favariteList)
  } else {
    const result = store.state.favariteList.findIndex((song) => {
      return song.id === id 
    })
    console.log(result)
    if (result == -1) {
      return
    }
    const index = store.state.favariteList.findIndex((song) => {
      if ( song.id === id ) {
        return true
      }
    })
   store.state.favariteList.splice(index,1)
  }
  save('favariteList', store.state.favariteList)
}

const { mode, modeNotice, handleMode } = useMode()
const error = () => {
}
const width = ref(0)
const currentTime = ref('00:00')
//格式化
function conversionTime  (time)  {
  const timeSeconds = Math.floor(time) 
  const minutes = toString(parseInt((timeSeconds / 60),10))
  const seconds = toString(timeSeconds % 60)
  function toString (number) {
    if (number >= 10) {
      return number.toString()
    }
    else {
      return '0' + number
    }
  }
  return minutes + ':' + seconds
}
//反格式化
function turnFormation (time) {

}
// 优化处

const isProgressing = ref(false) //处理拖动时原生html事件和自定义事件优先级
const updataTime = (e) => {
  if (!isProgressing.value) {
    console.log(e.target.currentTime)
    lyricTime.value = e.target.currentTime
    const percent = (e.target.currentTime / e.target.duration)*100
  // console.log(percent,e.target.currentTime)
    width.value = percent
  // console.log(conversionTime(e.target.currentTime))
    currentTime.value = conversionTime(e.target.currentTime)
  }
}
// const ready = () => {
//   if (songReady.value) {
//     return 
//   }
//   songReady.value = true
// }
const endAudio = () => {
  if (state.playMode === 0 || state.playMode === 2) {
    state.currentIndex++
  } else {
    state.playing = true
    state.currentIndex = state.currentIndex
    audioRef.value.play() 
  }
}

// 处理进度条移动
const touch = {}
const progressed = ref(null)
const progressAll = ref(null)
const onTouchStart = (e) => {
  console.log(e, 'start')
  touch.x1 = e.touches[0].pageX
  touch.beginWidth = progressed.value.clientWidth
  console.log(touch)
}
const onTouchMove = (e) => {
  console.log(e, 'move')
  const delta = e.touches[0].pageX - touch.x1
  const tempWidth = touch.beginWidth + delta
  const barWidth = progressAll.value.clientWidth
  console.log(tempWidth / barWidth)
  const progress = Math.min(1, Math.max((tempWidth / barWidth), 0)) * 100
  width.value = progress
  const progressWidth = (progressed.value.clientWidth / barWidth)
  console.log(progress)
  onProgressChanging(progressWidth)
}
const onTouchEnd = () => {
  const barWidth = progressAll.value.clientWidth
  const progress = (progressed.value.clientWidth / barWidth)
  console.log(progress)
  onProgressChanged(progress)
}

// 触发音频的时间显示调整
function onProgressChanging (progress) {
  isProgressing.value = true
  currentTime.value = conversionTime(audioRef.value.duration * progress)
  lyricTime.value = audioRef.value.duration * progress
  playLyric()
  stopLyric()
}
// 触发音频时间调整
function onProgressChanged (progress) {
  console.log(audioRef.value.duration)
  audioRef.value.currentTime = audioRef.value.duration * progress
  lyricTime.value =  audioRef.value.currentTime
  console.log(audioRef.value.currentTime)
  isProgressing.value = false
  if (!state.playing) {
    state.playing = true
    audioRef.value.play()
  }
  playLyric()
}
// 点击触发进度改变
const onClick = (e) => {
  const rect = progressAll.value.getBoundingClientRect()
  const offsetWidth = e.pageX - rect.left
  const barWidth = progressAll.value.clientWidth
  const progress = offsetWidth / barWidth
  console.log(progress)
  onProgressChanging(progress)
  onProgressChanged(progress)
}
// 转盘的暂停与播放样式 以及icon与音频播放一一对应 歌词播放暂停
const bgm = ref(null)
 const turntable = ref(null) 
watch(() => state.playing, () => {
  if (!state.playing) {
    turntable.value.style.animationPlayState = 'paused'
    audioRef.value.pause()
    console.log('stopLyric-watch-playing')
    stopLyric()
  } else {
      turntable.value.style.animationPlayState = ''
      audioRef.value.play()
      lyricTime.value = audioRef.value.currentTime
      playLyric()
  }

})
// 歌词

// const debounce = debounce(500, async() => {
//   const res = await getSongLyric(newSong.id)
//   return res
// })

const  lyricScrollRef =ref(null) 
const lyricListRef = ref(null)

function playLyric () {
  const currentLyricVal = currentLyric.value
  if (currentLyricVal) {
    console.log('seek1', currentLyricVal)
    console.log(lyricTime.value * 1000)
    currentLyricVal.seek(lyricTime.value * 1000)
  }
   console.log('seek3', currentLyricVal)
}
function stopLyric() {
    const currentLyricVal = currentLyric.value
    console.log(currentLyricVal, currentLyric)
    if (currentLyricVal) {
      currentLyricVal.stop()
    }
}
function handleLyric ({ lineNum, txt }) {
  console.log('text',lineNum, txt)
  console.log()
  currentLineNum.value = lineNum 

  const scrollComp = lyricScrollRef.value
  const listEl = lyricListRef.value
  if (lineNum > 5) {
    const lineEl = listEl.children[lineNum - 5]
    //scrollComp.scroll.scrollToElement(lineEl, 1000)
  } else {
      //scrollComp.scroll.scrollTo(0, 0, 1000)
  }
}
watch(currentSong, async (newSong) => {
  console.log(newSong)
  stopLyric()
  currentLyric.value = null
  currentLineNum.value = -1
  lyricTime.value = 0
  if (newSong.lrc) {
    console.log(newSong.lrc)
    currentLyric.value = new Lyric(newSong.lrc.lyric, handleLyric)
    console.log('lrc')
    console.log(store.currentSong(),store.state.playList)
    if (store.state.playing) {
      playLyric()
    }
  } else {
    const res = await getSongLyric(newSong.id)
    console.log((res.data.lrc))
    newSong.lrc = res.data.lrc
    currentLyric.value = new Lyric( newSong.lrc.lyric, handleLyric)
    console.log(currentLyric.value)
    if (store.state.playing) {
      playLyric()
    }
  }
  // 使用侦听器副作用清理器，解决用户高频点击浪费请求影响性能
})

//控制主屏和歌词屏切换
const currentShow = ref('first')
const middleLeftStyle = ref(null)
const middleRightStyle = ref(null)
const touchScreen = {}
let currentView = 'first'

function onMiddleTouchStart(e) {
  touchScreen.startX = e.touches[0].pageX
}
function onMiddleTouchMove (e) {
  //console.log(e)
  const delatX = e.touches[0].pageX - touchScreen.startX
  const left = currentView === 'first' ? 0 : -window.innerWidth
  console.log(left,delatX)
  const offsetWidth = Math.min(0,(Math.max(-window.innerWidth, left + delatX)))
  touchScreen.percent = Math.abs(offsetWidth / window.innerWidth)
  console.log(touchScreen.percent,currentView)
  if (currentView === 'first'){
    if (touchScreen.percent > 0.2){
      currentShow.value = 'lyric'
    } else {
      currentShow.value = 'first'
    }
  } else {
    if (touchScreen.percent < 0.8) {
      currentShow.value = 'first'
    } else {
      currentShow.value = 'lyric'
    }
  }
  middleLeftStyle.value = {
    opacity: 1 - touchScreen.percent,
  }
  middleRightStyle.value = {
    transform: `translate3d(${offsetWidth}Px,0,0)`,
  }
}
function onMiddleTouchEnd (e) {
  let offsetWidth
  let opacity
  console.log(offsetWidth)
  console.log(currentShow.value === 'first')
  if (currentShow.value === 'first') {
    console.log('fisrt1')
    currentView = 'first'
    offsetWidth = 0
    opacity = 1
  } else {
    console.log('lyric1')
    currentView = 'lyric'
    offsetWidth = -window.innerWidth
    opacity = 0
  }
  const duration = 300
   middleLeftStyle.value = {
    opacity: opacity,
    transitionDuration: `${duration}ms`
  }
  middleRightStyle.value = {
    transform: `translate3d(${offsetWidth}px,0,0)`,
    transitionDuration: `${duration}ms`
  }
  console.log(middleLeftStyle,middleRightStyle.value)
}

</script>
<template>
    <Transition name="player">
    <div class="wrapper" v-show="fullScreen">
    <!-- <div class="background">
      <img  :src="state.playList?.[state?.currentIndex]?.al.picUrl">
    </div> -->
    <img class="img" :src="state.playList?.[state?.currentIndex]?.al.picUrl">
    <div class="container" >
      <div class="top">
        <span class="back iconfont" @click="store.goBack"> &#xe613; </span>
        <div class="top-content">
          <div class="song">{{state.playList?.[state?.currentIndex]?.name}}</div>
          <div class="singer">{{state.playList?.[state?.currentIndex]?.ar[0]?.name}}</div>
        </div>
      </div>
      <div class="middle"
      @touchstart.prevent="onMiddleTouchStart"
      @touchmove.prevent="onMiddleTouchMove"
      @touchend.prevent="onMiddleTouchEnd"
      >
        <div class="first" :style="middleLeftStyle">
          <div class="first-wrapper">
            <div class="bgm"><img ref="bgm" src="/public/bgm.png" :class="{play: state.playing}"></div>
            <div class="middle-turntable" ref="turntable">
              <img src="/public/R.png">
              <div class="pic" :style="{'background-image': `url(${state.playList?.[state?.currentIndex]?.al?.picUrl})`}"></div>
            </div>
            <div class="icon">
              <div class="iconfont love">&#xe8c3;</div>
              <div class="iconfont download">
                <img src="/public/icon_download.png">
              </div>
              <div class="iconfont turn-on"></div>
              <div class="iconfont comment">
                <img src="/public/icon_comment.png">
              </div>
              <div class="iconfont more"></div>
          </div>
          </div>
        </div>
        <!-- <div :class="{'mode': mode}">{{modeNotice}}</div> -->
        <Scroll class="middle-lyric" :style="middleRightStyle">
          <div class="lyric-wrapper" ref="lyricScrollRef">
            <li v-for="(item, index) in currentLyric?.lines" :class="{
              'currentLineNum': currentLineNum === index
            }" ref="lyricListRef">{{ item.txt }}</li>
          </div>
        </Scroll>
      </div>
      <div :class="{mode}">{{modeNotice}}</div>
      <div class="bottom">
        <!--  -->
        <div class="progress">
          <div  @click="onClick">{{currentTime}}</div>
          <div class="progress-bar" ref="progressAll" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd" @click="onClick">
            <div class="progress-bar-cur" ref="progressed" :style="{width: `${width}%`}">
              <div class="circle"></div>
            </div>
          </div>
          <div>{{duration}}</div>
        </div>
        <div class="bottom-icon">
          <div class="iconfont class" @click="handleMode">
            <span v-show="state.playMode === 0">&#xe61c;</span>
            <span v-show="state.playMode === 1">&#xe601;</span>
            <span v-show="state.playMode === 2">&#xe6a3;</span>
          </div>
          <div class="iconfont last" @click="lastSong">&#xe727;</div>
          <div class="iconfont play" @click="controlPlay">
            <span v-show="state.playing">&#xea81;</span> 
            <span v-show="!state.playing" class="pause">&#xe628;</span>
          </div>
          <div class="iconfont next" @click="nextSong">&#xe728;</div>
          <div class="iconfont love" @click="handleLove(store.currentSong().id)">
            <span v-show="showLove" class="love-icon">&#xe602;</span>
            <span v-show="!showLove">&#xe8c3;</span>
          </div>
        </div>
      </div>
    <!-- <div class="minplay">minplay</div> -->
     <!-- @canplay="ready" -->
      <audio ref="audioRef" @error="error" @timeupdate="updataTime" @ended="endAudio"></audio>
    </div>
    </div>
  </Transition>
  <MiniPlayer/>

</template>
<style scoped lang="scss">
.wrapper{
  z-index:500;
  position: absolute;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,1);
  font-family: Roboto, sans-serif;
  font-weight: 500;
}
// .background{
  
//   height: 100%;
//   width: 100%;
  .img{
    position: absolute;
    object-fit: cover;
    height: 100%;
    width: 100%;
    filter: blur(79Px);
  }
  

  .container{
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 15Px 0;
    color:#fff;
    //z-index:300;
    .top {
      position: relative;
      padding: 0Px 0 5Px 0 ;
      .back{
        position: absolute;
        font-size: 21Px;
        top:50%;
        transform: translateY(-100%);
        font-weight: 600;
        padding:0 9Px;
      }
      &-content{
        width: 91%;
        text-align: center;
        font-size: 17Px;
        font-weight: 500;
        margin: 0 25Px;
        .song {
          width: 100%;
          text-wrap: wrap;
        }
        .singer{
          padding-top: 10Px;
          font-size: 15Px;
          color:rgba(255,255,255,.5);
          font-weight: 500;
        }
      }
    }
    .middle{
      position: fixed;
      width: 100%;
      top:80Px;
      bottom: 150Px;
      white-space: nowrap;
      font-size: 0;
      .first{
        display: inline-block;
        position: relative;
        vertical-align: top;
        height: 100%;
        width: 100%;
         .first-wrapper {
           position: absolute;
            left: 10%;
            top: 0;
            width: 80%;
            box-sizing: border-box;
            height: 100%;
         }
        .bgm{
          position: relative;
          height: 15%;
          width: 50%;
          z-index:500;
          margin-left: auto;
          img {
            width: 60%;
            object-fit:contain;
            transform-origin: -5Px 5Px ;
            transform: rotate(-35deg);
            transition: transform .5s ease-in-out;
          }
          .play {
            transform: rotate(-5deg);
          }
        }
      }
      &-turntable {
        position: relative;
        height: 150px;
        width: 150px;
        animation: rotate 15s linear infinite;
        img{
          height: 100%;
          width: 100%;
        }
        .pic{
          position: absolute;
          top:50%;
          left: 50%;
          width: 75px;
          height: 75px;
          transform: translate(-50%,-50%);
          border-radius: 50%;
          background-size: cover;
        }
      }
      .icon {
        position:absolute;
        bottom:0;
        display: flex;
        align-items: center;
        min-height:25Px;
        width: 100%;
        justify-content: space-around;
          .love {
            font-size: 30Px;
            color:rgba(255,255,255,.8);
          }
          .download, .comment {
            height: 30Px;
            width: 30Px;
            img {
              height: inherit;
              width: inherit;
            }
          }
      }
      &-lyric{
        height: 100%;
        width: 100%;
        display: inline-block;
        vertical-align: top;
        overflow-y: auto;
        .lyric-wrapper {
          width: 80%;
          margin: 0 auto;
          overflow: hidden;
          text-align: center;
        }
        li {
          color:#ffffff80;;
          font-weight: 400;
          font-size: 19Px;
          line-height: 39Px;
        }
        .currentLineNum{
          color:#fff;
        }
      }
    }
    .mode{
        position: absolute;
        top:80%;
        left: 50%;
        transform: translateX(-50%);
        background-color: #fff;
        border-radius: 15Px;
        padding: 9Px;
        color:#000;
        font-size: 11Px;
      }
    .bottom{
      padding: 15Px;
      height: 100Px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      .progress{
        display: flex;
        font-size: 15Px;
        align-items: center;
        color:#fff;
        &-bar{
          flex:1;
          height: 3Px;
          background-color: rgb(185, 185, 185);
          margin: 0 15Px;
          border-radius: 3Px;
          &-cur{
            position: relative;
            width: 0%;
            height: inherit;
            background-color: #fff;
            .circle{
              position: absolute;
              right: 0;
              width: 7Px;
              height: 7Px;
              border-radius: 50%;
              background-color: #fff;
              top:50%;
              transform: translateY(-50%);
            }
          }
        }
      }
      &-icon {
        display: flex;
       justify-content: space-around;
       align-items: center;
       .class, .love{
        font-size: 27Px;
        width: 29Px;
       }
       .last, .next{
        font-size: 15Px;
       }
       .play{
        font-size: 30Px;
        position: relative;
        // .pause{
        //   position: absolute;
        //   top:0;
        //   left: 0;
        // }
       }
       .love-icon{
        color:$color-theme;
       }
      }
    }
  }
  .minplay{
    position: relative;
    //z-index: 500;
    color:white;
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
  .player-enter-active, .player-leave-active {
    transition: all .6s;
    .top , .bottom{
      transition: all .6s cubic-bezier(0.45,0,0.55,1);
    }
  }
  .player-enter-from, .player-leave-to {
      opacity: 0;
      .top {
        transform: translate3d(0,-100Px, 0);
      }
      .bottom {
        transform: translate3d(0,100Px, 0);
      }
  }
  //  .player-enter-active {
  //     animation-name: slideInUp;
  //     animation-duration: 0.3s;
  //     animation-fill-mode: both;
  //   }
  // .player-leave-active {
  //     animation-name: slideOutDown;
  //     animation-duration: 0.5s;
  //     animation-fill-mode: both;
  // }
// @keyframes slideInUp {
//     0% {
//         transform: translate3d(0, 100%, 0);
//         visibility: visible;
//     }
 
//     to {
//         transform: translateZ(0);
//     }
// }
// @keyframes slideOutDown {
//     0% {
//         transform: translateZ(0);
//     }
 
//     to {
//         visibility: hidden;
//         transform: translate3d(0, 100%, 0);
//     }
// }

</style>