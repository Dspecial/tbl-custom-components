## tbl-custom-components

[项目地址](https://github.com/Dspecial/tbl-custom-components.git)

基于`element-ui@2.15.13` 二次封装一些小组件，提高插拔性，便于多项目使用

### 一、安装文档

> #### 安装

    npm i tbl-custom-components;

> #### 注册

`main.js`中注册，依赖于 element-ui，因此注册的时候得同步注册 element-ui

    import ElementUI from 'element-ui';
    Vue.use(ElementUI, { size: 'small', zIndex: 3000 }); // 声明使用ElementUI

    import 'element-ui/lib/theme-chalk/index.css'; // element-ui样式表

##### 全局注册

    import TblCustomComponents from 'tbl-custom-components';  // 引入自定义组件
    Vue.use(TblComponents); // 声明使用TblComponents自定义组件

    import 'tbl-custom-components/lib/tbl-custom-components.css'; // 自定义组件样式表

##### 按需引入

    import { TblDaterangePicker,TblTooltipOver } from 'tbl-custom-components';  // 按需引入自定义组件（也可以不加大括号引入）
    Vue.use(TblDaterangePicker); // 声明使用TblComponents自定义组件
    Vue.use(TblTooltipOver); // 声明使用TblComponents自定义组件

    import 'tbl-custom-components/lib/tbl-custom-components.css'; // 自定义组件样式表

##### 配置国际化

    // 全局配置
    import TblCustomComponents from 'tbl-custom-components';  // 引入自定义组件
    import locale from 'tbl-custom-components/lib/locale/lang/en'; // 全局配置自定义组件的国际化
    Vue.use(TblCustomComponents,{ locale }); // 声明使用TblComponents自定义组件并配置国际化

    import 'tbl-custom-components/lib/tbl-custom-components.css'; // 自定义组件样式表

### 二、组件使用说明

> #### tbl-daterange-picker 时间范围选择器

##### 介绍

基于`element-ui`，二次封装 [DateTimePicker](https://element.eleme.cn/#/zh-CN/component/datetime-picker)组件，继承 该组件的所有属性、事件和方法

添加了昨日、今日、上周、本周、上月、本月、过去 7 天、过去 30 天、过去 90 天等快捷按钮

##### 使用示例

    <tbl-daterange-picker
      lang="en"
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

##### 问题解决、配置项、属性等

1.  btnOption 不配置的话默认所有按钮都显示，配置为{}空对象时 所有按钮钧不显示

    | 参数         | 说明                       | 类型    | 可选值     | 默认值 |
    | :----------- | :------------------------- | :------ | :--------- | :----- |
    | isYesterday  | 是否显示 昨日 的按钮       | boolean | false/true | true   |
    | isToday      | 是否显示 今日 的按钮       | boolean | false/true | true   |
    | isPreWeek    | 是否显示 上周 的按钮       | boolean | false/true | true   |
    | isThisWeek   | 是否显示 本周 的按钮       | boolean | false/true | true   |
    | isPreMonth   | 是否显示 上月 的按钮       | boolean | false/true | true   |
    | isThisMonth  | 是否显示 本月 的按钮       | boolean | false/true | true   |
    | isLast7days  | 是否显示 过去 7 天 的按钮  | boolean | false/true | true   |
    | isLast30days | 是否显示 过去 30 天 的按钮 | boolean | false/true | true   |
    | isLast90days | 是否显示 过去 90 天 的按钮 | boolean | false/true | true   |

2.  如使用 picker-options 来限制日期选择范围，或者设置周起始日 firstDayOfWeek，或者设置日期的类名 cellClassName 时，当需要显示快捷按钮，则必须加上 shortcuts: \[]，否则无快捷按钮； 不配置 picker-options 时，默认是有快捷按钮的

3.  picker-options 所有属性和参数 详见 [picker-options 参考地址](https://element.eleme.cn/#/zh-CN/component/datetime-picker#picker-options);

4.  继承 [DateTimePicker](https://element.eleme.cn/#/zh-CN/component/datetime-picker) 的所有属性、事件和方法

5.  lang 国际化配置，当前组件设置了 lang 属性，可重新覆盖全局国际化的配置

    | 参数 | 说明       | 类型   | 可选值 | 默认值 |
    | :--- | :--------- | :----- | :----- | :----- |
    | lang | 国际化配置 | string | cn/en  | cn     |

> #### tbl-tooltip-over 文字超出范围

##### 介绍

基于`element-ui`，二次封装[Tooltip](https://element.eleme.cn/#/zh-CN/component/tooltip)组件，继承[Tooltip](https://element.eleme.cn/#/zh-CN/component/tooltip) 的所有属性和方法

当文本超出既定宽度显示 ... ，并自动提示 tooltips 的小组件

##### 使用示例

    <div style="width:500px;margin-left: 15px">
      <p>2.1 无slot：</p>
      <tbl-tooltip-over :content="content" refName="tooltipOver" effect="dark" placement="top-start" popper-class="test-tooltip"></tbl-tooltip-over>
      <p>2.1 有slot：</p>
      <tbl-tooltip-over refName="tooltipOver" effect="dark" popper-class="test-tooltip">
        <span slot="contentTip" style="color:#00f;">{{ content2 }}</span>
        <span slot="contentOver" style="color:#f00;font-size: 40px">{{ content1 }}</span>
      </tbl-tooltip-over>
    </div>

    export default {
      name: 'App',
      data() {
        return {
          content: `他找来半张红纸和一支毛笔，让村里的一名小学老师为他写了一张告示。告示的大概内容是：因收入微薄无法承担太多应酬，除丧葬、嫁娶之外`,
          content1: `恶风读wùfēng。指病人遇风觉冷，避风则缓解之症。外感内伤俱可见恶风之证。指病邪，《素问·脉要精微论》：“来徐去疾，上虚下实`,
          content2: 112233445566,
        }
      },
    }

##### 问题解决、配置项、属性等

1.  继承 [Tooltip](https://element.eleme.cn/#/zh-CN/component/tooltip) 的所有属性和方法

2.  content 显示文字

    | 参数    | 说明     | 类型          | 可选值 | 默认值 |
    | :------ | :------- | :------------ | :----- | :----- |
    | content | 文本显示 | string/number | -      | -      |

3.  lang 国际化配置，当前组件设置了 lang 属性，可重新覆盖全局国际化的配置

    | 参数 | 说明       | 类型   | 可选值 | 默认值 |
    | :--- | :--------- | :----- | :----- | :----- |
    | lang | 国际化配置 | string | cn/en  | cn     |

4.  slot 插槽

    | 参数        | 说明                                         | 类型          | 可选值 | 默认值 |
    | :---------- | :------------------------------------------- | :------------ | :----- | :----- |
    | contentTip  | 具名插槽，可用来显示 tooltip 的弹出层        | string/number | -      | -      |
    | contentOver | 具名插槽，用来页面显示（即有省略号的那部分） | string/number | -      | -      |

> #### tbl-icon-picker 图标选择器

##### 介绍

基于`element-ui`，使用[Input](https://element.eleme.cn/#/zh-CN/component/input) 组件和[Popover](https://element.eleme.cn/#/zh-CN/component/popover) 组件，将 2.15.11 版本的所有图标+自定义的 [wisdom 图标库](//at.alicdn.com/t/c/font_3506871_rdu097xhi9m.css) / [noah 图标库](//at.alicdn.com/t/c/font_2902101_jlg70mqhyge.css)的阿里图标做成选择器，用于图标选择。

##### 使用示例

    <tbl-icon-picker v-model="iconValue" placeholder="请选择图标" type="wisdom"></tbl-icon-picker>

    export default {
      name: 'App',
      data() {
        return {
          iconValue: '',
        }
      },
    }

##### 问题解决、配置项、属性等

1.  引入;

        /* 引入自定义tbl图标（在线引用，项目中还是推荐下载下来使用） */
        @import '//at.alicdn.com/t/c/font_4403618_33y1slt6f6v.css';

2)  可配参数

    | 参数        | 说明                                                                                      | 类型    | 可选值                                                                                                    | 默认值 |
    | :---------- | :---------------------------------------------------------------------------------------- | :------ | :-------------------------------------------------------------------------------------------------------- | :----- |
    | placeholder | 占位字符，继承 [Input](https://element.eleme.cn/#/zh-CN/component/input#input-attributes) | string  | -                                                                                                         | -      |
    | disabled    | 是否禁用，继承 [Input](https://element.eleme.cn/#/zh-CN/component/input#input-attributes) | boolean | false/true                                                                                                | false  |
    | placement   | 弹出框位置，继承 [Popover](https://element.eleme.cn/#/zh-CN/component/popover#attributes) | string  | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | bottom |

3)  lang 国际化配置，当前组件设置了 lang 属性，可重新覆盖全局国际化的配置

    | 参数 | 说明       | 类型   | 可选值 | 默认值 |
    | :--- | :--------- | :----- | :----- | :----- |
    | lang | 国际化配置 | string | cn/en  | cn     |

> #### tbl-table-transfer 表格穿梭框

##### 介绍

基于`element-ui`，使用[Input](https://element.eleme.cn/#/zh-CN/component/input) 组件、[Table](https://element.eleme.cn/#/zh-CN/component/table) 组件以及 [Pagination](https://element.eleme.cn/#/zh-CN/component/pagination) 组件，组合成一个带分页的表格穿梭框。

##### 使用示例

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

##### 问题解决、配置项、属性等

1.  可配参数：

    | 参数               | 说明             | 类型                                        | 可选值     | 默认值                |
    | :----------------- | :--------------- | :------------------------------------------ | :--------- | :-------------------- |
    | maxHeight          | 表格最大高度     | string                                      | -          | '500px'               |
    | maxHeight          | 表格最小高度     | string                                      | -          | '300px'               |
    | tableStripe        | 表格斑马线       | string                                      | false/true | false                 |
    | tableBorder        | 表格边框         | boolean                                     | false/true | false                 |
    | tableRowKey        | 表格行数据的 key | string/number                               | -          | row\.id               |
    | showQuery          | 显示查询条件     | boolean                                     | false/true | false                 |
    | showPagination     | 显示分页         | boolean                                     | false/true | false                 |
    | paginationCallBack | 左侧分页回调     | Function(obj) // obj-参数为查询条件的返回值 | -          | -                     |
    | titleTexts         | 标题文本         | Array\[string]                              | -          | \['待选项', '已选项'] |
    | buttonTexts        | 按钮文本         | Array\[string]                              | -          | \[]                   |
    | queryTexts         | 查询按钮文本     | Array\[string]                              | -          | \['查询', '筛选']     |
    | leftColumns        | 左侧参数         | Array\[{}]                                  | -          | \[]                   |
    | rightColumns       | 右侧参数         | Array\[{}]                                  | -          | \[]                   |

2.  lang 国际化配置，当前组件设置了 lang 属性，可重新覆盖全局国际化的配置

    | 参数 | 说明       | 类型   | 可选值 | 默认值 |
    | :--- | :--------- | :----- | :----- | :----- |
    | lang | 国际化配置 | string | cn/en  | cn     |

> #### tbl-cron cron 表达式选择器

##### 介绍

基于`element-ui`，参考[vue-cron](https://gitee.com/lindeyi/vue-cron?_from=gitee_search) 组件进行重新开发和改造。

##### 使用示例

    <!-- cron表达式输入框 -->
    <el-input v-model="form.cronExpression" placeholder="请输入运行周期" clearable>
    <el-tooltip slot="append" effect="dark" content="打开表达式配置" placement="top">
      <el-button icon="el-icon-thumb" @click="openCronDialog(form.cronExpression)"></el-button>
    </el-tooltip>
    </el-input>

    <!-- cron表达式选择器 -->
    <el-dialog title="cron表达式" :visible.sync="showCronBox" width="40%" :append-to-body="true" :before-close="closeCron" destroy-on-close>
    <tbl-cron v-model="cronVal" lang="cn"></tbl-cron>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeCron">取 消</el-button>
      <el-button type="primary" @click="cronConfirm(cronVal)">确 定</el-button>
    </span>
    </el-dialog>

    export default {
      name: 'App',
      data() {
        return {
          showCronBox: false,
          form: {
            cronExpression: '',
          },
          cronVal: '',
        }
      },
    }

##### 问题解决、配置项、属性等

1.  lang 国际化配置，当前组件设置了 lang 属性，可重新覆盖全局国际化的配置

    | 参数 | 说明       | 类型   | 可选值 | 默认值 |
    | :--- | :--------- | :----- | :----- | :----- |
    | lang | 国际化配置 | string | cn/en  | cn     |

> #### tbl-dynamic-tables 动态表格

##### 介绍

基于`element-ui`，二次封装[Table](https://element.eleme.cn/#/zh-CN/component/table)+[Pagination](https://element.eleme.cn/#/zh-CN/component/pagination) 组件，实现表格+分页的封装，另外配置了动态表头，使表格能根据自定义选择的表头动态渲染。

将列表、分页三者的交互逻辑封装到组件中，节省开发者代码量
配置化的表格项，跟 el-table-column 的配置属性类似
配置化的分页，跟 el-pagination 的配置属性类似
自定义是否显示搜索和分页
自定义工具栏
丰富的插槽提供功能扩展

##### 使用示例

    <tbl-dynamic-tables
      :request="getList"
      :columns="columns"
      :pagination="paginationConfig"
      :dynamicColumns="true"
      storageKey="testTableColumns"
      lang="cn"
      @columns-change="columnsChange"
    >
      <template #isEnable="scope">
        <el-switch v-model="scope.row.isEnable" :active-value="1" :inactive-value="0"></el-switch>
      </template>
      <template #operate="scope">
        <el-button size="mini" type="primary">编辑{{ scope.row.index }}</el-button>
        <el-button size="mini" type="danger">删除</el-button>
      </template>
    </tbl-dynamic-tables>

    export default {
      name: 'App',
      data() {
        return {
          // 表格
          columns: [
            { label: '', type: 'selection', show: true },
            { label: '序号', type: 'index', show: false },
            { label: '角色名称', prop: 'nickName', show: true, required: true },
            { label: '邮箱', prop: 'userEmail', show: true },
            { label: '电话', prop: 'tel', show: true },
            {
              label: '性别',
              prop: 'sex',
              show: true,
              formatter: function(row, column, cellValue, index) {
                if (cellValue == '男') {
                  return (
                    <span>
                      <i style='background-color:#f00;display: inline-block;border-radius: 50%;width:6px;height:6px;margin-right:3px'></i>
                      {cellValue}
                    </span>
                  ); // 此处注意jsx的语法规则
                } else {
                  return (
                    <span>
                      <i style='backgroundColor:#0f0;display: inline-block;border-radius: 50%;width:6px;height:6px;margin-right:3px'></i>
                      {cellValue}
                    </span>
                  ); // 此处注意jsx的语法规则
                }
              },
            },
            {
              label: '启用',
              prop: 'isEnable',
              show: true,
              tdSlot: 'isEnable', // 自定义单元格内容的插槽名称
            },
            {
              label: '操作',
              fixed: 'right',
              width: 180,
              align: 'center',
              tdSlot: 'operate', // 自定义单元格内容的插槽名称
            },
          ],
          dynamicTableData: {
            list: [
              {
                nickName: '李逍遥',
                userEmail: '123@163.com',
                tel: '15189764540',
                sex: '男',
                isEnable: 1,
              },
              {
                nickName: '赵灵儿',
                userEmail: '456@163.com',
                tel: '15189764541',
                sex: '女',
                isEnable: 1,
              },
              {
                nickName: '林月如',
                userEmail: '789@163.com',
                tel: '15189764542',
                sex: '女',
                isEnable: 0,
              },
            ],
            total: 3,
          },
          // 分页配置
          paginationConfig: {
            layout: 'total, prev, pager, next, sizes', // 分页组件显示哪些功能
            pageSize: 5, // 每页条数
            pageSizes: [5, 10, 20, 50],
            background: true,
          },
        }
      },
    }

    // 请求函数
    async getList(params) {
      // console.log(params, 'params');
      // params是从组件接收的，包含分页字段。

      // 1.静态数据
      const _dynamicTableData = this.dynamicTableData;
      // 必须要返回一个对象，包含data数组和total总数
      return {
        data: _dynamicTableData.list,
        total: _dynamicTableData.total,
      };

      // 2.动态数据
      await this.$api
        .listUser({
          page: params.pageNum,
          limit: params.pageSize,
          searchName: this.filters[0].value,
          phone: this.filters[1].value,
        })
        .then(data => {
          if (data.code == 0) {
            this.dynamicTableData.list = data.data;
            this.dynamicTableData.total = data.count;
          } else {
            this.$message.error(data.msg);
          }
        });
      // 必须要返回一个对象，包含data数组和total总数
      return {
        data: this.dynamicTableData.list,
        total: this.dynamicTableData.total,
      };
    },

    // 表头改变
    columnsChange(columns1, columns2) {
      console.log(columns1, columns2);
    },

##### 问题解决、配置项、属性等

1.  request，请求列表数据的函数：组件加载的时候会自动执行 request 函数

    1.  函数接收参数：包含搜索表单的所有字段和分页的 pageNum 和 pageSize
    2.  函数必须返回一个对象，包含:

        1.  data: 列表数据的数组（数组 Array）
        2.  total：总数，用于分页（数值 Number）

                // 请求函数
                async getList(params) {
                  // console.log(params, 'params');
                  // params是从组件接收的，包含分页字段。
                  // 1.静态数据
                  const _dynamicTableData = this.dynamicTableData;
                  // 必须要返回一个对象，包含data数组和total总数
                  return {
                    data: _dynamicTableData.list,
                    total: _dynamicTableData.total,
                  };

                  // 2.动态数据
                  await this.$api
                    .listUser({
                      page: params.pageNum,
                      limit: params.pageSize,
                      searchName: this.filters[0].value,
                      phone: this.filters[1].value,
                    })
                    .then(data => {
                      if (data.code == 0) {
                        this.dynamicTableData.list = data.data;
                        this.dynamicTableData.total = data.count;
                      } else {
                        this.$message.error(data.msg);
                      }
                    });
                  // 必须要返回一个对象，包含data数组和total总数
                  return {
                    data: this.dynamicTableData.list,
                    total: this.dynamicTableData.total,
                  };
                },

2.  table 表格配置：支持[Table](https://element.eleme.cn/#/zh-CN/component/table#table-attributes)的所有属性

3.  columns 列配置（数组 Array）

    | 参数      | 说明                                                                                                      | 类型                                    | 可选值                 | 默认值                                                                                                                  |
    | :-------- | :-------------------------------------------------------------------------------------------------------- | :-------------------------------------- | :--------------------- | :---------------------------------------------------------------------------------------------------------------------- |
    | label     | 对应 el-table-column 的 label                                                                             | string                                  | -                      | -                                                                                                                       |
    | type      | 对应 el-table-column 的 type                                                                              | string                                  | selection/index/expand | -                                                                                                                       |
    | prop      | 对应 el-table-column 的 prop                                                                              | string                                  | -                      | -                                                                                                                       |
    | width     | 对应 el-table-column 的 width                                                                             | string,number                           | -                      | -                                                                                                                       |
    | minWidth  | 对应 el-table-column 的 min-width                                                                         | string,number                           | -                      | -                                                                                                                       |
    | align     | 对应 el-table-column 的 align                                                                             | string                                  | left/center/right      | left                                                                                                                    |
    | fixed     | 对应 el-table-column 的 fixed                                                                             | string,boolean                          | true, left, right      | -                                                                                                                       |
    | sortable  | 对应 el-table-column 的 sortable                                                                          | boolean                                 | false/true             | false                                                                                                                   |
    | filters   | 对应 el-table-column 的 filters                                                                           | Array\[{ text, value }]                 | -                      | -                                                                                                                       |
    | formatter | 对应 el-table-column 的 formatter                                                                         | Function(row, column, cellValue, index) | -                      | -                                                                                                                       |
    | ...       | ...                                                                                                       | ...                                     | ...                    | ...                                                                                                                     |
    | 以上 ↑↑↑  | 支持[el-table-column](https://element.eleme.cn/#/zh-CN/component/table#table-column-attributes)的所有属性 | ↑                                       | ↑                      | ↑                                                                                                                       |
    | 新增 ↓↓↓  | ↓                                                                                                         | ↓                                       | ↓                      | ↓                                                                                                                       |
    | tdSlot    | 单元格要自定义内容时，可以通过此属性配置一个插槽名称，并且是作用域插槽，可以接收 scope 数据               | string                                  | -                      | -                                                                                                                       |
    | labelSlot | 表头要自定义内容时，可以通过此属性配置一个插槽名称，并且是作用域插槽，可以接收 scope 数据                 | string                                  | -                      | -                                                                                                                       |
    | show      | 设置动态表头时，是否显示该列                                                                              | boolean                                 | false/true             | true                                                                                                                    |
    | required  | 设置动态表头时，某列必选，不可在下拉中隐藏                                                                | boolean                                 | false/true             | 当 columns 中都不填写 required 或者 required 都为 false 时，默认除 type=index/section/expend 后的第一列为 required=true |

4.  pagination 分页配置（对象 Object）,如果不想显示分页，将 pagination 设置为 false

    | 参数       | 说明                         | 类型           | 可选值                                  | 默认值                                  |
    | :--------- | :--------------------------- | :------------- | :-------------------------------------- | :-------------------------------------- |
    | layout     | 组件布局                     | string         | total, sizes, prev, pager, next, jumper | total, sizes, prev, pager, next, jumper |
    | pageSize   | 每页显示条目个数             | number         | -                                       | 10                                      |
    | pageSizes  | 每页显示个数选择器的选项设置 | Array\[number] | -                                       | \[10, 20, 30, 40, 50, 100]              |
    | background | 是否为分页按钮添加背景色     | boolean        | -                                       | false                                   |

5.  dynamicColumns 显示动态表头

    | 参数           | 说明             | 类型    | 可选值     | 默认值 |
    | :------------- | :--------------- | :------ | :--------- | :----- |
    | dynamicColumns | 是否显示动态表头 | boolean | false/true | true   |

6.  storageKey 表头存储到 localStorage 的键值&#x20;

    | 参数       | 说明                                                                                                                                                                                            | 类型   | 可选值 | 默认值 |
    | :--------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----- | :----- | :----- |
    | storageKey | 将当前设置好的表头存入 localStorage，防止页面刷新后，恢复到初始表头。如果 storageKey 不传值，则无法存储 localStorage，表格恢复至初始表头。配合组件内部方法\*\*`getColumns() 、setColumns()`\*\* | string | -      | -      |

7.  lang 国际化配置，当前组件设置了 lang 属性，可重新覆盖全局国际化的配置

    | 参数 | 说明       | 类型   | 可选值 | 默认值 |
    | :--- | :--------- | :----- | :----- | :----- |
    | lang | 国际化配置 | string | cn/en  | cn     |

8.  工具栏配置，工具栏默认是空的，提供一个具名插槽 toolbar，来自定义工具栏的内容

9.  事件 columns-change，表头动态修改后的返回函数，函数返回两个值 column1：改变后的所有表头数据、column2：改变后的当前显示的表头数据

        columnsChange(columns1, columns2) {
            console.log(columns1, columns2);
        },

10. 组件内部方法

    1.  `getColumns()`

        tips: 必须先配置 storageKey 属性，给存储表头数据一个键值

        配置 ref 属性，可以通过 ref 获取组件后调用组件内部的\*\*`getColumns()`\*\*方法获取存储到 localStorage 的表头信息

    2.  `setColumns()`

        tips: 必须先配置 storageKey 属性，给存储表头数据一个键值

        配置 ref 属性，可以通过 ref 获取组件后调用组件内部的\*\*`setColumns()`\*\*方法重新设置表格的表头信息

            // 页面初始化的时候，在mounted中重载表格的表头
            mounted() {
              var newColumns = this.$refs.dynamicTable.getColumns();
              this.$refs.dynamicTable.setColumns(newColumns);
            },

    3.  `reSet()`

        配置 ref 属性，可以通过 ref 获取组件后调用组件内部的\*\*`reSet()`\*\*方法,将表格分页信息初始化

            reSet(){
              this.$refs.dynamicTable.reSet();
              this.getList();
            },

    4.

11.
