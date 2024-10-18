import { createRouter, createWebHistory } from 'vue-router'
const HomePage = () => import('@/views/HomePage.vue')
const Recommand = () => import('@/components/recommand/index.vue')
const Detail = () => import('@/views/Detail.vue')
const FindPage = () => import('@/views/FindPage.vue')
const music = () => import('@/components/Pages/music.vue')
const artists = () => import('@/components/Pages/artists.vue')
const Dj = () => import('@/components/Pages/dj.vue')
const Mv = () => import('@/components/Pages/mv.vue')
const bangdan = () => import('@/components/Pages/bangdan.vue')
const Search = () => import('@/views/Search.vue')
const SingerDetail = () => import('@/views/SingerDetail.vue')
const Dynamic = () => import('@/views/Dynamic.vue')
const Suggestion = () => import('@/components/SearchPages/suggestion.vue')
const MyHis = () => import('@/views/MyHis.vue')
const MyLove = () => import('@/views/MyLove.vue')
const MusicsList = () => import('@/views/MusicsList.vue')
const NotFind = () => import('@/views/404.vue')
import Login from '@/views/Login.vue'
// import HomePage from '@/views/HomePage.vue'
// import Recommand from '@/components/recommand/index.vue'
// import Detail from '@/views/Detail.vue'
// import FindPage from '@/views/FindPage.vue'
// import music from '@/components/Pages/music.vue'
// import artists from '@/components/Pages/artists.vue'
// import Dj from '@/components/Pages/dj.vue'
// import Mv from '@/components/Pages/mv.vue'
// import bangdan from '@/components/Pages/bangdan.vue'
// import Search from '@/views/Search.vue'
// import SingerDetail from '@/views/SingerDetail.vue'
// import Dynamic from '@/views/Dynamic.vue'
// import Suggestion from '@/components/SearchPages/suggestion.vue'
// import MyHis from '@/views/MyHis.vue'
// import MyLove from '@/views/MyLove.vue'
// import MusicsList from '@/views/MusicsList.vue'
// import NotFind from '@/views/404.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      name: 'home',
      component: HomePage,
      redirect: '/find',
      children: [
        {
          path: 'recommend',
          name: 'recommend',
          component: NotFind,
        },
        {
          name: 'find',
          path: 'find',
          component: FindPage,
          redirect: '/find/music',
          children: [
            {
              path: 'music',
              component: music,
            },
            {
              path: 'artist',
              component: artists,
            },
            {
              path: 'bangdan',
              component: bangdan,
            },
            {
              path: 'dj',
              component: Dj,
            },
            {
              path: 'mv',
              component: Mv,
            }
          ]
        },
        {
          name: 'roam',
          path: 'roam',
          component: NotFind,
        },
        {
          name: 'dynamics',
          path: 'dynamics',
          component: NotFind,
        },
        {
          name: 'my',
          path: 'my',
          component: NotFind,
        },
        {
          name: 'user',
          path: 'user',
          component: NotFind,
        },
        {
          name: '404',
          path:'404',
          component: NotFind,
        }
      ]
    },
    {
      path: '/songdetail/:id',
      name: 'detail',
      component: Detail
    },
    {
      path: '/search',
      name: 'search', 
      component: Search
    },
    {
      path: '/singerdetail/:id',
      name: 'singerdetail',
      component: SingerDetail
    },
    {
      path: '/test',
      component: Suggestion
    },
    {
      path: '/hislisten',
      component: MyHis,
    },
    {
      path: '/mylove',
      component:MyLove
    },
    {
      path: '/musiclists',
      component: MusicsList,
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ],
})
export default router