// 配置全局的过滤器
// 全局过滤器
import Vue from 'vue'
import moment from 'moment'

Vue.filter('time', (input, str = 'YYYY-MM-DD') => {
  return moment(input).format(str)
})
