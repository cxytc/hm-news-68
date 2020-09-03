import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入通用样式
import './styles/base.less'
import './styles/iconfont.css'

// 引入'amfe-flexible'安装包
import 'amfe-flexible'

// 全局组成组件
import './utlis/global'
// 全局配置axios请求
import './utlis/request'
// 全局注册过滤器
import './utlis/filters'
// 全局导入Vant
import './utlis/vant'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
