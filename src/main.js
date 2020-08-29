import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入通用样式
import './styles/base.less'
import './styles/iconfont.css'
// 导入vant
import Vant from 'vant'
import 'vant/lib/index.css'
// 引入'amfe-flexible'安装包
import 'amfe-flexible'
// 全局引入hmheader组件
import HmHeader from './components/HmHeader.vue'
// 全局引入log
import HmLog from './components/HmLog.vue'
// 配置axios全局引入
import axios from 'axios'
// 把axios挂载到vue原型上
Vue.prototype.$axios = axios

// 给axios配置默认的baseURL,基准地址
axios.defaults.baseURL = 'http://127.0.0.1:3000'
Vue.component('hm-header', HmHeader)

Vue.component('hm-log', HmLog)

// 全局的把vant所有的组件都导入好了
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
