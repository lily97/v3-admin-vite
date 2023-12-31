import axios from 'axios'
import { ElMessage } from 'element-plus'
import { getToken, removeToken } from './cache/cookies'
import router from '@/router'

// create an axios instance
const service = axios.create({
  baseURL: 'http://127.0.0.1:8081', // url = base url + request url
  timeout: 5000 // request timeout 
})
// request interceptor
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      ElMessage({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return res
      // return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    ElMessage({
      message: error.msg,
      type: 'error',
      duration: 2 * 1000,
      onClose: () => {
        removeToken();
        router.push({ path: '/login' })
      }
    })

    return Promise.reject(error)
  }
)

export default service
