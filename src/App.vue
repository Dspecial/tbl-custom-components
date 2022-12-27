<template>
  <div id="app">
    <h3>示例如下</h3>
    <!-- 时间范围选择： -->
    <div class="item">
      <p>1. 时间范围选择：</p>
      <tbl-daterange-picker
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
        <tbl-tooltip-over :content="content" refName="tooltipOver" effect="dark" placement="top-start" popper-class="test-tooltip"></tbl-tooltip-over>
      </div>
    </div>

    <!-- 图标选择器： -->
    <div class="item">
      <p>3. 图标选择器：</p>
      <div style="width:500px">
        <tbl-icon-picker v-model="iconValue" placeholder="请选择图标" type="wisdom"></tbl-icon-picker>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
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
      content: `他找来半张红纸和一支毛笔，让村里的一名小学老师为他写了一张告示。告示的大概内容是：因收入微薄无法承担太多应酬，除丧葬、嫁娶之外`,
      iconValue: '',
    };
  },
  components: {},
  methods: {
    onChange(val) {
      console.log(val, '获取到绑定的时间范围值');
      this.defaultValue = val;
    },
    // 清空
    clear() {
      this.defaultValue = [];
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
