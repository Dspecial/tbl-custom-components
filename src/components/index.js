/*
 * @Author: dxx
 * @Date: 2022-12-13 16:11:52
 * @LastEditors: dxx
 * @LastEditTime: 2023-02-01 10:54:33
 */
// 定义 install 方法，接受 Vue 作为参数，如果使用 use 注册插件，则所有的组件都将被注册
// 导入组件：按需导入时导入文件夹下的index.js文件， 全局导入时导入 .vue文件或者index.js文件都可以
import TblDaterangePicker from './daterange-picker';
import TblTooltipOver from './tooltip-over';
import TblIconPicker from './icon-picker';
import TblTableTransfer from './table-transfer';

// 导入版本号
import packageInfo from '../../package.json';

// 定义组件数组
const components = [
  TblDaterangePicker, 
  TblTooltipOver, 
  TblIconPicker,
  TblTableTransfer
];

const install = function (Vue, options = {}) {
  if (options && options.components) {
    components = options.components;
  }
  // 循环全局注册组件
  components.forEach(item => {
    Vue.component(item.name, item);
  });
};

// 判断是否时直接引入文件，如果是，就不用调用Vue.use，script直接引用
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

// export { 
//   TblDaterangePicker, 
//   TblTooltipOver,
//   TblIconPicker,
//   TblTableTransfer
// };

export default { 
  version: packageInfo.version,
  install,
  TblDaterangePicker, // 单独导出TblDaterangePicker，用于按需加载
  TblTooltipOver,
  TblIconPicker,
  TblTableTransfer
};