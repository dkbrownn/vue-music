<template>
  <div class="loading">
    <div class="loading-content">
      <img width="24" height="24" src="./loading.gif">
      <p class="desc">{{title}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'loading',
    data() {
      return {
        title: '正在载入...'
      }
    },
    methods: {
      setTitle(title) {
        this.title = title
      }
    }
  }
</script>

<style lang="scss" scoped>
  // .loading {
  //   position: absolute;
  //   top: 50%;
  //   left: 50%;
  //   transform: translate3d(-50%, -50%, 0);
  //   .loading-content {
  //     text-align: center;
  //     img {
  //       color:#000;
  //     }
  //     .desc {
  //       line-height: 20px;
  //       font-size: 25Px;
  //       color: #bdbcbc;
  //     }
  //   }
  // }

  .loading {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    z-index:1000;
    .loading-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      text-align: center;
      img {
        color:#000;
      }
      .desc {
        line-height: 20px;
        font-size: 25Px;
        color: #bdbcbc;
      }
    }
  }
</style>
