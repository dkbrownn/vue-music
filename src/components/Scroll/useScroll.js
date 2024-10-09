import BScroll from "@better-scroll/core"

export default function useScroll (wrapperRef, options) {
  const scroll = ref(null)
  onMounted(() => {
    scroll.value = new BScroll(wrapperRef, options)
  })
  onUnmounted(() => {
    scroll.value.destroy()
  })
}