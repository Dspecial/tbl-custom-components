/*
 * @Author: dxx
 * @Date: 2022-12-26 17:35:53
 * @LastEditors: dxx
 * @LastEditTime: 2023-02-01 09:52:59
 */
// 导入组件，组件必须声明name
import TblIconPicker from './index.vue'

// 为组件提供 install 安装方法，供按需使用
TblIconPicker.install = function (Vue, options = {}) {
  // 全局注册组件（组件名，组件）
  Vue.component(TblIconPicker.name, TblIconPicker);
};

// 默认导出单个组件
export default TblIconPicker;