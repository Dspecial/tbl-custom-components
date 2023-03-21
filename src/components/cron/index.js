/*
 * @Author: dxx
 * @Date: 2022-12-14 17:35:53
 * @LastEditors: dxx
 * @LastEditTime: 2023-03-20 18:05:15
 */

// 导入组件，组件必须声明name
import TblCron from './index.vue'

// 为组件提供 install 安装方法，供按需使用
TblCron.install = function (Vue, options = {}) {
  // 全局注册组件（组件名，组件）
  Vue.component(TblCron.name, TblCron);
};

// 默认导出单个组件
export default TblCron;