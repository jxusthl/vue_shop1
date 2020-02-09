import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'
// 导入字体图标
import './assets/font/iconfont.css'

Vue.config.productionTip = false

// 将axios函数对象挂载到所有vue实例对象原型对象上，这样所有的组件都可以访问
Vue.prototype.$http = axios
// 配置请求的根路径
axios.defaults.baseURL = '/api/private/v1/'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
