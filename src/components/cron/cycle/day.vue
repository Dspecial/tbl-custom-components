<template lang="html">
  <div :val="value_">
    <!-- 每日 -->
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
        <span class="span-left">{{ TEXT.from }}</span>
        <el-input-number @change="type = '2'" v-model="cycle.start" :min="1" :max="31" size="mini" style="width: 100px;"></el-input-number>
        <span class="span-left2">{{ TEXT.to }}</span>
        <el-input-number @change="type = '2'" v-model="cycle.end" :min="2" :max="31" size="mini" style="width: 100px;"></el-input-number>
        {{ itemLabel }}{{ TEXT.complex }}
      </div>
    </div>
    <!-- 循环 -->
    <div class="item-cell">
      <el-radio v-model="type" label="3" size="mini" border>{{ TEXT.loop }}</el-radio>
      <div>
        <span class="span-left">{{ TEXT.start }}</span>
        <el-input-number @change="type = '3'" v-model="loop.start" :min="1" :max="31" size="mini" style="width: 100px;"></el-input-number>
        <span class="span-left2">{{ itemLabel }}{{ TEXT.start2 }}{{ TEXT.execute }}</span>
        <el-input-number @change="type = '3'" v-model="loop.end" :min="1" :max="31" size="mini" style="width: 100px;"></el-input-number>
        {{ itemLabel }}{{ TEXT.complex }}{{ TEXT.execute2 }}
      </div>
    </div>
    <!-- 工作日 -->
    <div class="item-cell">
      <el-radio v-model="type" label="8" size="mini" border>{{ TEXT.workday }}</el-radio>
      <div>
        <span class="span-left">{{ TEXT.workday2 }}</span>
        <el-input-number @change="type = '8'" v-model="work" :min="1" :max="7" size="mini" style="width: 100px;"></el-input-number>
        {{ TEXT.workday3 }}
      </div>
    </div>
    <!-- 本月最后一天 -->
    <div class="item-cell">
      <el-radio v-model="type" label="6" size="mini" border>{{ TEXT.lastDay }}</el-radio>
    </div>
    <!-- 指定 -->
    <div class="item-cell">
      <el-radio v-model="type" label="4" size="mini" border>{{ TEXT.specific }}</el-radio>
      <el-checkbox-group v-model="appoint">
        <div v-for="i in 4" :key="i" class="checkbox-cell">
          <el-checkbox
            @change="type = '4'"
            v-for="j in 10"
            v-if="parseInt(i - 1 + '' + (j - 1)) < 32 && !(i === 1 && j === 1)"
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
      default: '?',
    },
    itemLabel: {
      type: String,
    },
  },
  data() {
    return {
      // 页面中文字
      TEXT: {},
      type: '1', // 类型
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
        case '2': // 周期
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
        case '8': // 工作日
          result.push(`${this.work}W`);
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
      execute2: t('custom.cron.execute2'),
      complex: t('custom.cron.complex'),

      workday: t('custom.cron.dayCycle.workday'),
      workday2: t('custom.cron.dayCycle.workday2'),
      workday3: t('custom.cron.dayCycle.workday3'),
      lastDay: t('custom.cron.dayCycle.lastDay'),
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
