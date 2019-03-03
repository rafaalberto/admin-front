import 'font-awesome/css/font-awesome.css'
import 'vue2-admin-lte/src/lib/css'
import 'vue2-admin-lte/src/lib/script'
import 'vue2-admin-lte/src/lib/global'

import Vue from 'vue'
import App from './App.vue'

// import './config/bootstrap'
import './config/messages'

import router from './config/router'
import store from './config/store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
