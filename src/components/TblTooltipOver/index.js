/*
 * @Author: dxx
 * @Date: 2022-12-14 17:35:53
 * @LastEditors: dxx
 * @LastEditTime: 2022-12-14 18:13:04
 */
// 导入组件，组件必须声明name
import TblTooltipOver from './TblTooltipOver.vue'

// 为组件提供 install 安装方法，供按需使用
TblTooltipOver.install = function (Vue, options = {}) {
  // 全局注册组件（组件名，组件）
  Vue.component(TblTooltipOver.name, TblTooltipOver);
};

// 默认导出单个组件
export default TblTooltipOver;