<script setup>
import useScroll from './useScroll.js'
const props = defineProps({
  click:{
    type: Boolean,
    default: true
  },
  scrollX: {
    type: Boolean,
    default: false
  },
  probeType: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['scroll'])
const rootRef = ref(null)
const scroll = useScroll(rootRef, props, emit)
defineExpose({
  scroll
})
</script>

<template>
<div ref="rootRef">
  <slot></slot>
</div>
</template>

<style scoped>

</style>