import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/views/layout/Layout'
import login from '@/views/login/login'
import Logout from '@/api/logout'
import NotFound from '@/views/NotFound'


import VueResource from 'vue-resource'

Vue.use(VueResource)

const routes = [
  { path: '/', component: layout, meta: { requiresAuth: true } },
  { path: '/login', component: login },
  { path: '/Logout', component: Logout },
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
  const UID = myStorage.getItem('UID')
  const Token = myStorage.getItem('Token')
  if (requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    if (isAuthenticated && to.fullPath === '/login') {
      next(from.fullPath)
    } else {
      Vue.http.get('http://localhost:8080/api/users/' + UID + '?access_token=' + Token).then((response) => {
      // success
      }, (response) => { // error
        myStorage.clear()
        // alert(response.body.error.message)
        next('/login')
      })
      next()
    }
  }
})

export default router
