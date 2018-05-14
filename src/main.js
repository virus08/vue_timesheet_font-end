// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import {ServerTable, ClientTable, Event} from 'vue-tables-2';
import VueFilterDateFormat from 'vue-filter-date-format'
var VueTruncate = require('vue-truncate-filter')
Vue.use(VueTruncate)

Vue.use(require('vue-moment'));



Vue.use(VueResource)
Vue.use(ClientTable)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  
})

