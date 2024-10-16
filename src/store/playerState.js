import { defineStore } from "pinia"
import { PLAY_MODE, SEARCH_KEY } from '@/assets/js/constant'
import { shuffle } from "@/utils/shuffle"
import { get, save } from "@/components/Player/useStorage"
export const usePlayStateStore = defineStore('playState', () => {

  const state = reactive({
    sequenceList: [],//原始列表
    playList: [],//播放列表
    playing: false,
    playMode: PLAY_MODE.sequence,
    currentIndex: 0, //当前播放索引
    fullScreen: false, //是否全屏
    favariteList: get('favariteList') || [],
    haveListen: get('haveListen') || []
  })

  const changeTest = () => {
    state.playing = true
  }
  const goBack = () => {
    console.log('back')
    state.fullScreen = false
  }

  //默认播放
   const selectPlay = (list, index, place = 0) => {
    state.sequenceList = list
    state.playList = list
    state.playMode = PLAY_MODE.sequence
    state.currentIndex = index
    state.fullScreen = true
    if (place === 1) {
      state.fullScreen = false
    }
  }
  //随机播放
  const randomPlay = (list, index, place = 0) => {
    state.playList = list
    state.playMode = PLAY_MODE.random
    state.currentIndex = index
    state.fullScreen = true
    if (place === 1) {
      state.fullScreen = false
    }
  }
  // 单曲循环
  const onlyPlay = (list, index, place = 0) => {
    state.playList = list
    state.playMode = PLAY_MODE.loop
    state.currentIndex = index
    state.fullScreen = true
    if (place === 1) {
      state.fullScreen = false
    }
  }

  //删除播放列表某一歌曲
  const deleteSong = (song, index) => {
    // if (index === state.currentIndex) {
    //   currentIndex++
    // }
    // else {
      
    // }
    state.playList.splice(index, 1)
    if (state.playMode === 0 || state.playMode === 1) {
      state.sequenceList.splice(index, 1)
    } else {
      const i = state.sequenceList.findIndex((item) => {
        return item.id === song.id
      })
      index === -1 ? '没找到' : state.sequenceList.splice(i, 1)
    }
  }

  //当前播放歌曲
  const currentSong = () => {
    return state.playList?.[state.currentIndex] || {}
  }
  // 添加歌单到列表里面
  const pushAllToPlayList = (list) => {
    state.playList.unshift(list)
    state.sequenceList.unshift(list)
    state.currentIndex = 0
  }
  // 添加歌曲到播放列表
  const pushToPlayList = (song) => {
    const index = state.playList.findIndex((item) => {
      return item.id === song.id
    })
    if (index !== -1) {
      return 1
    }
    state.playList.push(song)
    state.sequenceList.unshift(song)
    return 0
  }
  //添加到喜欢歌曲
  const pushToFavarite = (song) => {
    const index = state.favariteList.findIndex((item) => {
      return item.id === song.id
    })
    if (index !== -1) {
      return 1
    }
    state.favariteList.push(song)
    save('favariteList', state.favariteList)
    return 0
  }
  return { state, currentSong, selectPlay, changeTest, goBack, randomPlay, pushToPlayList, pushToFavarite, onlyPlay, deleteSong, pushAllToPlayList }
})
