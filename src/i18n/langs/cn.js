/*
 * @Author: dxx
 * @Date: 2022-12-02 15:10:07
 * @LastEditors: dxx
 * @LastEditTime: 2023-02-02 11:10:49
 */
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';

const cn = {
  daterange: {
    startPlaceholder: '开始日期',
    endPlaceholder: '结束日期',
    yesterdayBtn: '昨日',
    todayBtn: '今日',
    preWeekBtn: '上周',
    thisWeekBtn: '本周',
    preMonthBtn: '上月',
    thisMonthBtn: '本月',
    last7daysBtn: '过去7天',
    last30daysBtn: '过去30天',
    last90daysBtn: '过去90天'
  },
  iconPicker:{
    titleBasic: '基础图标',
    titleCustom: '定制图标',
    iconPlaceholder: '请选择图标'
  },
  tableTransfer:{
    titleLeft: '待选项',
    titleRight: '已选项',
    queryLeft: '查询',
    queryRight: '筛选',
  },
  tooltip:{
  },
  ...zhLocale,
};

export default cn;
