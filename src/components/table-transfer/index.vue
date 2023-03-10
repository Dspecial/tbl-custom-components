<template>
  <div class="transfer">
    <div class="transfer-panel">
      <p class="transfer-panel-header">
        <span>{{ _titleTexts && _titleTexts[0] }}</span>
        <span>{{ leftSelection.length }}/{{ leftTableData.length }}</span>
      </p>
      <div v-if="showQuery" class="transfer-panel-query">
        <el-form :inline="true" :model="leftQueryCondition" class="query-form">
          <slot name="leftCondition" v-bind:scope="leftQueryCondition"></slot>
          <el-form-item>
            <el-button type="primary" size="mini" @click="onLeftQuerySubmit()">{{ _queryTexts && _queryTexts[0] }}</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        ref="leftTable"
        size="small"
        :max-height="maxHeight"
        :height="minHeight"
        :data="leftTableData"
        :row-key="tableRowKey"
        :row-style="handleRowStyle"
        @row-click="handleLeftRowClick"
        @selection-change="handleLeftSelectionChange"
        :border="tableBorder"
        :stripe="tableStripe"
      >
        <el-table-column width="50px" type="selection" :selectable="handleSelectable"></el-table-column>
        <el-table-column v-for="col in leftColumns" :prop="col.id" :key="col.id" :label="col.label" :width="col.width">
          <template slot-scope="scope">
            <slot v-bind:scope="{ row: scope.row, col: col }">
              <span>{{ scope.row[col.id] }}</span>
            </slot>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="showPagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :current-page="pageIndex"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        :pager-count="5"
        :total="totalSize"
        layout="total, prev, pager, next"
      ></el-pagination>
    </div>
    <div class="transfer-buttons">
      <el-button type="primary" :class="buttonClasses" :disabled="disabledLeftButton" @click.native="addToRight">
        <span v-if="buttonTexts[0] !== undefined" class="button-text">{{ buttonTexts[0] }}</span>
        <i class="el-icon-arrow-right"></i>
      </el-button>
      <el-button type="primary" :class="buttonClasses" :disabled="rightSelection.length === 0" @click.native="addToLeft">
        <i class="el-icon-arrow-left"></i>
        <span v-if="buttonTexts[1] !== undefined" class="button-text">{{ buttonTexts[1] }}</span>
      </el-button>
    </div>
    <div class="transfer-panel">
      <p class="transfer-panel-header">
        <span>{{ _titleTexts && _titleTexts[1] }}</span>
        <span>{{ rightSelection.length }}/{{ rightTableData.length }}</span>
      </p>
      <div v-if="showQuery" class="transfer-panel-query">
        <el-form :inline="true" :model="rightQueryCondition" class="query-form">
          <slot name="rightCondition" v-bind:scope="rightQueryCondition"></slot>
          <el-form-item>
            <el-button type="primary" size="mini" @click="onRightQuerySubmit()">{{ _queryTexts && _queryTexts[1] }}</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        ref="rightTable"
        size="small"
        :max-height="maxHeight"
        :height="minHeight"
        :data="calcRightTableData"
        :row-key="tableRowKey"
        @row-click="handleRightRowClick"
        @selection-change="handleRightSelectionChange"
        :border="tableBorder"
        :stripe="tableStripe"
      >
        <el-table-column width="50px" type="selection"></el-table-column>
        <el-table-column v-for="col in rightColumns || leftColumns" :prop="col.id" :key="col.id" :label="col.label" :width="col.width">
          <template slot-scope="scope">
            <slot v-bind:scope="{ row: scope.row, col: col }">
              <span>{{ scope.row[col.id] }}</span>
            </slot>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-if="showPagination" :total="rightTableData.length" layout="total"></el-pagination>
    </div>
  </div>
</template>

