<template>
  <div class="header">
    <div class="iconfont more">&#xe62a;</div>
    <div class="iconfont search" @click="$router.push('/search')">
      <i class="iconfont search_icon">&#xe752;</i>
      <input/>
    </div>
    <div class="iconfont voice">&#xe697;</div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.header {
  padding: 0 6Px ;
  margin: 5Px 0;
  display: flex;
  align-items: center;
  height: 39Px;
  color:#000;
  .more{
    font-size: 27Px;
  }
  .search {
    flex: 1;
    margin: 0 10Px;
    height: 30Px;
    background-color: $color-background-d;
    padding: 3Px 19Px;
    border-radius: 29Px;
    display: flex;
    align-items: center;
    &_icon {
      left: 13Px;
      font-size:19Px;
      color:$color-text-ll;
    }
    input{
      margin-left: 6Px;
      background-color: transparent;
      border: none;
      outline: none;
    }
  }
  .voice{
    line-height: 29Px;
    font-size:27Px;
  }
}
</style>
