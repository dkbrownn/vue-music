<script setup>
const show = ref(true)
</script>

<template>
<div class="top-bar" @click="show = !show">
111
</div>
<div class="content">
  <div class="content-1" v-for="i in 19">
    <template v-if="show">
      <div class="user-icon"></div>
      <div class="dongtai-info">
        <div class="name">
          问西里呼噜
          <div class="orgin">根据你常听推荐</div>
        </div>
        <div class="wenan">老师，我终于明白这句话的意思了，可能，我真的会过时无用吧</div>
        <div class="grid">
          <div v-for="i in 9" class="pic">1</div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="user-icon user-icon-un skeleton"></div>
      <div class="dongtai-info dongtai-info-un">
        <div class="name name-un skeleton">
          
          <div class="orgin orgin-un skeleton"></div>
        </div>
        <div class="wenan wenan-un skeleton"></div>
        <div class="grid">
          <div v-for="i in 9" class="pic pic-un skeleton"></div>
        </div>
      </div>
    </template>
  </div>
</div>
</template>

<style scoped lang="scss">
.top-bar{
  line-height: 69Px;
  background-color: $color-background-d;
}
.content{
  position:absolute;
  top:79Px;
  bottom:0;
  left: 0;
  right: 0;
  padding: 5Px 5Px 0 5Px;
  overflow-y: auto;
  &-1{
    color:aliceblue;
    display: flex;
    padding:9Px 5PX;
    border-bottom: 1Px solid gray;
    .user-icon{
      min-height: 50Px;
      max-height: 50Px;
      max-width: 50Px;
      min-width: 50Px;
      background-color: bisque;
      border-radius: 50%;
      &-un{
        background-color: #e2e5e7;
      }
    }
    .dongtai-info{
      margin-left: 5Px;
      width: 100%;
      .name{
        height: 50Px;
        font-size: 21Px;
        padding: 5Px 0 0 0;
        &-un{
          background-color: #e2e5e7;
          border-radius: 6Px;
        }
        .orgin{
          padding: 5Px 0 0 0;
          font-size: 11Px;
          &-un{
            background-color: #e2e5e7;
          }
        }
      }
      .wenan{
        font-size: 17Px;
        margin: 5Px 0;
        &-un{
         background-color: #e2e5e7;
         border-radius: 3Px;
         height: 50Px;
        }
      }
      .grid{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;
        grid-row-gap: 3Px;
        grid-column-gap: 3Px;
        width: 100%;
        height: 150Px;
        .pic{
          background-color: chartreuse;
          &-un{
           background-color: #e2e5e7;
          }
        }
      }
    }
  }
}
.skeleton {
  animation: skeleton-text-loading 0.6s linear infinite;
  background-size: 400% 100%;
	background-position: 100% 50%;
  background-image: linear-gradient(
		90deg,
		hsl(200, 20%, 70%) 0%,
		hsl(200, 20%, 90%) 50%,
		hsl(200, 20%, 70%) 100%
  )
}
@keyframes skeleton-text-loading {
	0% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0 50%;
	}
}
@keyframes skeleton-img-loading {
	0% {
		background-color: hsl(200, 20%, 70%);
	}

	100% {
		background-color: hsl(200, 20%, 95%);
	}
}
</style>