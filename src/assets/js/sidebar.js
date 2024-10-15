export default function useShortcut(list, groupRef) {
  const scrollRef = ref(null)
  const touch = {}
  const shortcutList = computed(() => {
    const List = Object.keys(list.value)
    return List
  })
  function onTouchStart(e) {
    touch.y1 = e.touches[0].pageY
    console.log(e.target.dataset)
    
    const anchorIndex = parseInt(e.target.dataset.set)
    scroll(anchorIndex)
    touch.anchorIndex = anchorIndex
    console.log(scroll,anchorIndex)
  }
  function onTouchMove (e) {
    touch.y2 = e.touches[0].pageY
    const delta = (touch.y2 - touch.y1) / 18 | 0
    const anchorIndex = touch.anchorIndex + delta
    scroll(anchorIndex)
  }

  function scroll (anchorIndex) {
    if (isNaN(anchorIndex)) {
      return
    }
    anchorIndex = Math.max(0,Math.min(shortcutList.value.length - 1, anchorIndex))
    console.log(shortcutList.value,anchorIndex)
    const scroll = scrollRef.value.scroll
    const targetEl = groupRef.value.children[anchorIndex]
    scroll.scrollToElement(targetEl, 0)
  }
  return { shortcutList, onTouchStart, scrollRef, onTouchMove }
}