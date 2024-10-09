<template>
  <div class="header">
    <div class="iconfont more">&#xe62a;</div>
    <div class="tabs">
      <RouterLink to="/find/music" class="tab-link"><span>音乐</span></RouterLink>
      <RouterLink to="/find/artist"  class="tab-link"><span>歌手</span></RouterLink>
      <RouterLink to="/find/dj"  class="tab-link"><span>电台</span></RouterLink>
      <RouterLink to="/find/bangdan"  class="tab-link"><span>榜单</span></RouterLink>
      <RouterLink to="/find/mv"  class="tab-link"><span>MV</span></RouterLink>
    </div>
    <div class="iconfont voice" @click="$router.push('/search')">&#xe752;</div>
  </div>

    <RouterView/>

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
  .more{
    font-size: 27Px;
  }
  .tabs{
    padding: 0 9Px;
    width: 391Px;
    display: flex;
    overflow-y: auto;
    text-wrap: nowrap;
    margin: 0 auto;
    justify-content: center;
    font-size: 17Px;
    .router-link-active{
      border-bottom: 3Px solid $color-theme;
    }
    .tab-link{
      padding: 6Px 0 6Px 0;
      margin: 0 9Px;
      line-height: 39Px;
    } 
    span{
    }
  }
  .voice{
    line-height: 29Px;
    font-size:27Px;
  }
}

</style>
