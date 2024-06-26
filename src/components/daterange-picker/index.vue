<template>
  <!-- 继承el-date-picker的所有属性和方法 -->
  <el-date-picker
    ref="datePicker"
    v-model="currentValue"
    :picker-options="Object.keys(btnOption).length === 0 ? ' ' : _pickerOptions"
    v-bind="$attrs"
    v-on="$listeners"
    :type="type"
    :popper-class="poperClass"
    :start-placeholder="_startPlaceholder"
    :end-placeholder="_endPlaceholder"
    @focus.once="focus(activeShortcut)"
  >
    <template #[slotName]="slotProps" v-for="(slot, slotName) in $slots">
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </el-date-picker>
</template>

<script>
import { use, t } from '../../locale/index';
import en from '../../locale/lang/en';
import cn from '../../locale/lang/zh-CN';
export default {
  name: 'TblDaterangePicker',
  components: {},
  props: {
    lang: {
      type: String,
      default: 'cn', // en|cn
    },
    value: {
      type: [Array, String],
      default: () => {
        return [];
      },
    },
    type: {
      type: String,
      default: 'datetimerange', // daterange|mouthrange|datetimerange
    },
    startPlaceholder: {
      type: String,
      // default: '开始日期',
    },
    endPlaceholder: {
      type: String,
      // default: '结束日期',
    },
    btnOption: {
      type: [Object, Boolean],
      default: function() {
        return {
          isYesterday: true,
          isToday: true,
          isPreWeek: true,
          isThisWeek: true,
          isPreMonth: true,
          isThisMonth: true,
          isLast7days: true,
          isLast30days: true,
          isLast90days: true,
        };
      },
    },
    pickerOptions: {
      type: [Array, String, Object],
      default: () => {
        return {
          shortcuts: [],
          disabledDate(date) {
            return date.getTime() > Date.now();
          },
        };
      },
    },
    activeShortcut: {
      type: [String, Number],
      default: () => {
        return '';
      },
    },
  },
  data() {
    return {
      currentValue: this.value,
      yesterdayBtn: {},
      todayBtn: {},
      preWeekBtn: {},
      thisWeekBtn: {},
      preMonthBtn: {},
      thisMonthBtn: {},
      last7daysBtn: {},
      last30daysBtn: {},
      last90daysBtn: {},
      poperClass: 'shortcut-date-range-picker-' + Math.random(),
    };
  },
  watch: {
    value: {
      handler(newVal, oldVal) {
        this.currentValue = newVal;
      },
      deep: true,
    },
  },
  computed: {
    _startPlaceholder() {
      if (this.lang == 'en') {
        use(en);
      } else {
        use(cn);
      }
      return this.startPlaceholder || t('custom.daterange.startPlaceholder');
    },
    _endPlaceholder() {
      if (this.lang == 'en') {
        use(en);
      } else {
        use(cn);
      }
      return this.endPlaceholder || t('custom.daterange.endPlaceholder');
    },
    _pickerOptions() {
      return this.pickerOptions;
    },
  },
  created() {},
  mounted() {
    if (this.lang == 'en') {
      use(en);
    } else {
      use(cn);
    }
    this.yesterdayBtn = {
      text: t('custom.daterange.yesterdayBtn'),
      onClick: picker => {
        const start = new Date(new Date(new Date().toLocaleDateString()).getTime());
        const end = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1);
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
        end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
        if (picker) {
          picker.$emit('pick', [start, end]);
          this.$emit('getActiveShortcut', 0, picker);
        } else {
          this.currentValue = [start, end];
        }
        this.changeShortcut(0, picker); // 选中样式
      },
    };
    this.todayBtn = {
      text: t('custom.daterange.todayBtn'),
      onClick: picker => {
        const start = new Date(new Date(new Date().toLocaleDateString()).getTime());
        const end = new Date();
        if (picker) {
          picker.$emit('pick', [start, end]);
          this.$emit('getActiveShortcut', 1, picker);
        } else {
          this.currentValue = [start, end];
        }
        this.changeShortcut(1, picker); // 选中样式
      },
    };
    this.preWeekBtn = {
      text: t('custom.daterange.preWeekBtn'),
      onClick: picker => {
        const o_sDate = new Date(new Date(new Date().toLocaleDateString()).getTime());
        o_sDate.setTime(o_sDate.getTime() - 3600 * 1000 * 24 * 7);
        const o_eDate = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1);
        o_eDate.setTime(o_eDate.getTime() - 3600 * 1000 * 24 * 7);
        var day = o_sDate.getDay();
        const end = new Date();
        const start = new Date();
        if (day == 0) {
          start.setDate(o_sDate.getDate());
          end.setDate(o_eDate.getDate() + 6);
        } else {
          start.setTime(o_sDate.getTime() - 3600 * 1000 * 24 * day);
          end.setTime(o_eDate.getTime() + 3600 * 1000 * 24 * (6 - day));
        }
        if (picker) {
          picker.$emit('pick', [start, end]);
          this.$emit('getActiveShortcut', 2, picker);
        } else {
          this.currentValue = [start, end];
        }
        this.changeShortcut(2, picker); // 选中样式
      },
    };
    this.thisWeekBtn = {
      text: t('custom.daterange.thisWeekBtn'),
      onClick: picker => {
        const start = new Date(new Date(new Date().toLocaleDateString()).getTime());
        const end = new Date();
        var thisDay = start.getDay();
        var thisDate = start.getDate();
        if (thisDay != 0) {
          start.setDate(thisDate - thisDay);
        }
        if (picker) {
          picker.$emit('pick', [start, end]);
          this.$emit('getActiveShortcut', 3, picker);
        } else {
          this.currentValue = [start, end];
        }
        this.changeShortcut(3, picker); // 选中样式
      },
    };
    this.preMonthBtn = {
      text: t('custom.daterange.preMonthBtn'),
      onClick: picker => {
        const oDate = new Date();
        var year = oDate.getFullYear();
        var month = oDate.getMonth();
        var start, end;
        if (month == 0) {
          year--;
          start = new Date(new Date(new Date(year, 11, 1).toLocaleDateString()).getTime());
          end = new Date(new Date(new Date(year, 11, 31).toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1);
        } else {
          start = new Date(new Date(new Date(year, month - 1, 1).toLocaleDateString()).getTime());
          end = new Date(new Date(new Date(year, month, 0).toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1);
        }
        if (picker) {
          picker.$emit('pick', [start, end]);
          this.$emit('getActiveShortcut', 4, picker);
        } else {
          this.currentValue = [start, end];
        }
        this.changeShortcut(4, picker); // 选中样式
      },
    };
    this.thisMonthBtn = {
      text: t('custom.daterange.thisMonthBtn'),
      onClick: picker => {
        const start = new Date(new Date(new Date().toLocaleDateString()).getTime());
        const end = new Date();
        start.setDate(1);
        if (picker) {
          picker.$emit('pick', [start, end]);
          this.$emit('getActiveShortcut', 5, picker);
        } else {
          this.currentValue = [start, end];
        }
        this.changeShortcut(5, picker); // 选中样式
      },
    };
    this.last7daysBtn = {
      text: t('custom.daterange.last7daysBtn'),
      onClick: picker => {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        if (picker) {
          picker.$emit('pick', [start, end]);
          this.$emit('getActiveShortcut', 6, picker);
        } else {
          this.currentValue = [start, end];
        }
        this.changeShortcut(6, picker); // 选中样式
      },
    };
    this.last30daysBtn = {
      text: t('custom.daterange.last30daysBtn'),
      onClick: picker => {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        if (picker) {
          picker.$emit('pick', [start, end]);
          this.$emit('getActiveShortcut', 7, picker);
        } else {
          this.currentValue = [start, end];
        }
        this.changeShortcut(7, picker); // 选中样式
      },
    };
    this.last90daysBtn = {
      text: t('custom.daterange.last90daysBtn'),
      onClick: picker => {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
        if (picker) {
          picker.$emit('pick', [start, end]);
          this.$emit('getActiveShortcut', 8, picker);
        } else {
          this.currentValue = [start, end];
        }
        this.changeShortcut(8, picker); // 选中样式
      },
    };
    if (this.btnOption.isYesterday) {
      this._pickerOptions.shortcuts.push(this.yesterdayBtn);
    }
    if (this.btnOption.isToday) {
      this._pickerOptions.shortcuts.push(this.todayBtn);
    }
    if (this.btnOption.isPreWeek) {
      this._pickerOptions.shortcuts.push(this.preWeekBtn);
    }
    if (this.btnOption.isThisWeek) {
      this._pickerOptions.shortcuts.push(this.thisWeekBtn);
    }
    if (this.btnOption.isPreMonth) {
      this._pickerOptions.shortcuts.push(this.preMonthBtn);
    }
    if (this.btnOption.isThisMonth) {
      this._pickerOptions.shortcuts.push(this.thisMonthBtn);
    }
    if (this.btnOption.isLast7days) {
      this._pickerOptions.shortcuts.push(this.last7daysBtn);
    }
    if (this.btnOption.isLast30days) {
      this._pickerOptions.shortcuts.push(this.last30daysBtn);
    }
    if (this.btnOption.isLast90days) {
      this._pickerOptions.shortcuts.push(this.last90daysBtn);
    }
  },
  methods: {
    // 聚焦
    focus(active) {
      switch (active) {
        case 0:
          this.yesterdayBtn.onClick();
          break;
        case 1:
          this.todayBtn.onClick();
          break;
        case 2:
          this.preWeekBtn.onClick();
          break;
        case 3:
          this.thisWeekBtn.onClick();
          break;
        case 4:
          this.preMonthBtn.onClick();
          break;
        case 5:
          this.thisMonthBtn.onClick();
          break;
        case 6:
          this.last7daysBtn.onClick();
          break;
        case 7:
          this.last30daysBtn.onClick();
          break;
        case 8:
          this.last90daysBtn.onClick();
          break;
        default:
          break;
      }
    },
    // 快捷项切换
    changeShortcut(index, picker) {
      let dom = null;
      if (picker) {
        // 点击某一个元素时手动添加第一次选中样式
        dom = picker.$el.getElementsByClassName('el-picker-panel__shortcut')[index];
      } else {
        this.$nextTick(() => {
          dom = document.getElementsByClassName('el-date-range-picker has-sidebar ' + this.poperClass)[0].getElementsByClassName('el-picker-panel__shortcut')[
            index
          ];
          this.setClassName(dom);
        });
      }
    },

    // 追加class
    setClassName(target) {
      target.classList.add('active');
      const siblings = Array.from(target.parentNode.children).filter(node => node !== target);
      siblings.forEach(dom => {
        dom.classList.remove('active');
      });
    },
  },
};
</script>
<style scoped></style>
