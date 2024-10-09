import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import Recommand from '@/components/recommand/index.vue'
import Detail from '@/views/Detail.vue'
import FindPage from '@/views/FindPage.vue'
import music from '@/components/Pages/music.vue'
import artists from '@/components/Pages/artists.vue'
import Dj from '@/components/Pages/dj.vue'
import Mv from '@/components/Pages/mv.vue'
import bangdan from '@/components/Pages/bangdan.vue'
import Search from '@/views/Search.vue'
import SingerDetail from '@/views/SingerDetail.vue'
import Dynamic from '@/views/Dynamic.vue'
import Suggestion from '@/components/SearchPages/suggestion.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      name: 'home',
      component: HomePage,
      redirect: '/recommend',
      children: [
        {
          path: 'recommend',
          name: 'recommend',
          component: Recommand,
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
          component: Recommand,
        },
        {
          name: 'dynamics',
          path: 'dynamics',
          component: Dynamic,
        },
        {
          name: 'my',
          path: 'my',
          component: Recommand,
        },
        {
          name: 'user',
          path: 'user',
          component: Recommand,
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
    }
  ],
})
export default router