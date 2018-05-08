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

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = 1
  if (requiresAuth && !isAuthenticated) {
    next('/signin')
  } else {
    next()
  }
})

export default router
