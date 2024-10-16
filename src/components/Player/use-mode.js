import { usePlayStateStore } from "@/store/playerState"
import { PLAY_MODE } from "@/assets/js/constant"
import { shuffle } from "@/utils/shuffle"
export default function useMode (place = 0) {
  const store = usePlayStateStore()
  const { state } = store
  const modeNotice = ref('')
  const mode = ref(false)
  const handleMode = () => {
  let type = state.playMode + 1
  type = (type % 3)
  if (type == 0) { 
    state.playMode = PLAY_MODE.sequence; modeNotice.value = '顺序循环' 
    const Id = store.currentSong().id
    const index = store.state.sequenceList.findIndex((song) => {
      return song.id === Id
    })
    store.selectPlay(store.state.sequenceList, index, place)
    console.log(store.state.playList, index)
  }
  if (type == 1) { 
    state.playMode = PLAY_MODE.loop; modeNotice.value = '单曲循环' 
    const Id = store.currentSong().id
    const index = store.state.sequenceList.findIndex((song) => {
      return song.id === Id
    })
    store.onlyPlay(store.state.playList, index, place)
  }
  if (type == 2) { 
    state.playMode = PLAY_MODE.random; modeNotice.value = '随机循环' 
    const Id = store.currentSong().id
    const list = shuffle(store.state.playList)
    //store.randomPlay(store.state.playList, index)
    const index = list.findIndex((song) => {
      return song.id === Id
    })
    console.log(list, index)
    store.randomPlay(list, index, place)
  }
  mode.value = true
  setTimeout(() => {
    mode.value = false
    modeNotice.value = ''
  },1000)
  }
  return {
    mode,
    modeNotice,
    handleMode
  }
}