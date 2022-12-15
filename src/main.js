/*
 * @Author: dxx
 * @Date: 2022-12-13 13:50:46
 * @LastEditors: dxx
 * @LastEditTime: 2022-12-14 18:43:47
 */
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import moment from 'moment';
import TblCustomComponents from '@/components/index';  // 引入自定义组件TblCustomComponents的js

import 'element-ui/lib/theme-chalk/index.css'; //element-ui样式表

Vue.use(ElementUI, { size: 'small', zIndex: 3000 }); // 声明使用ElementUI
Vue.use(TblCustomComponents); // 声明使用TblCustomComponents自定义组件
Vue.prototype.$moment = moment;
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
