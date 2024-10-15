<template>
  <div class="tab">
    <router-link class="tab-item" v-for="tab in tabs" :key="tab.path" :to="tab.path">
      <div class="tab-link iconfont">
        <span v-html="tab.html"></span>
      </div>
      <!-- <span class="tab-name">{{ tab.name }}</span> -->
    </router-link>
  </div>
</template>

<script setup>
  const tabs = [
    {
      html: '&#xe600;',
      path: '/recommend',
      name: '推荐'
    },
    {
      html: '&#xe732;',
      path: '/find',
      name: '发现'
    },
    {
      html: '&#xe98d;',
      path: '/roam',
      name: '漫游'
    },
    {
      html: '&#xe607;',
      path: '/dynamics',
      name: '动态'
    },
    {
      html: '&#xe626;',
      path: '/my',
      name: '我的'
    }
  ]
</script>

<style lang="scss" scoped>
  .tab {
    display: flex;
    height: 59Px;
    font-size: $font-size-medium;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    box-sizing:border-box;
    padding-bottom: 6Px;
    background-color: rgb(239, 239, 239,.3);
    align-items: end;
    .tab-item {
      flex: 1;
      align-items: center;
      display: flex;
      flex-direction: column;
      justify-content: end;
      height: 50Px;
      color:#000;
      text-decoration: none;
      .tab-link{
        width: 21Px;
        height: 21Px;
        display: block;
        padding: 3Px;
        span{
          color:#646363;
          font-size: 21Px;
          height: 21Px;
          width: 21Px;
          font-weight: 300;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
      }
      .tab-name {
        padding: 1Px 0 0 0;
        font-size: 11Px;
      }
      &.router-link-active {
        .tab-link {
          background-color:$color-theme;
          border-radius: 50%;
          color: $color-img;
          span{
            color:#fff;
            
          }
        }
        .tab-name {
          color: $color-theme;
        }
      }
    }
  }
</style>
