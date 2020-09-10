import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入组件
import Login from '../views/user/Login.vue'
import Register from '../views/user/Register.vue'
import User from '../views/user/User.vue'
// 全局引入UserEdit文件
import UserEdit from '../views/user/UserEdit.vue'
// 全局引入MyFollow.vue
import MyFollow from '../views/user/MyFollow.vue'
// 全局引入MyComment
import MyComment from '../views/user/MyComment.vue'
// 全局引入我的收藏 MyStar
import MyStar from '../views/user/MyStar.vue'
// 全局引入首页
import Index from '../views/news/index.vue'
// 全局引入manage 组件
import Manage from '../views/news/Manage.vue'
// 全局引入postdatail 组件
import PostDetail from '../views/news/PostDetail.vue'
// 粘性布局的原理
import Sticky from '../views/user/Sticky.vue'
// 收索页面search
import Search from '../views/news/Search.vue'

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
  { path: '/mycomment', component: MyComment, name: 'mycomment' },
  { path: '/mystar', component: MyStar, name: 'mystar' },
  { path: '/', component: Index, name: 'index' },
  { path: '/manage', component: Manage, name: 'manage' },
  { path: '/post-detail/:id', component: PostDetail, name: 'post-detail' },
  { path: '/sticky', component: Sticky, name: 'sticky' },
  { path: '/search', component: Search, name: 'search' }
]

const router = new VueRouter({
  routes,
  // hash与history是两种模式 history地址栏里不带有#号 但需要后台的配合
  mode: 'history'
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
