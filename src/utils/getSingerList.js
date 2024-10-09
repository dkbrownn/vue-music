import { getTest } from "@/api/test"
import pinyin from "pinyin"
import { ref } from 'vue'
export async function sortSinger  () {
  const res = await getTest(100)
  console.log(res.data.artists)
  let list = res.data.artists
  list = list.map((value) => {
   const name = pinyin(value.name, {
      mode: "surname", 
      style: "normal",
    })[0][0].charAt(0).toUpperCase()
    value['PinYin'] = name
    return value
  })
  list.sort((a,b) => {
    return a['PinYin'] > b['PinYin'] ?  1 : a['PinYin'] == b['PinYin'] ? 0 : -1
  })
  list = list.reduce((acc, cur) => {
    if (acc[cur.PinYin]){
      acc[cur.PinYin].push(cur)
    } else {
      acc[cur.PinYin] = [cur]
    }
    return acc
  }, {})
  console.log(list)
  return { list }
}