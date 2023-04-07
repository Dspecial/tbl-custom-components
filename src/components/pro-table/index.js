/*
 * @Author: dxx
 * @Date: 2023-04-06 14:47:05
 * @LastEditors: dxx
 * @LastEditTime: 2023-04-06 14:47:54
 */
// 导入组件，组件必须声明name
import TblProTable from './index.vue'

// 为组件提供 install 安装方法，供按需使用
TblProTable.install = function (Vue, options = {}) {
  // 全局注册组件（组件名，组件）
  Vue.component(TblProTable.name, TblProTable);
};

// 默认导出单个组件
export default TblProTable;