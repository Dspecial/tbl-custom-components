/*
 * @Author: dxx
 * @Date: 2022-12-13 13:50:46
 * @LastEditors: dxx
 * @LastEditTime: 2023-02-09 18:24:56
 */
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import moment from 'moment';
// import TblCustomComponents from '../dist/tbl-custom-components.common.js';  // 引入自定义组件TblCustomComponents的js
import TblCustomComponents from '@/components/index.js'
import locale from './locale/lang/zh-CN'
import locale2 from './locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'; //element-ui样式表
// import '../dist/tbl-custom-components.css'; // 自定义组件样式表

Vue.use(ElementUI, { size: 'small', zIndex: 3000 }); // 声明使用ElementUI
Vue.use(TblCustomComponents); // 声明使用TblCustomComponents自定义组件
Vue.prototype.$moment = moment;
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app')
