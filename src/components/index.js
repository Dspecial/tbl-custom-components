/*
 * @Author: dxx
 * @Date: 2022-12-13 16:11:52
 * @LastEditors: dxx
 * @LastEditTime: 2023-02-03 18:31:59
 */
// 定义 install 方法，接受 Vue 作为参数，如果使用 use 注册插件，则所有的组件都将被注册
// 导入组件：按需导入时导入文件夹下的index.js文件， 全局导入时导入 .vue文件或者index.js文件都可以
import TblDaterangePicker from './daterange-picker/index.js';
import TblTooltipOver from './tooltip-over/index.js';
import TblIconPicker from './icon-picker/index.js';
import TblTableTransfer from './table-transfer/index.js';
import locale from '../locale/index.js';

// 导入版本号
import packageInfo from '../../package.json';

// 定义组件数组
const components = [
  TblDaterangePicker, 
  TblTooltipOver, 
  TblIconPicker,
  TblTableTransfer
];

const install = function (Vue, options={}) {
  if (options && options.components) {
    components = options.components;
  }
  locale.use(options.locale);
  locale.i18n(options.i18n);

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
  locale: locale.use,
  i18n: locale.i18n,
  install,
  TblDaterangePicker, // 单独导出TblDaterangePicker，用于按需加载
  TblTooltipOver,
  TblIconPicker,
  TblTableTransfer
};