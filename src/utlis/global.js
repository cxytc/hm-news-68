// 用于全局注册组件
import Vue from 'vue'
// 全局引入hmheader组件
import HmHeader from '../components/HmHeader.vue'
// 全局引入log组件
import HmLog from '../components/HmLog.vue'
// 全局引入HmNavltem.vue组件
import HmNavltem from '../components/HmNavItem.vue'

// 全局组件注册
Vue.component('hm-header', HmHeader)

Vue.component('hm-log', HmLog)

Vue.component('hm-nav', HmNavltem)
