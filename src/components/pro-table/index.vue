<template>
  <!-- 参考文档：https://github.com/huzhushan/vue-pro-table -->
  <div class="page-box">
    <!-- 工具栏 -->
    <div class="toolbar">
      <slot name="toolbar"></slot>
    </div>
    <!-- table表格栏 -->
    <div class="table">
      <el-table :data="tableData" v-bind="$attrs" v-on="$listeners" ref="table">
        <el-table-column
          v-for="item in columns"
          :key="item.label"
          :filter-method="item.filters && filterHandler"
          :show-overflow-tooltip="!item.wrap"
          v-bind="item"
        >
          <template #header="scope" v-if="!!item.labelSlot">
            <slot :name="item.labelSlot" v-bind="scope"></slot>
          </template>
          <template #default="scope" v-if="!!item.tdSlot">
            <slot :name="item.tdSlot" v-bind="scope"></slot>
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
export default {
  name: 'TblProTable',
  props: {
    // 请求数据的方法
    request: {
      type: Function,
    },
    // 搜索表单配置，false表示不显示搜索表单
    search: {
      type: [Boolean, Object],
      default: false,
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
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: (!!this.pagination && this.pagination.pageSize) || 10,
      paginationConfig,
    };
  },
  created() {
    // 请求列表数据
    this.getTableData();
  },
  methods: {
    // 请求列表数据
    async getTableData() {
      const { data, total } = await this.request({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      });
      console.log(data, total, 'data');
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
    // 过滤方法
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
  },
};
</script>
<style lang="scss" scoped>
.page-box {
  width: 100%;
  box-sizing: border-box;
  .search {
    padding: 20px 20px 0;
    background: #fff;
    margin-bottom: 10px;
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
      margin-bottom: 20px;
    }
    .search-btn {
      margin-left: auto;
    }
    ::v-deep {
      .el-input-number .el-input__inner {
        text-align: left;
      }
    }
  }
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 20px 0;
    background: #fff;
  }
  .table {
    padding: 20px;
    background: #fff;
    ::v-deep th {
      background: #f6f6f6;
      color: rgba(0, 0, 0, 0.85);
    }
  }
  .pagination {
    padding: 0 20px 20px;
    background: #fff;
    text-align: right;
    :last-child {
      margin-right: 0;
    }
  }
}
</style>
