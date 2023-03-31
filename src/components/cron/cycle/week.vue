<template lang="html">
  <div :val="value_">
    <!-- 每周 -->
    <div class="item-cell">
      <el-radio v-model="type" label="1" size="mini" border>{{ TEXT.every }}{{ itemLabel }}</el-radio>
    </div>
    <!-- 不指定 -->
    <div class="item-cell">
      <el-radio v-model="type" label="5" size="mini" border>{{ TEXT.unspecified }}</el-radio>
    </div>
    <!-- 周期 -->
    <div class="item-cell">
      <el-radio v-model="type" label="2" size="mini" border>{{ TEXT.cycle }}</el-radio>
      <div>
        <span style="margin-left: 10px;">{{ TEXT.from }}{{ TEXT.weekText }}</span>
        <el-input-number @change="type = '2'" v-model="cycle.start" :min="1" :max="7" size="mini" style="width: 100px;"></el-input-number>
        <span>{{ TEXT.weekText2 }}</span>
        <span style="margin-left: 5px;">{{ TEXT.to }}{{ TEXT.weekText }}</span>
        <el-input-number @change="type = '2'" v-model="cycle.end" :min="2" :max="7" size="mini" style="width: 100px;"></el-input-number>
        <span>{{ TEXT.weekText2 }}</span>
      </div>
    </div>
    <!-- 循环 -->
    <div class="item-cell">
      <el-radio v-model="type" label="3" size="mini" border>{{ TEXT.loop }}</el-radio>
      <div>
        <span class="span-left">{{ TEXT.start }}{{ TEXT.weekText }}</span>
        <el-input-number @change="type = '3'" v-model="loop.start" :min="1" :max="7" size="mini" style="width: 100px;"></el-input-number>
        <span class="span-left2">{{ TEXT.weekText2 }}{{ TEXT.start2 }} {{ TEXT.execute }}</span>
        <el-input-number @change="type = '3'" v-model="loop.end" :min="1" :max="7" size="mini" style="width: 100px;"></el-input-number>
        {{ TEXT.execute2 }}{{ TEXT.complex }}
      </div>
    </div>
    <!-- 指定周 -->
    <div class="item-cell">
      <el-radio v-model="type" label="7" size="mini" border>{{ TEXT.specificWeek }}</el-radio>
      <div>
        <span class="span-left">{{ TEXT.specificWeekText }}</span>
        <el-input-number @change="type = '7'" v-model="week.start" :min="1" :max="4" size="mini" style="width: 100px;"></el-input-number>
        <span class="span-left2">{{ TEXT.specificWeekText2 }}{{ TEXT.specificWeekText3 }}</span>
        <el-input-number @change="type = '7'" v-model="week.end" :min="1" :max="7" size="mini" style="width: 100px;"></el-input-number>
        {{ TEXT.specificWeekText4 }}
      </div>
    </div>
    <!-- 本月最后一个 -->
    <div class="item-cell">
      <el-radio v-model="type" label="6" size="mini" border>{{ TEXT.lastWeek }}</el-radio>
      <div>
        <span class="span-left">{{ TEXT.lastWeekText }}</span>
        <el-input-number @change="type = '6'" v-model="last" :min="1" :max="7" size="mini" style="width: 100px;"></el-input-number>
        {{ TEXT.lastWeekText2 }}
      </div>
    </div>
    <!-- 指定星期 -->
    <div class="item-cell">
      <el-radio v-model="type" label="4" size="mini" border>{{ TEXT.specific }}</el-radio>
      <el-checkbox-group v-model="appoint">
        <div v-for="i in 1" :key="i" class="checkbox-cell">
          <el-checkbox
            @change="type = '4'"
            v-for="j in 10"
            v-if="parseInt(i - 1 + '' + (j - 1)) < 8 && !(i === 1 && j === 1)"
            :key="j"
            :label="(i - 1 > 0 ? i - 1 : '') + '' + (j - 1)"
          >
            {{ i - 1 + '' + (j - 1) }}
          </el-checkbox>
        </div>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
