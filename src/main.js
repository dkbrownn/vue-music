import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router/index.js'
import { createPinia } from 'pinia'
import '@/assets/scss/index.scss'
import "amfe-flexible/index.js"
import { VueQueryPlugin } from '@tanstack/vue-query'
import lazyPlugin from 'vue3-lazy'
import loadingDirective from './components/loading/directive'

const app = createApp(App)

app.use(router).use(createPinia()).use(lazyPlugin,{
    loading: 'https://static.infinitytab.com/infinity-official/img/IMG-LOGO@2x.png'
  }
)
app.use(VueQueryPlugin).directive('loading', loadingDirective)

app.mount('#app')
