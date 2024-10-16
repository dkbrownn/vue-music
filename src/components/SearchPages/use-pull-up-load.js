import BScroll from "@better-scroll/core"
import PullUp from "@better-scroll/pull-up"
import ObserveDom from '@better-scroll/slide'

BScroll.use(PullUp)
BScroll.use(ObserveDom)
export default function usePullUpLoad (requestData) {
  const scroll = ref(null)
  const rootRef = ref(null)
  const isPullUpLoad = ref(false)

  onMounted(() => {
    const scrollVal = scroll.value = new BScroll(rootRef.value, {
      pullUpLoad: true,
      observeDOM: true,
      click: true
    })

    scrollVal.on('pullingUp', pullingUpHandler)

    async function pullingUpHandler() {
      // if (preventPullUpLoad.value) {
      //   scrollVal.finishPullUp()
      //   return
      // }
      isPullUpLoad.value = true
      await requestData()
      scrollVal.finishPullUp()
      scrollVal.refresh()
      isPullUpLoad.value = false
    }
  })

  onUnmounted(() => {
    scroll.value.destroy()
  })

  return {
    scroll,
    rootRef,
    isPullUpLoad
  }
}