<template>
  <div class="tab">
    <router-link class="tab-item" v-for="(tab, index) in tabs" :key="tab.path" :to="tab.path" @click="handleTab(index)"
    :class="{
      trans: index === currentTab
    }"
    >
      <div class="tab-link iconfont">
        <span v-html="tab.html"></span>
      </div>
      <span class="tab-name">{{ tab.name }}</span>
    </router-link>
  </div>
</template>

<script setup>
const currentTab = ref(1)
const handleTab = (index) => {
  currentTab.value = index
}
  const tabs = [
    {
      html: '&#xe600;',
      path: '/recommend',
      name: '推荐'
    },
    {
      html: '&#xe688;',
      path: '/find',
      name: '发现'
    },
    {
      html: '&#xe60b;',
      path: '/roam',
      name: '漫游'
    },
    {
      html: '&#xe60c;',
      path: '/dynamics',
      name: '动态'
    },
    {
      html: '&#xe60d;',
      path: '/my',
      name: '我的'
    }
  ]
</script>

<style lang="scss" scoped>
  .tab {
    display: flex;
    height: 50Px;
    font-size: $font-size-medium;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    box-sizing:border-box;
    background-color: rgb(239, 239, 239,.3);
    align-items: end;
    box-shadow: 4Px 0PX 9Px 3Px #e7e7e7;
    .tab-item {
      flex: 1;
      align-items: center;
      display: flex;
      flex-direction: column;
      justify-content: end;
      height: 50Px;
      color:#000;
      text-decoration: none;
      transition: all .5s;
      transform: translateY(15Px);
      .tab-name {
        padding: 3Px;
        padding-top:5Px;
        font-size: 11Px;
        transition: all .5s;
      }
      .tab-link{
        span{
          transition: all .5s;
          color:#757474;
          font-size: 25Px;
          height: 21Px;
          width: 21Px;
          font-weight: 300;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
      }
      &.router-link-active {
        .tab-link {
         // background-color:$color-theme;
          //border-radius: 50%;
          span {
            color:$color-theme;
          }
          
        }
        .tab-name {
          color: $color-theme;
        }
      }
    }

    .trans {
       transform: translateY(0);
    }
  }
</style>
