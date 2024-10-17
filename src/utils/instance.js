import axios from 'axios'
import { useErrorStore } from '@/store/Error'

import { getActivePinia, setActivePinia } from 'pinia';
import { createPinia } from 'pinia';

// 如果 Pinia 尚未初始化，先手动设置
if (!getActivePinia()) {
  setActivePinia(createPinia());
}

const store = useErrorStore()
const instance = axios.create({
  baseURL: 'https://netease-cloud-music-api-eosin-six.vercel.app/',
  timeout: '10000'
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    //统一错误提示
    //token 失效，跳转登陆页面
    console.log(error.message === 'timeout of 10000ms exceeded')
    console.log(error.message === 'Network Error')

    if (error.message === 'timeout of 10000ms exceeded') {
     store.showError('请求超时') 
    } 
    else if (error.message === 'Network Error') {
      store.showError('网络异常')
    }
    else {
       store.showError(error.message)
    }

    return Promise.reject(error);
  });
export default instance