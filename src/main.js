import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' 
import  fontIcon from './assets/iconfont.css'
import util from './store/event/util'

Vue.use(ElementUI, { locale })
Vue.config.productionTip = false
Vue.use(util);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
