import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/views/layout/Layout'
import login from '@/views/login/login'
import Logout from '@/api/logout'
import NotFound from '@/views/NotFound'
import HelloWorld from '@/components/HelloWorld'
import TableComponent from 'vue-table-component';

Vue.use(TableComponent);

import {Timesheet, Dashboard, Certificate,Project, KPI, Profile } from '@/components'

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
        { path: '', component: HelloWorld ,props: { PageName: 'Notify page' }  },
        { path: 'Dashboard', component: Dashboard ,props: { PageName: 'Dashboard' } },
        { path: 'Timesheet', component: Timesheet ,props: { PageName: 'Timesheet' } },
        { path: 'Certificate', component: Certificate ,props: { PageName: 'Certificate' } },
        { path: 'Project', component: Project ,props: { PageName: 'Project Table' } },
        { path: 'KPI', component: KPI ,props: { PageName: 'Key Performance Indicator' } },
        { path: '*', component: NotFound }
      ]
   },
  { 
    path: '/profile', 
    component: layout, 
    meta: { requiresAuth: true },
    children: [
        { path: ':UID', component: Profile ,props: true},
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
