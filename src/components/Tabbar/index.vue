<template>
  <div class="tab">
    <router-link class="tab-item" v-for="tab in tabs" :key="tab.path" :to="tab.path">
      <div class="tab-link iconfont" v-html="tab.html">
      </div>
      <span class="tab-name">{{ tab.name }}</span>
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
    height: 66Px;
    font-size: $font-size-medium;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    box-sizing:border-box;
    padding-bottom: 6Px;
    background-color: #0d101e ;
    .tab-item {
      flex: 1;
      align-items: center;
      display: flex;
      flex-direction: column;
      justify-content: end;
      height: 59Px;
      .tab-link {
        text-align: center;
        color: $color-text-l;
        font-size: 21Px;
        width:26Px;
        height: 26Px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .tab-name {
        padding: 6Px 0 0 0;
        font-size: 13Px;
      }
      &.router-link-active {
        .tab-link {
          background-color:$color-theme;
          border-radius: 50%;
          color: $color-img;
        }
        .tab-name {
        color: $color-theme;
      }
      }
    }
  }
</style>
