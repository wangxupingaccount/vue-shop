import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import util from './store/event/util'
Vue.config.productionTip = false
Vue.use(util);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
