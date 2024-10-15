import { usePlayStateStore } from "@/store/playerState"

export default function useMode () {
  const store = useStore ()
  const playMode = computed(() => store.state.playMode)
  const modeIcon = computed(() => {

  })
}