import { getSongLyric } from "@/api/test"
import Lyric from "lyric-parser"
import { usePlayStateStore } from "@/store/playerState"

export default function useLyric (currentTime, currentSong, songReady) {
  const store = usePlayStateStore()
  const lyricScrollRef =ref(null) 
  const lyricListRef = ref(null)
  const pureMusicLyric = ref('')
  const playingLyric = ref('')
  const currentLyric = ref(null)
  const currentLineNum = ref(-1)


  //监听歌曲切换，实现歌词切换
  watch(currentSong, async (newSong) => {
    if (!newSong.id) {
      return
    }
    console.log(newSong)
    stopLyric()
    currentLyric.value = null
    currentLineNum.value = -1
    pureMusicLyric.value = 0
    playingLyric.value = ''
    if (newSong.lrc !== undefined) {
      console.log(newSong.lrc)
      currentLyric.value = new Lyric(newSong.lrc.lyric, handleLyric)
      const hasLyric = currentLyric.value.lines.length
      if (hasLyric) {
        if (songReady.value) {
          playLyric()
        }
      }
      console.log('lrc')
      console.log(store.currentSong(),store.state.playList)
    } else {
      const res = await getSongLyric(newSong.id)
      console.log((res.data.lrc))
      newSong.lrc = res.data.lrc
      currentLyric.value = new Lyric( newSong.lrc.lyric, handleLyric)
      const hasLyric = currentLyric.value.lines.length
      if (hasLyric) {
        if (songReady.value) {
          playLyric()
        }
      }
      // console.log(currentLyric.value)
      // if (store.state.playing) {
      //   playLyric()
      // }
    }
  // 使用侦听器副作用清理器，解决用户高频点击浪费请求影响性能
  })



  //歌词播放函数
  function playLyric () {
    const currentLyricVal = currentLyric.value
    if (currentLyricVal) {
      console.log('seek1', currentLyricVal)
      console.log(currentTime.value * 1000)
      currentLyricVal.seek(currentTime.value * 1000)
    }
    console.log('seek3', currentLyricVal)
  }



  //停止歌词播放
  function stopLyric() {
    const currentLyricVal = currentLyric.value
    console.log(currentLyricVal, currentLyric)
    if (currentLyricVal) {
      currentLyricVal.stop()
    }
  }



  // 钩子函数
  function handleLyric ({ lineNum, txt }) {
    console.log('text',lineNum, txt)
    console.log()
    currentLineNum.value = lineNum 
    playingLyric.value = txt
    const scrollComp = lyricScrollRef.value
    const listEl = lyricListRef.value
    if (!listEl) {
      return
    }
    console.log(scrollComp, listEl.children)
    if (lineNum > 5) {
      const lineEl = listEl.children[lineNum - 5]
      scrollComp.scroll.scrollToElement(lineEl, 1000)
    } else {
        scrollComp.scroll.scrollTo(0, 0, 1000)
    }
  }

  return {
    currentLyric,
    currentLineNum,
    pureMusicLyric,
    playingLyric,
    lyricScrollRef,
    lyricListRef,
    playLyric,
    stopLyric
  }
}