import { use, t } from '../../../locale/index';
import en from '../../../locale/lang/en';
import cn from '../../../locale/lang/zh-CN';
export default {
  props: {
    lang: {
      type: String,
      default: 'cn', // en|cn
    },
    value: {
      type: String,
      default: '*',
    },
    itemLabel: {
      type: String,
    },
  },
  data() {
    return {
      // 页面中文字
      TEXT: {},
      type: '5', // 类型
      cycle: {
        // 周期
        start: 0,
        end: 0,
      },
      loop: {
        // 循环
        start: 0,
        end: 0,
      },
      week: {
        // 指定周
        start: 0,
        end: 0,
      },
      work: 0,
      last: 0,
      appoint: [], // 指定
    };
  },
  computed: {
    value_() {
      let result = [];
      switch (this.type) {
        case '1': // 每秒
          result.push('*');
          break;
        case '2': // 年期
          result.push(`${this.cycle.start}-${this.cycle.end}`);
          break;
        case '3': // 循环
          result.push(`${this.loop.start}/${this.loop.end}`);
          break;
        case '4': // 指定
          result.push(this.appoint.join(','));
          break;
        case '6': // 最后
          result.push(`${this.last === 0 ? '' : this.last}L`);
          break;
        case '7': // 指定周
          result.push(`${this.week.start}#${this.week.end}`);
          break;
        default:
          // 不指定
          result.push('?');
          break;
      }
      this.$emit('input', result.join(''));
      return result.join('');
    },
  },
  watch: {
    value(a, b) {
      this.updateVal();
    },
  },
  created() {
    this.updateVal();
  },
  mounted() {
    if (this.lang == 'en') {
      use(en);
    } else {
      use(cn);
    }
    this.TEXT = {
      every: t('custom.cron.every'),
      cycle: t('custom.cron.cycle'),
      loop: t('custom.cron.loop'),
      specific: t('custom.cron.specific'),
      unspecified: t('custom.cron.unspecified'),

      from: t('custom.cron.from'),
      to: t('custom.cron.to'),
      start: t('custom.cron.start'),
      start2: t('custom.cron.start2'),
      execute: t('custom.cron.execute'),
      execute2: t('custom.cron.weekCycle.weekText3'),
      complex: t('custom.cron.complex'),

      weekText: t('custom.cron.weekCycle.weekText'),
      weekText2: t('custom.cron.weekCycle.weekText2'),
      day: t('custom.cron.dayCycle.unit'),

      specificWeek: t('custom.cron.weekCycle.specificWeek'),
      specificWeekText: t('custom.cron.weekCycle.specificWeekText'),
      specificWeekText2: t('custom.cron.weekCycle.specificWeekText2'),
      specificWeekText3: t('custom.cron.weekCycle.specificWeekText3'),
      specificWeekText4: t('custom.cron.weekCycle.specificWeekText4'),

      lastWeek: t('custom.cron.weekCycle.lastWeek'),
      lastWeekText: t('custom.cron.weekCycle.lastWeekText'),
      lastWeekText2: t('custom.cron.weekCycle.lastWeekText2'),
    };
  },
  methods: {
    // 更新
    updateVal() {
      // 先清空
      this.clearVal();
      // 重新赋值
      if (!this.value) {
        return;
      }
      if (this.value === '?') {
        this.type = '5';
      } else if (this.value.indexOf('-') !== -1) {
        // 2周期
        if (this.value.split('-').length === 2) {
          this.type = '2';
          this.cycle.start = this.value.split('-')[0];
          this.cycle.end = this.value.split('-')[1];
        }
      } else if (this.value.indexOf('/') !== -1) {
        // 3循环
        if (this.value.split('/').length === 2) {
          this.type = '3';
          this.loop.start = this.value.split('/')[0];
          this.loop.end = this.value.split('/')[1];
        }
      } else if (this.value.indexOf('*') !== -1) {
        // 1每
        this.type = '1';
      } else if (this.value.indexOf('L') !== -1) {
        // 6最后
        this.type = '6';
        this.last = this.value.replace('L', '');
      } else if (this.value.indexOf('#') !== -1) {
        // 7指定周
        if (this.value.split('#').length === 2) {
          this.type = '7';
          this.week.start = this.value.split('#')[0];
          this.week.end = this.value.split('#')[1];
        }
      } else if (this.value.indexOf('W') !== -1) {
        // 8工作日
        this.type = '8';
        this.work = this.value.replace('W', '');
      } else {
        // *
        this.type = '4';
        this.appoint = this.value.split(',');
      }
    },

    // 清空选择
    clearVal() {
      this.cycle = {
        // 周期
        start: 0,
        end: 0,
      };
      this.loop = {
        // 循环
        start: 0,
        end: 0,
      };
      this.week = {
        // 指定周
        start: 0,
        end: 0,
      };
      this.work = 0;
      this.last = 0;
      this.appoint = []; // 指定
    },
  },
};
</script>

<style lang="css"></style>
