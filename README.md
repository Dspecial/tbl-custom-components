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
import { TblDaterangePicker,TblTooltipOver } from 'tbl-custom-components';  // 按需引入自定义组件（也可以不加大括号引入）
Vue.use(TblDaterangePicker); // 声明使用TblComponents自定义组件
Vue.use(TblTooltipOver); // 声明使用TblComponents自定义组件

import 'tbl-custom-components/lib/tbl-custom-components.css'; // 自定义组件样式表
```

- ##### 配置国际化

```
import TblCustomComponents from 'tbl-custom-components';  // 引入自定义组件
import locale from 'tbl-custom-components/src/locale/lang/en'; // 配置自定义组件的国际化
Vue.use(TblCustomComponents,{ locale }); // 声明使用TblComponents自定义组件并配置国际化

import 'tbl-custom-components/lib/tbl-custom-components.css'; // 自定义组件样式表
```

### 组件使用说明

可全局配置中英文 localStorage.setItem('lang','en'); // en 或者 cn

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

export default {
  name: 'App',
  data() {
    return {
      defaultValue: [this.$moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),this.$moment(new Date()).format('YYYY-MM-DD HH:mm:ss')],
      btnOption: {
        isYesterday: true, // 显示 昨日 按钮
        isToday: true, // 今日
        isPreWeek: true, // 上周
        isThisWeek: true, // 本周
        isPreMonth: true, // 上月
        isThisMonth: true, // 本月
        isLast7days: true, // 过去7天
      },
      pickerOptions: {
        shortcuts: [],
        disabledDate(date) {
          return date.getTime() > Date.now();
        },
      },
    }
  },
  methods:{
    onChange(val) {
      console.log(val, '获取到绑定的时间范围值');
      this.defaultValue = val;
    },
  },
}
```

- ##### 问题解决

1. btnOption 不配置的话默认所有按钮都显示，配置为{}空对象时 所有按钮钧不显示;

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

export default {
  name: 'App',
  data() {
    return {
        content: `他找来半张红纸和一支毛笔，让村里的一名小学老师为他写了一张告示。告示的大概内容是：因收入微薄无法承担太多应酬，除丧葬、嫁娶之外`,
    }
  },
}
```

- ##### 问题解决

1. content 暂时不能作为 slot 进行自定义，后期优化;
2.

> #### tbl-icon-picker 图标选择器

- ##### 介绍

基于`element-ui`，使用[Input](https://element.eleme.cn/#/zh-CN/component/input) 组件和[Popover](https://element.eleme.cn/#/zh-CN/component/popover) 组件，将 2.15.11 版本的所有图标+自定义的 [wisdom 图标库](//at.alicdn.com/t/c/font_3506871_rdu097xhi9m.css) / [noah 图标库](//at.alicdn.com/t/c/font_2902101_jlg70mqhyge.css)的阿里图标做成选择器，用于图标选择。

- ##### 使用示例

```
<tbl-icon-picker v-model="iconValue" placeholder="请选择图标" type="wisdom"></tbl-icon-picker>

export default {
  name: 'App',
  data() {
    return {
      iconValue: '',
    }
  },
}
```

- ##### 问题解决

1. type 可配置成 'wisdom'/'noah' ,默认 'noah',需要在工程项目中事先引入对应的图标库，方可使用;
2. placeholder（占位文字:继承 input）、disabled（是否禁用：继承 input）、placement（弹出框位置：继承 popover）等都可配

> #### tbl-table-transfer 表格穿梭框

- ##### 介绍

基于`element-ui`，使用[Input](https://element.eleme.cn/#/zh-CN/component/input) 组件、[Table](https://element.eleme.cn/#/zh-CN/component/table) 组件以及 [Pagination](https://element.eleme.cn/#/zh-CN/component/pagination) 组件，组合成一个带分页的表格穿梭框。

属性：maxHeight（表格最大高度|字符串）、minHeight（表格最小高度|字符串）、tableStripe（表格斑马线|布尔值）、tableBorder（表格边框|布尔值）、tableRowKey（表格行数据的 key）、showQuery（显示查询条件|布尔值）、showPagination（显示分页|布尔值）、paginationCallBack（左侧分页回调 |函数）、titleTexts（标题文本|数组（数组中字符串））、buttonTexts（按钮文本|数组（数组中字符串））、queryTexts（查询按钮文本|数组（数组中字符串））、leftColumns（左侧参数|数组）、rightColumns（右侧参数|数组）

- ##### 使用示例

```
<tbl-table-transfer
  class="eltTransfer"
  ref="eltTransfer"
  :show-query="true"
  :show-pagination="true"
  :pagination-call-back="paginationCallBack"
  :left-columns="leftColumns"
  :title-texts="['全部设备', '已绑设备']"
  :query-texts="['筛选', '筛选']"
  :table-row-key="row => row.id"
  maxHeight="900px"
  minHeight="470px"
  v-model="tableData"
