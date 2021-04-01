import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import VueLazyload from 'vue-lazyload'
import fetch, {
  fetchForm,
  fetchGet
} from '@/lib/axios'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/style/main.less'

Vue.config.productionTip = false

Vue.use(ElementUI, {
  size: 'small'
})
Vue.use(VueLazyload)

// 全局事件总线
Vue.prototype.$EventBus = new Vue()
Vue.prototype.$fetch = fetch
Vue.prototype.$fetchForm = fetchForm
Vue.prototype.$fetchGet = fetchGet

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')