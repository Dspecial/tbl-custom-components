/*
 * @Author: dxx
 * @Date: 2022-12-28 09:55:40
 * @LastEditors: dxx
 * @LastEditTime: 2022-12-28 13:32:09
 */
// 导入组件，组件必须声明name
import TblTableTransfer from './index.vue'

// 为组件提供 install 安装方法，供按需使用
TblTableTransfer.install = function (Vue, options = {}) {
  // 全局注册组件（组件名，组件）
  Vue.component(TblTableTransfer.name, TblTableTransfer);
};

// 默认导出单个组件
export default TblTableTransfer;