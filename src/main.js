import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import { $dateFormat, $dayFormat, formatCurrency, priceTransform, pickerOptions, powerReg } from '@/utils/fn'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI, { size: 'medium' })
Vue.prototype.$dateFormat = $dateFormat // 日期时间转化
Vue.prototype.$dayFormat = $dayFormat // 日期转化
Vue.prototype.$formatCurrency = formatCurrency // 金额转化
Vue.prototype.priceTransform = priceTransform // 金额区间处理
Vue.prototype.pickerOptions = pickerOptions // 时间段控件参数
Vue.prototype.powerReg = powerReg // 功能权限判断

Vue.config.productionTip = false
// 全局关闭
ElementUI.Dialog.props.closeOnClickModal.default = false
ElementUI.Dialog.props.closeOnPressEscape.default = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
