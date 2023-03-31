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
        @change="onChange"
      ></tbl-daterange-picker>
      <el-button type="primary" @click="clear">清空</el-button>
    </div>

    <!-- 超出范围显示...并提示tips： -->
    <div class="item">
      <p>2. 超出范围显示...并提示tips：</p>
      <div style="width:500px">
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

    <!-- cron表达式： -->
    <div class="item">
      <p>5. cron表达式：</p>
      <div style="width:800px">
        <el-input v-model="form.cronExpression" placeholder="请输入运行周期" clearable>
          <el-tooltip slot="append" effect="dark" content="打开表达式配置" placement="top">
            <el-button icon="el-icon-thumb" @click="openCronDialog(form.cronExpression)"></el-button>
          </el-tooltip>
        </el-input>

        <!-- cron表达式 -->
        <el-dialog title="cron表达式" :visible.sync="showCronBox" width="40%" :append-to-body="true" :before-close="closeCron" destroy-on-close>
          <tbl-cron v-model="cronVal" lang="cn"></tbl-cron>
          <span slot="footer" class="dialog-footer">
            <el-button @click="closeCron">取 消</el-button>
            <el-button type="primary" @click="cronConfirm(cronVal)">确 定</el-button>
          </span>
        </el-dialog>
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
    };
  },
  components: {},
  mounted() {},
  methods: {
    onChange(val) {
      console.log(val, '获取到绑定的时间范围值');
      this.defaultValue = val;
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
  },
};
</script>

<style>
/* 引入自定义wisdom 图标（在线引用，项目中还是推荐下载下来使用） */
@import '//at.alicdn.com/t/c/font_3506871_rdu097xhi9m.css';
/* 引入自定义noah 图标（在线引用，项目中还是推荐下载下来使用） */
@import '//at.alicdn.com/t/c/font_2902101_jlg70mqhyge.css';
.item {
  margin-bottom: 20px;
}
.test-tooltip {
  max-width: 500px;
  line-height: 1.6 !important;
}
</style>
