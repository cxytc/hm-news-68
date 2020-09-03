// 处理axios发送请求
import Vue from 'vue'

// 配置axios全局引入
import axios from 'axios'

// 全局引入router
import router from '../router'

// 导入vant
import { Toast } from 'vant'

// 把axios挂载到vue原型上
Vue.prototype.$axios = axios

// 给axios配置默认的baseURL,基准地址
const URL = 'http://127.0.0.1:3000'
axios.defaults.baseURL = URL
Vue.prototype.$base = URL

// 配置请求拦截器
axios.interceptors.request.use(function (config) {
  // console.log(config)
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // console.log(response)
  // 对响应数据做点什么
  const { statusCode, message } = response.data
  if (statusCode === 401 && message === '用户信息验证失败') {
    router.push('/login')
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    Toast('登陆失败哈哈')
  }
  return response
})