>
  <!-- 可以使用插槽获取到列信息和行信息，从而进行数据的处理 -->
  <template v-slot:default="{ scope }">
    <div>
      <span v-if="scope.col.id === 'state'">
        <span v-if="scope.row.state == 0">离线</span>
        <span v-if="scope.row.state == 1">在线</span>
      </span>
      <span v-else>{{ scope.row[scope.col.id] }}</span>
    </div>
  </template>
  <template v-slot:leftCondition="{ scope }">
    <el-form-item label="">
      <el-input v-model="scope.deviceName" clearable placeholder="请输入设备名称"></el-input>
    </el-form-item>
  </template>
  <template v-slot:rightCondition="{ scope }">
    <el-form-item label="">
      <el-input v-model="scope.deviceName" clearable placeholder="请输入设备名称"></el-input>
    </el-form-item>
  </template>
</tbl-table-transfer>

export default {
  name: 'App',
  data() {
    return {
      // 表头
      leftColumns: [
        { label: '设备名称', id: 'deviceName' },
        { label: '设备编号', id: 'deviceCode' },
        { label: '网络状态', id: 'state', width: '80px' },
      ],
      // 已绑定数据
      tableData: [
        {
          id: 1,
          deviceName: '设备1',
          deviceCode: '0001',
          state: 0,
        },
        {
          id: 2,
          deviceName: '设备2',
          deviceCode: '0002',
          state: 1,
        },
      ],
      // 全部数据
      allDeviceData: [
        {
          id: 1,
          deviceName: '设备1',
          deviceCode: '0001',
          state: 0,
        },
        {
          id: 2,
          deviceName: '设备2',
          deviceCode: '0002',
          state: 1,
        },
        {
          id: 3,
          deviceName: '设备3',
          deviceCode: '0003',
          state: 0,
        },
        {
          id: 4,
          deviceName: '设备4',
          deviceCode: '0004',
          state: 1,
        },
      ],
    }
  },

  methods:{
    // 未选数据加载和检索
    paginationCallBack(obj) {
      let abcData;
      var filtersObj = {
        deviceName: obj.deviceName,
      };

      // 如果筛选条件全为空，查全部；否则按条件筛选
      var objIsEmpty = true;
      for (var key in filtersObj) {
        if (typeof filtersObj[key] != 'undefined' && typeof filtersObj[key] != 'null' && filtersObj[key] != null && filtersObj[key] != '') {
          objIsEmpty = false;
          break;
        }
      }

      if (objIsEmpty) {
        abcData = this.allDeviceData;
      } else {
        // 拿到有值的参数
        let tempFilter = {};
        for (var key in filtersObj) {
          if (typeof filtersObj[key] != 'undefined' && typeof filtersObj[key] != 'null' && filtersObj[key] != null && filtersObj[key] != '') {
            tempFilter[key] = filtersObj[key];
          }
        }
        abcData = this.allDeviceData.filter(item => {
          let flag = false;
          for (key in tempFilter) {
            // console.log(key,'输出key')
            if (item[key].toString().indexOf(tempFilter[key].toString()) >= 0) {
              flag = true;
            } else {
              flag = false;
              break;
            }
          }
          if (flag) {
            return item;
          }
        });
      }

      let newData = abcData.filter((item, index) => {
        if (index >= (obj.pageIndex - 1) * obj.pageSize && index < obj.pageIndex * obj.pageSize) {
          return true;
        }
        return false;
      });
      return new Promise((resolve, reject) => {
        try {
          resolve({ total: abcData.length, data: newData });
        } catch (e) {
          reject();
        }
      });
    },
  }
}
```

- ##### 问题解决

1. 可配参数：
   maxHeight（表格最大高度|字符串）
   minHeight（表格最小高度|字符串）
   tableStripe（表格斑马线|布尔值）
   tableBorder（表格边框|布尔值）
   tableRowKey（表格行数据的 key）
   showQuery（显示查询条件|布尔值）
   showPagination（显示分页|布尔值）
   paginationCallBack（左侧分页回调|函数）
   titleTexts（标题文本|数组（数组中字符串））
   buttonTexts（按钮文本|数组（数组中字符串））
   queryTexts（查询按钮文本|数组（数组中字符串））
   leftColumns（左侧参数|数组）
   rightColumns（右侧参数|数组）
