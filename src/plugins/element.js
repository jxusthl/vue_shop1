import Vue from 'vue'
// ElememtUI需要按需导入
import { Button, Form, FormItem, Input } from 'element-ui'
// 导入弹框提示组件
import { Message } from 'element-ui'

// 全局注册组件
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.prototype.$message = Message
