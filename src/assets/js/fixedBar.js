export default function useFixed (listObj) {
  const groupRef = ref(null)
  const listHeights = ref([])
  const scrollY = ref(0)
  const currentIndex = ref(0)
  const distance = ref(0)
  const show = ref(1)
  const fixedTitle = computed(() => {
    const List = Object.keys(listObj.value)
    const currentGroup = List[currentIndex.value]
    return currentGroup ?  currentGroup : ''
  })
  watch(listObj, async () => {
    await nextTick()
    calculate()
  })
  watch(scrollY, (newY) => {
    newY <= 0 ? show.value = 0 : show.value = 1
    const listHeightsVal =  listHeights.value
    for (let i = 0; i<listHeightsVal.length - 1; i++) {
      const heightTop = listHeightsVal[i]
      const heightBottom = listHeightsVal[i+1]
      if (newY >= heightTop && newY <= heightBottom)
        currentIndex.value = i
    }
  })
  function calculate () {
    const list = groupRef.value.children
    let height = 0
    const listHeightsVal =  listHeights.value

    listHeightsVal.length = 0
    listHeightsVal.push(height)
    for (let i = 0; i<list.length; i++) {
      height += list[i].clientHeight
      listHeightsVal.push(height)
    }
  }
  function onScroll (pos) {
    scrollY.value = -pos.y
  }
  return { groupRef, onScroll, fixedTitle, currentIndex, show }
}