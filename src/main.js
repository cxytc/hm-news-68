import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入通用样式
import './styles/base.less'
import './styles/iconfont.css'
// 导入vant
import Vant, { Toast } from 'vant'
import 'vant/lib/index.css'
// 引入'amfe-flexible'安装包
import 'amfe-flexible'
// 全局引入hmheader组件
import HmHeader from './components/HmHeader.vue'
// 全局引入log
import HmLog from './components/HmLog.vue'
// 配置axios全局引入
import axios from 'axios'

// moment插件全局引入
import moment from 'moment'

// 全局引入HmNavltem.vue
import HmNavltem from './components/HmNavItem.vue'

// 把axios挂载到vue原型上
Vue.prototype.$axios = axios

// 给axios配置默认的baseURL,基准地址
axios.defaults.baseURL = 'http://127.0.0.1:3000'

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

Vue.component('hm-header', HmHeader)

Vue.component('hm-log', HmLog)

Vue.component('hm-nav', HmNavltem)

// 全局过滤器
Vue.filter('item', input => {
  return moment(input).format('YYYY-MM-DD')
})
// 全局的把vant所有的组件都导入好了
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
