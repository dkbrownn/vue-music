<script setup>
const show = ref(true)
const emit = defineEmits(['change'])
const close_toast = () => { 
  emit('change')
}
const show1 = ref(false)
const getShow = () => {
  show1.value = true
}
</script>

<template>
<transition name="slide">
  <div class="container-toast" v-show="show" @click="getShow">
  <div class="close" @click="close_toast">X</div>
  </div>
</transition>
</template>

<style lang="scss" scoped>
.container-toast{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height:270Px;
  background-color: aqua;
  border-top-left-radius: 15Px;
  border-top-right-radius: 15Px;
  .close{
    text-align: end;
    padding: 9PX 9Px;
  }
}

// 过渡动效
/* .toast-enter-from {
  height: 0;
}
.toast-enter-active,.toast-leave-active{
  transition: 3s  opacity  ease-out;
}
.toast-enter-to{
  height:270Px;
}
.toast-leave-to{
  height:0;
} */
 .slide-enter-active {
    animation-name: slideInUp;
    animation-duration: 0.3s;
    animation-fill-mode: both;
}
.slide-leave-active {
    animation-name: slideOutDown;
    animation-duration: 0.3s;
    animation-fill-mode: both;
}
@keyframes slideInUp {
    0% {
        transform: translate3d(0, 100%, 0);
        visibility: visible;
    }
 
    to {
        transform: translateZ(0);
    }
}
@keyframes slideOutDown {
    0% {
        transform: translateZ(0);
    }
 
    to {
        visibility: hidden;
        transform: translate3d(0, 100%, 0);
    }
}
.delay-leave-active {
    -webkit-animation-delay: 0.2s;
    -moz-animation-delay: 0.2s;
    -o-animation-delay: 0.2s;
    animation-delay: 0.2s;
}
</style>