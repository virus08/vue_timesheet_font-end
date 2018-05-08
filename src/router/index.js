import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/views/layout/layout'
import login from '@/views/login/login'
import NotFound from '@/views/NotFound'

const routes = [
  { path: '/', component: layout, meta: { requiresAuth: true } },
  { path: '/login', component: login },
  { path: '*', component: NotFound }
]
var myStorage = window.localStorage

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = myStorage.getItem('isAuthenticated')
  if (requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
