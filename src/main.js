import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'
// 导入字体图标
import '@/assets/fonts/iconfont.css'

Vue.config.productionTip = false

// 配置请求的根路径
axios.defaults.baseURL = '/api/private/v1/'
// 配置请求拦截器
axios.interceptors.request.use(config => {
  // 设置请求特殊字段，将token带过去，获得请求权限
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
// 将axios函数对象挂载到所有vue实例对象原型对象上，这样所有的组件都可以访问
Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
