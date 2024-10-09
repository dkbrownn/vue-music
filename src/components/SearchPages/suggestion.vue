<script setup>
const props = defineProps({
  suggestion: {
    type: Array,
    default: []
  }
})
</script>

<template>
<div>
  <div class="suggest" v-for="(i, index) in suggestion" :key="index">
    <span class="iconfont suggest-icon">&#xe752;</span>
    <span class="suggest-content">{{i.keyword}}</span>
  </div>
</div>
</template>

<style scoped lang='scss'>
.suggest{
  font-size: 21Px;
  padding:9Px 5Px;
  display: flex;
  &-icon{
    font-size: 19Px;
    margin-right: 19Px;
  }
  &-content{
    display: inline-block;
    width: 100%;
    border-bottom: 1Px solid $color-text-d;
  }
}
</style>