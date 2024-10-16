<script setup lang='ts'>
import { debounce } from 'throttle-debounce'
import { getTopList, getRecommandContent1, getSuggestion, searchResult } from '@/api/test'
import { getLocal, saveLocal } from '@/utils/use-storage';
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
//输入框输入
const inputVal = ref('')
// const deb = debounce(300, () => {
//   console.log('deb')
// })
// deb()
// deb()
// deb()
const haveResult = ref(true)
const debounceFunc = debounce(1000, async (value) => {
  if (value) {
    const res3 = await getSuggestion(value)
    suggestion.value = res3.data.result?.allMatch
    if (suggestion.value === undefined) {
      haveResult.value = false
    }
    console.log(suggestion.value, res3.data.result?.allMatch, haveResult.value)
  } else {
    console.log('111')
  }
})
const pushVal = (e) => {
  if (inputVal.value) {
    console.log(inputVal.value)
    suggestion.value = []
    debounceFunc(inputVal.value)
  } else {
    debounceFunc('')
    result.value = false
  }
  if (e.inputType === 'deleteContentBackward') {
    result.value = false
  }
}
const result = ref(false)
const show = computed(() => {
   return inputVal.value === ''
  // return inputVal.value == '' || suggestion.value?.length == 0 && result.value === false
})
const showSuggestion = computed(() => {
  if (!result.value && !show.value) {
    suggestion.value = []
  }
  return !result.value && !show.value
})
// 猜你喜欢和搜索历史
const his = ref(getLocal('his') || [])
const love = ref(['罗生门','汪苏泷','陈奕迅'])
console.log(getLocal('his'))

//  搜索确定功能
const getResult = (value) =>{
  if (value) {
    result.value = true
    his.value.push(inputVal.value)
    saveLocal('his', his.value)
  }
}

// 点击历史或猜你喜欢搜索
const handleClickSearch = (str) => {
  console.log('handleEmit')
  inputVal.value = str
  getResult(str)
}
// 点击删除搜索历史与喜欢
const handleDelete = (type) => {
  if (type === 0) {
    his.value = []
    saveLocal('his', his.value)
  }
  if (type === 1) {
    love.value = []
  }
}
//返回功能
const router = useRouter()
const handleBack = () => {
  if (!inputVal.value) {
    router.back()
  } else {
    inputVal.value = ''
    result.value = false
  }
}



//分页数据
const offset = ref(1) //分页 offset*limit
const resultSongs = ref([])
const resultSongList = ref([])
const resultSinger = ref([])

async function test (type) { 
  const res = await searchResult({ keywords: inputVal.value, type :type, offset: offset.value })
  console.log(res.data.result.hasMore)
  if (type === 1)
    resultSongs.value = res.data.result;
  if (type === 100)
    resultSinger.value =  res.data.result.artists
  if (type === 1000)
    resultSongList.value = res.data.result.playlists
}
provide('searchResult-song', resultSongs)
provide('searchResult-SongList', resultSongList)
provide('searchResult-singer', resultSinger)
provide('inputVal', inputVal)


</script>

<template>
<div class="wrapper">
  
  <div class="header">
    <div class="iconfont more" @click="handleBack">&#xe612;</div>
    <div class="iconfont search">
      <i class="iconfont search_icon">&#xe752;</i>
      <input placeholder="搜索歌曲、歌手" v-model="inputVal" @input="pushVal"/>
    </div>
    <div class="iconfont voice" @click="getResult(inputVal)">搜索</div>
  </div>
  <div class="container">
    
      <Scroll class="scroll" v-show="show && !result">
        <div>
          <div class="search-his">
            <div>搜索历史</div>
            <span class="iconfont" @click="handleDelete(0)" v-show="his.length">&#xe634;</span>
            <div class="search-his-content" v-for="i in his" @click="handleClickSearch(i)">{{ i }}</div>
          </div>
          <div class="search-love">
            <div>猜你喜欢</div>
            <span class="iconfont" @click="handleDelete(1)" v-show="love.length">&#xe634;</span>
            <div class="search-love-content" v-for="i in love" @click="handleClickSearch(i)">{{ i }}</div>
          </div>
          <div class="bangdan">
            <div class="title">飙升榜</div>
            <div class="content" v-for="(i, index) in info">
              <span class="span" :class="{'hot': index < 3}">{{ index + 1 }}</span><div :class="{'hot-t': index < 3}">{{i.name}}</div></div>
          </div>
          </div>
       </Scroll>
    
      <Suggestion v-show="showSuggestion" :suggestion="suggestion"  :haveResult="haveResult" @emit-search="handleClickSearch"/>
      <div v-if="result && !show">
        <SearchResult @get-data="test"/>
      </div>
  </div>

  
</div>
</template>

<style scoped lang="scss">
.wrapper{
  position: absolute;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(236, 243, 250);
  color:#000;
  
}
.header {
  padding: 0 9Px ;
  margin: 5Px 0;
  display: flex;
  align-items: center;
  justify-content:space-around;
  height: 39Px;
  background-color: rgb(236, 243, 250);
  position: relative;
  z-index:1;
  .more{
    font-size: 21Px;
  }
  .search {
    flex:1;
    height: 30Px;
    margin: 9Px;
    background-color: #fff;
    padding: 3Px 19Px;
    border-radius: 29Px;
    display: flex;
    align-items: center;
    &_icon {
      left: 13Px;
      font-size:19Px;
      color:#000;
    }
    input{
      width: 100%;
      margin-left: 6Px;
      background-color: transparent;
      border: none;
      outline: none;
      font-size: 17Px;
    }
  }
  .voice{
    line-height: 29Px;
    font-size:15Px;
  }
}
.container{
  position: absolute;
  top:50Px;
  left: 0;
  right: 0;
  bottom: 0;
  padding:15Px 5Px 0 5Px;
  background-color: rgb(236, 243, 250);
  .scroll {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  .search-his, .search-love{
    font-size: 15Px;
    margin: 9Px;
    position: relative;
    min-height: 25Px;
    &-content{
      display: inline-block;
      margin:6Px 5Px 0 6Px;
      padding: 6Px 9Px;
      background-color: #fff;
      border-radius: 17Px;
      font-size: 13Px;
    }
    .iconfont {
      position: absolute;
      right: 5Px;
      top:0;
      font-size: 17Px;
      color:rgba(0, 0, 0, 0.5)
    }
  }
  .bangdan{
    margin:25Px 9Px 15Px 9Px;
    font-size: 25Px;
    background-color: #fff;
    padding: 9Px;
    border-radius: 15Px;
    .title{
      border-bottom: 1Px solid $color-text-d;
      padding:5Px 0;
      border-bottom: 1Px solid rgba(0, 0, 0, 0.1);
    }
    .content{
      font-size: 17Px;
      padding:6Px 0;
      display: flex;
      align-items: center;
      color:rgba(0,0,0,.8);
      .span {
        padding-right: 19Px;
        font-size: 19Px;
        height: 100%;
        color:#000;
      }
      .hot {
        color:rgba(239, 69, 69, 0.9);
        font-weight: 500;
      }
      .hot-t {
        font-weight: 600;
        font-size: 16Px;
        color:#000;
      }
    }
  }
}
</style>