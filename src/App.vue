<template>
  <div id="app">
    <h3>示例如下</h3>
    <!-- 时间范围选择： -->
    <div class="item">
      <p>1. 时间范围选择：</p>
      <tbl-daterange-picker
        lang="en"
        v-model="defaultValue"
        align="left"
        format="yyyy-MM-dd HH:mm:ss"
        value-format="yyyy-MM-dd HH:mm:ss"
        :btnOption="btnOption"
        :picker-options="pickerOptions"
        :activeShortcut="activeShortcut"
        @change="onChange"
        @getActiveShortcut="getActiveShortcut"
      ></tbl-daterange-picker>
      <el-button type="primary" @click="clear">清空</el-button>
    </div>

    <!-- 超出范围显示...并提示tips： -->
    <div class="item">
      <p>2. 超出范围显示...并提示tips：</p>
      <div style="width:500px;margin-left: 15px">
        <p>2.1 无slot：</p>
        <tbl-tooltip-over :content="content" refName="tooltipOver" effect="dark" placement="top-start" popper-class="test-tooltip"></tbl-tooltip-over>
        <p>2.1 有slot：</p>
        <tbl-tooltip-over refName="tooltipOver" effect="dark" placement="top-start" popper-class="test-tooltip">
          <!-- <span slot="contentTip" style="color:#00f;">{{ content2 }}</span> -->
          <span slot="contentOver" style="color:#f00;font-size: 40px">{{ content1 }}</span>
        </tbl-tooltip-over>
      </div>
    </div>

    <!-- 图标选择器： -->
    <div class="item">
      <p>3. 图标选择器：</p>
      <div style="width:500px">
        <tbl-icon-picker lang="en" v-model="iconValue" type="wisdom"></tbl-icon-picker>
      </div>
    </div>

    <!-- 表格穿梭框： -->
    <div class="item">
      <p>4. 表格穿梭框：</p>
      <div style="width:800px">
        <tbl-table-transfer
          lang="en"
          class="eltTransfer"
          ref="eltTransfer"
          :show-query="true"
          :show-pagination="true"
          :pagination-call-back="paginationCallBack"
          :left-columns="leftColumns"
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
      </div>
    </div>

    <!-- cron表达式选择器： -->
    <div class="item">
      <p>5. cron表达式选择器：</p>
      <div style="width:800px">
        <!-- cron表达式输入框-->
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
      </div>
    </div>

    <!-- 动态表格 -->
    <div class="item">
      <p>6. el-table+分页+表头动态显隐的表格：</p>
      <div style="width:800px">
        <tbl-dynamic-tables
          ref="dynamicTable"
          :request="getList"
          :columns="columns"
          :pagination="paginationConfig"
          :dynamicColumns="true"
          storageKey="testTableColumns"
          lang="cn"
          @columns-change="columnsChange"
        >
          <template slot="empty">
            我是新的空页面
          </template>
          <template #isEnable="scope">
            <el-switch v-model="scope.row.isEnable" :active-value="1" :inactive-value="0"></el-switch>
          </template>
          <template #operate="scope">
            <el-button size="mini" type="primary">编辑{{ scope.row.index }}</el-button>
            <el-button size="mini" type="danger">删除</el-button>
          </template>
        </tbl-dynamic-tables>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      // daterange-picker
      defaultValue: [this.$moment(new Date()).format('YYYY-MM-DD HH:mm:ss'), this.$moment(new Date()).format('YYYY-MM-DD HH:mm:ss')],
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
      activeShortcut: null,

      // tooltip-over
      content: `他找来半张红纸和一支毛笔，让村里的一名小学老师为他写了一张告示。告示的大概内容是：因收入微薄无法承担太多应酬，除丧葬、嫁娶之外`,
      content1: `恶风读wùfēng。指病人遇风觉冷，避风则缓解之症。外感内伤俱可见恶风之证。指病邪，《素问·脉要精微论》：“来徐去疾，上虚下实`,
      content2: 112233445566,
      iconValue: '',

      // table-Transfer
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

      // cron
      showCronBox: false,
      form: {
        cronExpression: '',
      },
      cronVal: '',

      // 表格
      columns: [
        { label: '', type: 'selection', show: true },
        { label: '序号', type: 'index', show: false },
        { label: '角色名称', prop: 'nickName', show: true, required: true },
        { label: '邮箱', prop: 'userEmail', show: true, required: true },
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
    };
  },
  components: {},
  mounted() {
    var newColumns = this.$refs.dynamicTable.getColumns();
    this.$refs.dynamicTable.setColumns(newColumns);

    setTimeout(() => {
      this.activeShortcut = 2;
    });
  },
  methods: {
    onChange(val) {
      console.log(val, '获取到绑定的时间范围值');
      this.defaultValue = val;
    },

    getActiveShortcut(index, picker) {
      console.log(index, 'index');
    },

    // 清空
    clear() {
      this.defaultValue = [];
    },

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

    // 打开表达式弹窗
    openCronDialog(val) {
      this.showCronBox = true;
      this.cronVal = val;
    },

    // 确认表达式
    cronConfirm(val) {
      this.form.cronExpression = val;
      this.closeCron();
    },

    // 取消确认
    closeCron() {
      this.showCronBox = false;
      this.cronVal = '* * * * * ?';
    },

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
      // columns1：改变后的所有表头数据；
      // columns2：改变后的当前显示的表头数据
    },

    // 重置
    reSet() {
      this.$refs.dynamicTable.reSet();
      this.getList();
    },
  },
};
</script>

<style>
/* 引入自定义tbl图标（在线引用，项目中还是推荐下载下来使用） */
@import '//at.alicdn.com/t/c/font_4403618_ujpcwclle8.css';
body [class*=' icon-tbl-'],
body [class^='icon-tbl-'] {
  font-family: 'iconfontTBL' !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.item {
  margin-bottom: 20px;
}
.test-tooltip {
  max-width: 500px;
  line-height: 1.6 !important;
}
</style>
