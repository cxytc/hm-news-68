import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入组件
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'
// 全局引入UserEdit文件
import UserEdit from '../views/UserEdit.vue'
// 全局引入MyFollow.vue
import MyFollow from '../views/MyFollow.vue'
// 全局引入MyComment
import MyComment from '../views/MyComment.vue'
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [
  // 指定了每一个路由都可以有一个name属性
  { path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'register' },
  { path: '/user', component: User, name: 'user' },
  { path: '/useredit', component: UserEdit, name: 'useredit' },
  { path: '/myfollow', component: MyFollow, name: 'myfollow' },
  { path: '/mycomment', component: MyComment, name: 'mycomment' }
]

const router = new VueRouter({
  routes
})
// 前置守卫兵
router.beforeEach(function (to, from, next) {
  const token = localStorage.getItem('token')
  // 需要拦截的所有页面
  const authUrls = ['/user', '/useredit', '/myfollow', 'mycomment']
  if (!authUrls.includes(to.path) || token) {
    next()
  } else {
    router.push('/login')
  }
})

export default router
