<!--
 * @Author: dxx
 * @Date: 2022-12-13 13:50:48
 * @LastEditors: dxx
 * @LastEditTime: 2022-12-15 09:47:44
-->

## tbl-custom-components

[项目地址](https://github.com/Dspecial/tbl-custom-components.git)

基于`element-ui`，二次封装一些小组件，提高插拔性，便于多项目使用

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

```

##### 全局注册

```
import TblCustomComponents from 'tbl-custom-components';  // 引入自定义组件
Vue.use(TblComponents); // 声明使用TblComponents自定义组件
```

##### 按需引入

```
import { TblDaterangePicker,TblTooltipOver } from 'tbl-custom-components';  // 按需引入自定义组件
Vue.use(TblDaterangePicker); // 声明使用TblComponents自定义组件
Vue.use(TblTooltipOver); // 声明使用TblComponents自定义组件
```

### 组件使用说明

> #### tbl-daterange-picker

##### 介绍

基于`element-ui`，二次封装 [DateTimePicker](https://element.eleme.cn/#/zh-CN/component/datetime-picker)组件，继承 [DateTimePicker](https://element.eleme.cn/#/zh-CN/component/datetime-picker) 的所有属性和方法

添加了昨日、今日、上周、本周、上月、本月、过去 7 天、过去 30 天、过去 90 天等快捷按钮

##### 使用示例

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

##### 问题解决

1.btnOption 不配置的话默认所有按钮都显示;

2.如使用 picker-options 来限制日期选择范围，或者设置周起始日 firstDayOfWeek，或者设置日期的类名 cellClassName 时，当需要显示快捷按钮，则必须加上 shortcuts: []，否则无快捷按钮；

不配置 picker-options 时，默认是有快捷按钮的;

3.picker-options 所有属性和参数 详见 [参考地址](https://element.eleme.cn/#/zh-CN/component/datetime-picker#picker-options)

> #### tbl-tooltip-over

##### 介绍

基于`element-ui`，二次封装[Tooltip](https://element.eleme.cn/#/zh-CN/component/tooltip)组件，继承[Tooltip](https://element.eleme.cn/#/zh-CN/component/tooltip) 的所有属性和方法

当文本超出既定宽度显示 ... ，并自动提示 tooltips 的小组件

##### 使用示例

```
<div style="width:500px">
  <tbl-tooltip-over :content="content" refName="tooltipOver" effect="dark" placement="top-start" popper-class="test-tooltip"></tbl-tooltip-over>
</div>
```

##### 问题解决

1. content 暂时不能作为 slot 进行自定义，后期优化;
2.
