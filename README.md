## tbl-custom-components

[项目地址](https://github.com/Dspecial/tbl-custom-components.git)

基于`element-ui@2.15.11` 二次封装一些小组件，提高插拔性，便于多项目使用

### 安装文档

#### 安装

```
npm i tbl-custom-components;
```

#### 注册

`main.js`中注册，依赖于 element-ui，因此注册的时候得同步注册 element-ui

```
import ElementUI from 'element-ui';
Vue.use(ElementUI, { size: 'small', zIndex: 3000 }); // 声明使用ElementUI

import 'element-ui/lib/theme-chalk/index.css'; // element-ui样式表

```

- ##### 全局注册

```
import TblCustomComponents from 'tbl-custom-components';  // 引入自定义组件
Vue.use(TblComponents); // 声明使用TblComponents自定义组件

import 'tbl-custom-components/lib/tbl-custom-components.css'; // 自定义组件样式表
```

- ##### 按需引入

```
import { TblDaterangePicker,TblTooltipOver } from 'tbl-custom-components';  // 按需引入自定义组件
Vue.use(TblDaterangePicker); // 声明使用TblComponents自定义组件
Vue.use(TblTooltipOver); // 声明使用TblComponents自定义组件

import 'tbl-custom-components/lib/tbl-custom-components.css'; // 自定义组件样式表
```

### 组件使用说明

> #### tbl-daterange-picker 时间范围选择器

- ##### 介绍

基于`element-ui`，二次封装 [DateTimePicker](https://element.eleme.cn/#/zh-CN/component/datetime-picker)组件，继承 [DateTimePicker](https://element.eleme.cn/#/zh-CN/component/datetime-picker) 的所有属性和方法

添加了昨日、今日、上周、本周、上月、本月、过去 7 天、过去 30 天、过去 90 天等快捷按钮

- ##### 使用示例

```
<tbl-daterange-picker
  v-model="defaultValue"
  align="left"
  format="yyyy-MM-dd HH:mm:ss"
  value-format="yyyy-MM-dd HH:mm:ss"
  :btnOption="btnOption"
  :picker-options="pickerOptions"
  @change="onChange"
></tbl-daterange-picker>
```

- ##### 问题解决

1. btnOption 不配置的话默认所有按钮都显示;

2. 如使用 picker-options 来限制日期选择范围，或者设置周起始日 firstDayOfWeek，或者设置日期的类名 cellClassName 时，当需要显示快捷按钮，则必须加上 shortcuts: []，否则无快捷按钮；
   不配置 picker-options 时，默认是有快捷按钮的;

3. picker-options 所有属性和参数 详见 [参考地址](https://element.eleme.cn/#/zh-CN/component/datetime-picker#picker-options)

> #### tbl-tooltip-over 文字超出范围

- ##### 介绍

基于`element-ui`，二次封装[Tooltip](https://element.eleme.cn/#/zh-CN/component/tooltip)组件，继承[Tooltip](https://element.eleme.cn/#/zh-CN/component/tooltip) 的所有属性和方法

当文本超出既定宽度显示 ... ，并自动提示 tooltips 的小组件

- ##### 使用示例

```
<div style="width:500px">
  <tbl-tooltip-over :content="content" refName="tooltipOver" effect="dark" placement="top-start" popper-class="test-tooltip"></tbl-tooltip-over>
</div>
```

- ##### 问题解决

1. content 暂时不能作为 slot 进行自定义，后期优化;
2.

> #### tbl-icon-picker 图标选择器

- ##### 介绍

基于`element-ui`，使用[Input](https://element.eleme.cn/#/zh-CN/component/input) 组件和[Popover](https://element.eleme.cn/#/zh-CN/component/popover) 组件，将 2.15.11 版本的所有图标+自定义的 [wisdom](//at.alicdn.com/t/c/font_3506871_rdu097xhi9m.css) / [noah](//at.alicdn.com/t/c/font_2902101_jlg70mqhyge.css)的阿里图标做成选择器，用于图标选择。

- ##### 使用示例

```
<tbl-icon-picker v-model="iconValue" placeholder="请选择图标" type="wisdom"></tbl-icon-picker>
```

- ##### 问题解决

1. type 可配置成 'wisdom'/'noah' ,默认 'noah',需要在工程项目中事先引入对应的图标库，方可使用;
2. placeholder（占位文字:继承 input）、disabled（是否禁用：继承 input）、placement（弹出框位置：继承 popover）等都可配
