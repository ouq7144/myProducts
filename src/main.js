import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import Router from 'vue-router'
import router from '../router/index.js'
import store from '../store/index.js'
import http from 'axios'
import '../api/mock.js'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$http = http

// 导航守卫
router.beforeEach((to, from, next) => {
  store.commit('getToken')
  const token = store.state.user.token
  console.log(token, 'token')
  if (!token && to.name !== 'Login') {
    console.log('stop')
    next({name: 'Login'})
  } else {
    console.log('go')
    next()
  }
})

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App),
}).$mount('#app')

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
