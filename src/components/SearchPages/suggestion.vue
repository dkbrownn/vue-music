<script setup>

const props = defineProps({
  suggestion: {
    type: Array,
    default: []
  },
  haveResult: {
    type: Boolean,
    default: true
  }
})
const emit = defineEmits(['emit-search'])

const search = (keyword) => {
  console.log('click')
  emit('emit-search', keyword)
}
const loading = computed(() => {
  console.log(props.suggestion.length === 0 && props.haveResult, props.suggestion)
  return props.suggestion.length === 0 && props.haveResult
})
</script>

<template>
<div v-loading="loading">
  <template v-if="suggestion?.length !== 0">
    <div class="suggest" v-for="(i, index) in suggestion" :key="index" @click="search(i.keyword)">
      <span class="iconfont suggest-icon">&#xe752;</span>
      <span class="suggest-content">{{i.keyword}}</span>
    </div>
  </template>
  <div class="no-result" v-if="!loading && Array.isArray(suggestion) && suggestion?.length == 0">暂无搜索结果</div>
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
.no-result {
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
</style>