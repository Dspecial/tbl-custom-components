/*
 * @Author: dxx
 * @Date: 2022-12-13 13:50:46
 * @LastEditors: dxx
 * @LastEditTime: 2023-02-02 11:59:10
 */
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import moment from 'moment';
import i18n from './i18n/i18n';
import TblCustomComponents from '@/components/index';  // 引入自定义组件TblCustomComponents的js

import 'element-ui/lib/theme-chalk/index.css'; //element-ui样式表

Vue.use(ElementUI, { size: 'small', zIndex: 3000 }); // 声明使用ElementUI
Vue.use(TblCustomComponents,{lang:'en'}); // 声明使用TblCustomComponents自定义组件
Vue.prototype.$moment = moment;
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  i18n, // 在全局挂载
}).$mount('#app')
