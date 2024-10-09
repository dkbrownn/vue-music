import axios from 'axios'
const instance = axios.create({
  baseURL: 'https://netease-cloud-music-api-eosin-six.vercel.app/',
  timeout: '10000'
})
export default instance