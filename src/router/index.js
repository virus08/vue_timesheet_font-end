import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/views/layout/Layout'
import login from '@/views/login/login'
import Logout from '@/api/logout'
import NotFound from '@/views/NotFound'
import HelloWorld from '@/components/HelloWorld'

require('@/api/main.js')

import VueResource from 'vue-resource'

Vue.use(VueResource)

const routes = [
  { path: '', redirect:'/home'},
  { 
    path: '/home', 
    component: layout, 
    meta: { requiresAuth: true },
    children: [
        { path: '', component: HelloWorld ,props: { UID: 'Notify page' }  },
        { path: 'Dashboard', component: HelloWorld ,props: { UID: 'Dashboard' } },
        { path: 'Timesheet', component: HelloWorld ,props: { UID: 'Timesheet' } },
        { path: 'Certificate', component: HelloWorld ,props: { UID: 'Certificate' } },
        { path: 'KPI', component: HelloWorld ,props: { UID: 'Key Performance Indicator' } },
        { path: '*', component: NotFound }
      ]
   },
  { 
    path: '/profile', 
    component: layout, 
    meta: { requiresAuth: true },
    children: [
        { path: ':UID', component: HelloWorld ,props: true},
        { path: '*', component: NotFound }
      ]  
   },
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
  const API = window.API
  if (requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    if (isAuthenticated && to.fullPath === '/login') {
      next(from.fullPath)
    } else {
      Vue.http.get(API.USER + UID + '?access_token=' + Token).then((response) => {
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
