<template lang="html">
  <!-- 参考文档：https://gitee.com/lindeyi/vue-cron?_from=gitee_search -->
  <div class="cron" :val="value_">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="ITEMS.second" name="s">
        <second-and-minute v-model="sVal" :itemLabel="UNITS.second" :lang="lang"></second-and-minute>
      </el-tab-pane>
      <el-tab-pane :label="ITEMS.minute" name="m">
        <second-and-minute v-model="mVal" :itemLabel="UNITS.minute" :lang="lang"></second-and-minute>
      </el-tab-pane>
      <el-tab-pane :label="ITEMS.hour" name="h">
        <hour v-model="hVal" :itemLabel="UNITS.hour" :lang="lang"></hour>
      </el-tab-pane>
      <el-tab-pane :label="ITEMS.day" name="d">
        <day v-model="dVal" :itemLabel="UNITS.day" :lang="lang"></day>
      </el-tab-pane>
      <el-tab-pane :label="ITEMS.month" name="month">
        <month v-model="monthVal" :itemLabel="UNITS.month" :lang="lang"></month>
      </el-tab-pane>
      <el-tab-pane :label="ITEMS.week" name="week">
        <week v-model="weekVal" :itemLabel="UNITS.week" :lang="lang"></week>
      </el-tab-pane>
      <el-tab-pane :label="ITEMS.year" name="year">
        <year v-model="yearVal" :itemLabel="UNITS.year" :lang="lang"></year>
      </el-tab-pane>
    </el-tabs>
    <!-- table -->
    <el-table :data="tableData" size="mini" border style="width: 100%;margin-top:10px">
      <el-table-column prop="sVal" :label="ITEMS.second"></el-table-column>
      <el-table-column prop="mVal" :label="ITEMS.minute"></el-table-column>
      <el-table-column prop="hVal" :label="ITEMS.hour"></el-table-column>
      <el-table-column prop="dVal" :label="ITEMS.day"></el-table-column></el-table-column>
      <el-table-column prop="monthVal" :label="ITEMS.month"></el-table-column>
      <el-table-column prop="weekVal" :label="ITEMS.week"></el-table-column>
      <el-table-column prop="yearVal" :label="ITEMS.year" width="150"></el-table-column>
    </el-table>
    <div style="color: #E6A23C; font-size: 12px;margin-top:10px">Tips: {{TIPS}}</div>
  </div>
</template>

<script>
import { use, t } from '../../locale/index';
import en from '../../locale/lang/en';
import cn from '../../locale/lang/zh-CN';

import SecondAndMinute from './cycle/secondAndMinute';
import hour from './cycle/hour';
import day from './cycle/day';
import month from './cycle/month';
import week from './cycle/week';
import year from './cycle/year';

export default {
  name: 'TblCron',
  components: {
    SecondAndMinute,
    hour,
    day,
    month,
    week,
    year,
  },
  props: {
    lang: {
      type: String,
      default: 'cn', // en|cn
    },
    value: {
      type: String,
    },
  },
  data() {
    return {
      ITEMS: {},
      UNITS:{},
      TIPS:'',
      
      activeName: 's',
      sVal: '',
      mVal: '',
      hVal: '',
      dVal: '',
      monthVal: '',
      weekVal: '',
      yearVal: '',
    };
  },
  watch: {
    value(a, b) {
      this.updateVal();
    },
  },
  computed: {
    tableData() {
      return [
        {
          sVal: this.sVal,
          mVal: this.mVal,
          hVal: this.hVal,
          dVal: this.dVal,
          monthVal: this.monthVal,
          weekVal: this.weekVal,
          yearVal: this.yearVal,
        },
      ];
    },
    value_() {
      if (this.lang == 'en') {
        use(en);
      } else {
        use(cn);
      }
      if (!this.dVal && !this.weekVal) {
        return '';
      }
      if (this.dVal === '?' && this.weekVal === '?') {
        this.$message.error(t('custom.cron.errorText1'));
        return
      }
      if (this.dVal !== '?' && this.weekVal !== '?') {
        this.$message.error(t('custom.cron.errorText2'));
        return
      }
      let v = `${this.sVal} ${this.mVal} ${this.hVal} ${this.dVal} ${this.monthVal} ${this.weekVal} ${this.yearVal}`;
      if (v !== this.value) {
        this.$emit('input', v);
      }
      return v;
    },
  },
  created() {
    this.updateVal();
  },
  mounted(){
    if (this.lang == 'en') {
      use(en);
    } else {
      use(cn);
    }
    this.ITEMS = {
      second: t('custom.cron.cycles.second'),
      minute: t('custom.cron.cycles.minute'),
      hour: t('custom.cron.cycles.hour'),
      day: t('custom.cron.cycles.day'),
      week: t('custom.cron.cycles.week'),
      month: t('custom.cron.cycles.month'),
      year: t('custom.cron.cycles.year')
    };
    this.UNITS = {
      second: t('custom.cron.secondCycle.unit'),
      minute: t('custom.cron.minuteCycle.unit'),
      hour: t('custom.cron.hourCycle.unit'),
      day: t('custom.cron.dayCycle.unit'),
      week: t('custom.cron.weekCycle.unit'),
      month: t('custom.cron.monthCycle.unit'),
      year: t('custom.cron.yearCycle.unit')
    };

    this.TIPS = t('custom.cron.tips');

  },
  methods: {
    // 更新
    updateVal() {
      if (!this.value) {
        return;
      }
      let arrays = this.value.split(' ');
      this.sVal = arrays[0];
      this.mVal = arrays[1];
      this.hVal = arrays[2];
      this.dVal = arrays[3];
      this.monthVal = arrays[4];
      this.weekVal = arrays[5];
      this.yearVal = arrays[6];
    },
  },
};
</script>

<style lang="scss">
.cron {
  text-align: left;
  padding: 10px;
  border: 1px solid #DCDFE6;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  .el-checkbox {
    margin-right: 5px;
  }
  .el-checkbox + .el-checkbox {
    margin-left: 10px;
  }
  .el-radio {
    margin-right: 5px;
  }
  .el-tab-pane .item-cell{
    margin-bottom: 10px;
    display: flex;
    .span-left{
      margin: 0 8px 0 15px;
    }
    .span-left2{
      margin: 0 8px 0 8px;
    }
  }
  .el-tab-pane .item-cell:last-child{
    margin-bottom: 0;
  }
  .checkbox-cell{
    margin-left: 15px;
    margin-bottom: 10px;
  }
  .checkbox-cell:last-child{
    margin-bottom: 0;
  }
}
</style>
