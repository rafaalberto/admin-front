import 'vue2-admin-lte/src/lib/css'
import 'vue2-admin-lte/src/lib/script'
import './fonts/google-fonts.css'

import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)

import './config/messages'
import router from './config/router'
import store from './config/store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
