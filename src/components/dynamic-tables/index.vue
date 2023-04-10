<template>
  <div>
    <!-- 参考文档：https://github.com/huzhushan/vue-pro-table -->
    <!-- 工具栏 -->
    <div class="toolbar">
      <slot name="toolbar"></slot>
    </div>

    <!-- table表格栏 -->
    <div class="dynamic-table">
      <!-- 表头设置 -->
      <el-dropdown trigger="click" :hide-on-click="false" ref="dropdown" class="dynamic-dropdown" v-if="dynamicColumns">
        <span class="setting">
          <i class="el-icon-setting"></i>
        </span>
        <el-dropdown-menu slot="dropdown" class="col-dropdown">
          <h5 class="h5-title">
            <span>{{ colSettingTitle }}</span>
            <i class="el-icon-close" @click="closeDrop"></i>
          </h5>
          <div v-for="(tr, j) in columns" :key="j" class="content">
            <el-dropdown-item :command="tr.type === 'selection' ? '多选' : tr.label + ':' + j" :disabled="tr.required" class="colItem">
              <div class="cell" @click="colChange(tr)">
                <span>{{ tr.type === 'selection' ? '多选' : tr.label }}</span>
                <i class="el-icon-check" v-if="tr.show"></i>
              </div>
            </el-dropdown-item>
          </div>
        </el-dropdown-menu>
      </el-dropdown>

      <!-- 表格 -->
      <el-table :data="tableData" v-bind="$attrs" v-on="$listeners">
        <el-table-column
          v-for="(col, index) in _columns"
          :key="col.label + index"
          :filter-method="col.filters && filterHandler"
          :show-overflow-tooltip="!col.wrap"
          v-bind="col"
        >
          <!-- slot -->
          <template #header="scope" v-if="!!col.labelSlot">
            <slot :name="col.labelSlot" v-bind="scope"></slot>
          </template>
          <template #default="scope" v-if="!!col.tdSlot">
            <slot :name="col.tdSlot" v-bind="scope"></slot>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <el-pagination
      v-if="paginationConfig.show && total > 0"
      class="pagination"
      :style="paginationConfig.style"
      @size-change="handleSizeChange"
      :current-page.sync="pageNum"
      @current-change="handleCurrentChange"
      :page-sizes="paginationConfig.pageSizes"
      :page-size.sync="pageSize"
      :layout="paginationConfig.layout"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
import { use, t } from '../../locale/index';
import en from '../../locale/lang/en';
import cn from '../../locale/lang/zh-CN';

export default {
  name: 'TblDynamicTables',
  props: {
    // 语言
    lang: {
      type: String,
      default: 'cn', // en|cn
    },
    // 请求数据的方法
    request: {
      type: Function,
    },
    // 表头配置
    columns: {
      type: Array,
      default: function(params) {
        return [];
      },
    },
    // 分页配置，false表示不显示分页
    pagination: {
      type: [Boolean, Object],
      default: () => ({}),
    },
    // 动态表头配置，false表示不显示表头配置按钮
    dynamicColumns: {
      type: Boolean,
      default: true,
    },
  },
  components: {},
  data() {
    let paginationConfig = {
      show: false,
    };
    if (typeof this.pagination === 'object') {
      const { layout, pageSizes, style } = this.pagination;
      paginationConfig = {
        show: true,
        layout: layout || 'total, sizes, prev, pager, next, jumper',
        pageSizes: pageSizes || [10, 20, 30, 40, 50, 100],
        style: style || {},
      };
    }

    return {
      colSettingTitle: '', // 表头设置
      _columns: [],
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: (!!this.pagination && this.pagination.pageSize) || 10,
      paginationConfig,
    };
  },
  created() {
    this._columns = this.columns.filter(item => {
      if (item.show === undefined) {
        item.show = true;
      }
      return item.show;
    });
    // 请求列表数据
    this.getTableData();
  },
  mounted() {
    if (this.lang == 'en') {
      use(en);
    } else {
      use(cn);
    }
    this.colSettingTitle = t('custom.dynamicsTable.colSettingTitle');
  },
  methods: {
    // 请求列表数据
    async getTableData() {
      const { data, total } = await this.request({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      });
      this.tableData = data;
      this.total = total;
    },
    // 当前页变化
    handleCurrentChange(page) {
      this.getTableData();
    },
    // 改变每页size数量
    handleSizeChange(value) {
      this.pageNum = 1;
      this.getTableData();
    },
    // 表头设置
    colChange(item) {
      item.show = !item.show;
      this._columns = this.columns.filter(item => {
        if (item.show === undefined) {
          item.show = true;
        }
        return item.show;
      });
      this.sendDynamicColumns(this.columns, this._columns);
    },
    // 关闭表头设置
    closeDrop() {
      this.$refs.dropdown.hide();
    },
    // 过滤方法
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    // 抛出动态表头
    sendDynamicColumns(columns1, columns2) {
      this.$emit('columns-change', columns1, columns2);
    },
  },
};
</script>
<style lang="scss" scoped>
.dynamic-table {
  position: relative;
  .dynamic-dropdown {
    position: absolute;
    right: 0;
    z-index: 999;
    transform: translate(0, 8px);
    .setting {
      font-size: 16px;
      padding: 8px 10px;
    }
  }
}
.pagination {
  padding: 0 20px 20px;
  text-align: right;
  :last-child {
    margin-right: 0;
  }
}

.el-dropdown-menu {
  min-width: 200px;
  .h5-title {
    font-size: 14px;
    padding: 10px;
    margin: 0;
    border-bottom: 1px solid #dcdfe6;
    display: flex;
    align-items: center;
    justify-content: space-between;
    i {
      font-size: 20px;
      opacity: 0.8;
      cursor: pointer;
    }
  }
  .colItem {
    font-size: 14px;
    line-height: normal;
    padding: 10px 15px;
    .cell {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
