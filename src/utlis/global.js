// 用于全局注册组件
import Vue from 'vue'
// 全局引入hmheader组件
import HmHeader from '../components/HmHeader.vue'
// 全局引入log组件
import HmLog from '../components/HmLog.vue'
// 全局引入HmNavltem.vue组件
import HmNavltem from '../components/HmNavItem.vue'
// 全局引入HmPost 组件
import HmPost from '../components/HmPost.vue'
// 全局封装的粘性组件定位
import Hmsticky from '../components/HmSticky'
// 全局引入HmComment组件
import HmComment from '../components/HmComment.vue'
// 全局组件HmFloor 组件
import HmFloor from '../components/HmFloor.vue'

// 全局组件注册
Vue.component('hm-header', HmHeader)

Vue.component('hm-log', HmLog)

Vue.component('hm-nav', HmNavltem)

Vue.component('hm-post', HmPost)

Vue.component('hm-sticky', Hmsticky)

Vue.component('hm-comment', HmComment)

Vue.component('hm-floor', HmFloor)