<script>
import { use, t } from '../../locale/index';
import en from '../../locale/lang/en';
import cn from '../../locale/lang/zh-CN';
export default {
  name: 'TblTableTransfer',
  props: {
    lang: {
      type: String,
      default: 'cn', // en|cn
    },
    value: {
      type: Array,
      default() {
        return [];
      },
    },
    // ??????????????????
    showQuery: {
      type: Boolean,
      default: false,
    },
    // ????????????
    showPagination: {
      type: Boolean,
      default: false,
    },
    // ??????????????????
    paginationCallBack: {
      type: Function,
      default: function() {
        return new Promise((resolve, reject) => {
          try {
            resolve({ total: 0, data: null });
          } catch (e) {
            reject();
          }
        });
      },
    },
    // ????????????
    titleTexts: {
      type: Array,
      // default() {
      //   return ['?????????', '?????????'];
      // },
    },
    // ???????????????????????????
    buttonTexts: {
      type: Array,
      default() {
        return [];
      },
    },
    // ??????????????????
    queryTexts: {
      type: Array,
      // default() {
      //   return ['??????', '??????'];
      // },
    },
    // ????????????
    leftColumns: {
      type: Array,
      default() {
        return [];
      },
    },
    // ????????????
    rightColumns: {
      type: Array,
      default() {
        return undefined;
      },
    },
    // ???????????????
    tableStripe: {
      type: Boolean,
      default: false,
    },
    // ????????????
    tableBorder: {
      type: Boolean,
      default: false,
    },
    // ??????????????????
    minHeight: {
      type: String,
      default: '300px',
    },
    // ??????????????????
    maxHeight: {
      type: String,
      default: '500px',
    },
    // ??????????????????Key
    tableRowKey: {
      type: Function,
      default(row) {
        return row && row && row.id;
      },
    },
  },
  data() {
    return {
      leftTableData: [],
      rightTableData: this.value || [],
      pageIndex: 1,
      pageSize: 10,
      totalSize: 0,
      leftSelection: [],
      rightSelection: [],
      leftQueryCondition: {},
      rightQueryCondition: {},
      rightConditionTemp: undefined,
    };
  },
  computed: {
    _titleTexts() {
      if (this.lang == 'en') {
        use(en);
      } else {
        use(cn);
      }
      return this.titleTexts || [t('custom.tableTransfer.titleLeft'), t('custom.tableTransfer.titleRight')];
    },
    _queryTexts() {
      if (this.lang == 'en') {
        use(en);
      } else {
        use(cn);
      }
      return this.queryTexts || [t('custom.tableTransfer.queryLeft'), t('custom.tableTransfer.queryRight')];
    },
    hasButtonTexts() {
      return this.buttonTexts.length === 2;
    },
    buttonClasses() {
      return ['transfer-button', { 'is-with-texts': this.hasButtonTexts }];
    },
    disabledLeftButton() {
      return !this.leftSelection.some(leftRow => !this.rightTableData.some(rightRow => this.checkObjectIsEqual(leftRow, rightRow)));
    },
    calcRightTableData() {
      if (this.showQuery && this.rightConditionTemp) {
        // ???????????????????????????????????????????????????????????????
        var objIsEmpty = true;
        for (var key in this.rightConditionTemp) {
          if (
            typeof this.rightConditionTemp[key] != 'undefined' &&
            typeof this.rightConditionTemp[key] != 'null' &&
            this.rightConditionTemp[key] != null &&
            this.rightConditionTemp[key] != ''
          ) {
            objIsEmpty = false;
            break;
          }
        }
        if (objIsEmpty) {
          return this.rightTableData;
        } else {
          // ?????????????????????
          let tempFilter = {};
          for (var key in this.rightConditionTemp) {
            if (
              typeof this.rightConditionTemp[key] != 'undefined' &&
              typeof this.rightConditionTemp[key] != 'null' &&
              this.rightConditionTemp[key] != null &&
              this.rightConditionTemp[key] != ''
            ) {
              tempFilter[key] = this.rightConditionTemp[key];
            }
          }
          return this.rightTableData.filter(item => {
            let flag = false;
            for (key in tempFilter) {
              // console.log(key,'??????key')
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
      }
      return this.rightTableData;
    },
  },
  created() {
    if (this.lang == 'en') {
      use(en);
    } else {
      use(cn);
    }
    this.handlePaginationCallBack();
  },
  mounted() {
    if (this.lang == 'en') {
      use(en);
    } else {
      use(cn);
    }
  },
  methods: {
    handleLeftSelectionChange(selection) {
      this.leftSelection = selection;
    },
    handleRightSelectionChange(selection) {
      this.rightSelection = selection;
    },
    handleLeftRowClick(row) {
      if (!this.rightTableData.some(rightRow => this.checkObjectIsEqual(rightRow, row))) {
        this.$refs.leftTable.toggleRowSelection(row);
      }
    },
    handleRightRowClick(row) {
      this.$refs.rightTable.toggleRowSelection(row);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.handlePaginationCallBack();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.handlePaginationCallBack();
    },
    handlePaginationCallBack() {
      if (this.showPagination && this.paginationCallBack) {
        const condition = {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          ...this.leftQueryCondition,
        };
        this.paginationCallBack.call(null, condition).then(result => {
          if (result && Array.isArray(result.data)) {
            this.leftTableData = result.data;
            this.totalSize = result.total;
          }

          this.$nextTick(() => {
            this.leftTableData.forEach(leftRow => {
              const isHave = this.rightTableData.some(rightRow => this.checkObjectIsEqual(rightRow, leftRow));
              this.$refs.leftTable.toggleRowSelection(leftRow, isHave);
            });
          });
        });
      }
    },
    handleRowStyle({ row }) {
      if (this.rightTableData.some(rightRow => this.checkObjectIsEqual(rightRow, row))) {
        return {
          color: '#0081FF',
        };
      }
      return {};
    },
    handleSelectable(row) {
      return !this.rightTableData.some(rightRow => this.checkObjectIsEqual(rightRow, row));
    },
    addToRight() {
      for (const item of this.leftSelection) {
        const isHave = this.rightTableData.some(rightRow => this.checkObjectIsEqual(rightRow, item));
        if (!isHave) {
          this.rightTableData.push(item);
        }
      }
      this.$emit('input', this.rightTableData);
    },
    addToLeft() {
      this.rightSelection.forEach(item => {
        const index = this.rightTableData.findIndex(rightRow => this.checkObjectIsEqual(rightRow, item));
        if (index !== -1) {
          this.rightTableData.splice(index, 1);

          const leftRow = this.leftTableData.find(leftRow => this.checkObjectIsEqual(leftRow, item));
          if (leftRow) {
            this.$refs.leftTable.toggleRowSelection(leftRow, false);
          }
        }
      });
      this.$emit('input', this.rightTableData);
    },
    onLeftQuerySubmit() {
      this.pageIndex = 1;
      this.handlePaginationCallBack();
    },
    onRightQuerySubmit() {
      this.rightConditionTemp = JSON.parse(JSON.stringify(this.rightQueryCondition));
    },
    checkObjectIsEqual(rowObj1, rowObj2) {
      return this.tableRowKey(rowObj1) === this.tableRowKey(rowObj2);
    },
    clear() {
      this.rightTableData = [];
      this.$refs.leftTable.clearSelection();
      for (const key in this.leftQueryCondition) {
        this.leftQueryCondition[key] = undefined;
      }
      for (const key in this.rightQueryCondition) {
        this.rightQueryCondition[key] = undefined;
      }
      this.pageIndex = 1;
      this.handlePaginationCallBack();
    },
  },
};
</script>

<style lang="scss" scoped>
.transfer {
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.query-form {
  margin: 5px;
  display: flex;
}
/deep/.query-form .el-form-item--mini.el-form-item,
/deep/.query-form .el-form-item--small.el-form-item {
  margin-bottom: 0 !important;
}
.el-icon-arrow-right,
.el-icon-arrow-left {
  font-size: 40px;
  cursor: pointer;
}
.transfer-panel {
  border: 1px solid #ebeef5;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  display: inline-block;
  width: calc((100% - 60px) / 2);
  max-height: 100%;
  box-sizing: border-box;
  position: relative;
}

.transfer-panel .transfer-panel-header {
  height: 40px;
  line-height: 40px;
  background: #f5f7fa;
  margin: 0;
  padding-left: 15px;
  border-bottom: 1px solid #ebeef5;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #000;
}

.transfer-panel-header span:last-child {
  position: absolute;
  right: 15px;
}

.transfer-buttons {
  display: inline-block;
  vertical-align: middle;
  width: 60px;
}

.transfer-button {
  display: block;
  margin: 0 auto;
  padding: 10px;
  border-radius: 4px;
  color: #fff;
  background-color: #0081ff;
  font-size: 0;
}

.transfer-button .button-text {
  margin-left: 2px;
  margin-right: 5px;
}

.transfer-button.is-with-texts {
  border-radius: 4px;
}

.transfer-button.is-disabled,
.transfer-button.is-disabled:hover {
  border: 1px solid #dcdfe6;
  background-color: #f5f7fa;
  color: #c0c4cc;
}

.transfer-button:first-child {
  margin-bottom: 10px;
}

.transfer-button:nth-child(2) {
  margin: 0 auto;
}

.transfer-button i,
.transfer-button span {
  font-size: 14px;
}
</style>
