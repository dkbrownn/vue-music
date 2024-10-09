import instance from "@/utils/instance"
//热门歌手
export const getTest = (limit) => {
  return instance({
    url: 'artist/list',
    params: {
      type: -1,
      area: -1,
      limit
    }
  })
}
//banner
export const Test = () => {
  return instance({
    url: '/banner?type=1'
  })
}
//游客登录
export const Login = () => {
  return instance({
    url: '/register/anonimous'
  })
}
//推荐歌单
export const Recommand = () => {
  return instance({
    url: '/personalized'
  })
}
//获取歌单详情
export const getRecommandContent = (id) => {
  return instance({
    url: '/playlist/detail',
    params: {
      id
    }
  })
}
//获取歌单所有歌曲
export const getRecommandContent1 = (id, limit = 3) => {
  return instance({
    url: '/playlist/track/all',
    params: {
      id,
      limit
    }
  })
}
// 获取所有榜单

export const getTopList = () => {
  return instance({
    url: '/toplist'
  })
}
//榜单摘要
export const getTopListSummary = () => {
  return instance({
    url: '/toplist/detail'
  })
}
//歌手top50
export const getTopFifty = (id) => {
  return instance({
    url: '/artist/top/song',
    params: {
      id
    }
  })
}
//歌手信息
export const getSingerInfo = (id) => {
  return instance({
    url: '/artist/detail',
    params: {
      id
    }
  })
}
//粉丝数量
export const getSingerFins = (id) => {
  return instance({
    url: '/artist/follow/count',
    params: {
      id
    }
  })
}
//歌手名获取或者检索歌手
export const getSingerName = (keyword) => {
  return instance({
    url: '/ugc/artist/search',
    params: {
      keyword
    }
  })
}
//云村平星馆
export const getContent = (keyword) => {
  return instance({
    url: '/starpick/comments/summary',
    params: {
      keyword
    }
  })
}
//热门电台
export const getDj = (limit = 30, offset = 0) => {
  return instance({
    url: '/dj/hot',
    params: {
      limit,
      offset
    }
  })
}
//全部MV
export const getMv = () => {
  return instance({
    url: '/mv/first',
  })
}
//搜索建议
export const getSuggestion  = (keywords, type = 'mobile') => {
  return instance({
    url: '/search/suggest',
    params: {
      keywords,
      type
    }
  })
}