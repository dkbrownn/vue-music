export default function useFixed () {
  const groupRef = ref(null)
  const listHeights = ref([])
  /* watch(() => props.data, async () => {
    await nextTick()
    calculate()
  }) */
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
  return { groupRef }
}