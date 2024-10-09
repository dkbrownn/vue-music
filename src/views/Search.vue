<script setup lang='ts'>
import { getTopList, getRecommandContent1, getSuggestion } from '@/api/test'
const suggestion = ref([])
const list = ref([])
const info = ref([])
const getListDetail = async () => {
  const res = await getTopList()
  list.value = res.data.list.map((item) => {
    return { id:item.id,name:item.name }
  }).slice(0,6)
  const res1= await getRecommandContent1(19723756, 20)
  info.value = res1.data.songs
  // const res1 = await getRecommandContent1()
  console.log(res, list, info)
}
onMounted(() => {
  getListDetail()
})
const inputVal = ref('')
const pushVal = async () => {
  if (inputVal.value) {
    console.log(inputVal.value)
    const res3 = await getSuggestion(inputVal.value)
    suggestion.value = res3.data.result.allMatch
    console.log(suggestion.value)
  }
}
const result = ref(false)
const show = computed(() => {
  return (inputVal.value == '' || suggestion.value.length == 0) && result.value === false
})
const getResult = () =>{
  result.value = true
}
const router = useRouter()
const handleBack = () => {
  if (!inputVal.value) {
    router.back()
  } else {
    inputVal.value = ''
    result.value = false
  }
}
</script>

<template>
  <div class="header">
    <div class="iconfont more" @click="handleBack">&#xe612;</div>
    <div class="iconfont search">
      <i class="iconfont search_icon">&#xe752;</i>
      <input placeholder="搜索歌曲、歌手" v-model="inputVal" @input="pushVal" @change="getResult"/>
    </div>
    <div class="iconfont voice" @click="getResult">搜索</div>
  </div>
  <div class="container">
    <div v-show="show">
      <div class="search-his">
        <div>搜索历史</div>
        <div class="search-his-content" v-for="i in 9">罗生门</div>
        <div class="search-his-content">苹果香</div>
        <div class="search-his-content">歌手列表</div>
      </div>
      <div class="search-love">
        <div>猜你喜欢</div>
        <div class="search-love-content">罗生门</div>
        <div class="search-love-content">苹果香</div>
        <div class="search-love-content">歌手列表</div>
      </div>
      <div class="bangdan">
        <div class="title">飙升榜</div>
        <div class="content" v-for="i in info">{{i.name}}</div>
      </div>
    </div>
    <Suggestion v-show="!show && !result" :suggestion="suggestion"/>
    <div v-show="result">
      <SearchResult />
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  padding: 0 3Px ;
  margin: 5Px 0;
  display: flex;
  align-items: center;
  height: 39Px;
  .more{
    font-size: 27Px;
  }
  .search {
    flex: 1;
    margin: 0 10Px;
    height: 30Px;
    background-color: $color-highlight-background;
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
    font-size:17Px;
  }
}
.container{
  position: absolute;
  top:50Px;
  left: 0;
  right: 0;
  bottom: 15Px;
  padding:15Px 5Px 0 5Px;
  overflow-y:auto;
  .search-his, .search-love{
    font-size: 15Px;
    margin: 9Px;
    &-content{
      display: inline-block;
      margin:6Px 5Px 0 6Px;
      padding: 5Px 9Px;
      background-color: $color-highlight-background;
      border-radius: 17Px;
    }
  }
  .bangdan{
    margin:25Px 9Px 0 9Px;
    font-size: 25Px;
    background-color: $color-dialog-background;
    padding: 9Px;
    width:250Px;
    border-radius: 5Px;
    .title{
      border-bottom: 1Px solid $color-text-d;
      padding:5PX 0;
    }
    .content{
      font-size: 19Px;
      padding:5Px 0;
    }
  }
}
</style>