<template>
  <div class="header">
    <div class="iconfont more">&#xe62a;</div>
    <div class="tabs">
      <RouterLink to="/find/music" class="tab-link"><div></div><span>音乐</span></RouterLink>
      <RouterLink to="/find/artist"  class="tab-link"><div></div><span>歌手</span></RouterLink>
      <RouterLink to="/find/dj"  class="tab-link"><div></div><span>电台</span></RouterLink>
      <RouterLink to="/find/bangdan"  class="tab-link"><div></div><span>榜单</span></RouterLink>
      <RouterLink to="/find/mv"  class="tab-link"><div></div><span>我的</span></RouterLink>
    </div>
    <div class="iconfont voice" @click="$router.push('/search')">&#xe752;</div>
  </div>

    <RouterView/>

</template>

<script setup>
</script>

<style lang="scss" scoped>
.header {
  padding: 0 15Px ;
  margin: 5Px 0;
  display: flex;
  align-items: center;
  height: 39Px;
  color:#000;
  .more{
    font-weight: 700;
    font-size: 9px;
  }
  .tabs{
    padding: 0Px 9Px;
    width: 391Px;
    display: flex;
    text-wrap: nowrap;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: 8.5px;
    .tab-link{
      padding: 6Px 0 6Px 0;
      margin: 0 9Px;
      line-height: 39Px;
      position: relative;
      color:rgba(0,0,0,.7);
    } 
    .router-link-active{
      color:#000;
      font-weight: 700;
      font-size: 9.5px;
      // div{
      //   position: absolute;
      //   z-index:-1;
      //   width: 55Px;
      //   height: 55Px;
      //   background-color: rgb(171, 171, 171,.3);
      //   top:50%;
      //   left: 50%;
      //   transform: translate(-50%,-50%) scale(1);
      //   border-radius: 50%;
      //   opacity:0;
      //   animation: tabLink .6s ;
      // }
    }
  }
  .voice{
    line-height: 29Px;
    font-size: 9px;
    font-weight: 700;
  }
}
@keyframes tabLink {
  0% {
    opacity: 0;
    transform: translate(-50%,-50%) scale(0);
  }
  50% {
    opacity: 1;
   transform: translate(-50%,-50%) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%,-50%) scale(0);
  }
}
@media screen and (min-width: 500Px) {
  .more {
    font-size: 21Px;
  }
  .tabs {
    font-size: 19Px;
  }
  .router-link-active{
    font-size: 21Px;
  }
  .voice {
     font-size:21Px;
  }
}
@media screen and (max-width: 500Px) {
  .more {
    font-size: 19Px;
  }
  .tabs {
    font-size: 15Px;
  }
  .router-link-active{
      font-size: 17Px;
  }
  .voice {
    font-size:19Px;
  }
}
</style>
