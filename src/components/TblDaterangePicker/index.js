/*
 * @Author: dxx
 * @Date: 2022-12-14 17:35:53
 * @LastEditors: dxx
 * @LastEditTime: 2022-12-14 17:55:27
 */
// 导入组件，组件必须声明name
import TblDaterangePicker from './TblDaterangePicker.vue'

// 为组件提供 install 安装方法，供按需使用
TblDaterangePicker.install = function (Vue, options = {}) {
  // 全局注册组件（组件名，组件）
  Vue.component(TblDaterangePicker.name, TblDaterangePicker);
};

// 默认导出单个组件
export default TblDaterangePicker;