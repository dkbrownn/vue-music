<script setup>
import { useErrorStore } from '@/store/Error';
// watch(() => store.errorMessage, (newValue) => {
//   console.log('error', newValue);
// }, { immediate: true });
// setInterval(() => {
//   store.errorMessage = Math.random()
// },3000)
const store = useErrorStore()
console.log(store)
watch()
</script>

<template>
  <div class="error-response">
  </div>
</template>

<style scoped lang='scss'>
.error-response {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 25Px;
  padding: 1Px 10Px;
  text-align: center;
  background-color: rgba(0, 0, 0, .5);
  border-radius: 5PX;
}
</style>
