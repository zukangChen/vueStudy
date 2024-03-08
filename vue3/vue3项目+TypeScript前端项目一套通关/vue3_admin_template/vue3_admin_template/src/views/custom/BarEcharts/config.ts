import { fontSizeWidth } from '@/utils/rem'
import { reactive } from 'vue'

// 月度投资完成情况mock
export const chartData1 = reactive([
  {
    timekey: '01',
    unit: 't',
    complete: 20,
    production: 30, // 当月计划/当年计划
    yoy: 10, // 当月同比/当年同比
    mom: 20, // 当年环比/当年环比
    product_name: '金0', // 产品名称
    title: '金0',
  },
  {
    timekey: '01',
    unit: 't',
    complete: 20,
    production: 30, // 当月计划/当年计划
    yoy: 10, // 当月同比/当年同比
    mom: 20, // 当年环比/当年环比
    product_name: '金1', // 产品名称
    title: '金1',
  },
  {
    timekey: '02',
    unit: 't',
    complete: 20,
    production: 30, // 当月计划/当年计划
    yoy: 10, // 当月同比/当年同比
    mom: 20, // 当年环比/当年环比
    product_name: '金2', // 产品名称
    title: '金2',
  },
  {
    timekey: '03',
    unit: 't',
    complete: 20,
    production: 30, // 当月计划/当年计划
    yoy: 10, // 当月同比/当年同比
    mom: 20, // 当年环比/当年环比
    product_name: '金3', // 产品名称
    title: '金3',
  },
  {
    timekey: '04',
    unit: 't',
    complete: 20,
    production: 30, // 当月计划/当年计划
    yoy: 10, // 当月同比/当年同比
    mom: 20, // 当年环比/当年环比
    product_name: '金4', // 产品名称
    title: '金4',
  },
])

// 月度投资完成情况mock
export const chartData2 = reactive({
  type: 9,
  legend: {
    itemGap: fontSizeWidth(12),
    right: fontSizeWidth(0),
    left: 'auto',
    orient: 'vertical',
    padding: [20, 0],
    top: 'center',
    width: fontSizeWidth(100),
    textStyle: {
      align: 'left',
      rich: {
        a: {
          fontWeight: 600,
        },
        b: {
          fontSize: fontSizeWidth(16),
          width: fontSizeWidth(60),
          padding: [0, 0, 0, fontSizeWidth(10)],
        },
        c: {
          fontSize: fontSizeWidth(16),
          width: fontSizeWidth(60),
          padding: [0, 0, 0, fontSizeWidth(10)],
        },
      },
    },
  },
  BoxCenter: ['25%', '55%'],
  radius: ['26%', '54%'],
  center: ['26%', '57%'],
  unit: '亿元',
  tipName: '金额',
  data: [
    {
      name: '冶新',
      value: 1,
      value1: 5.23,
      percent: '8.52%',
    },
    {
      name: '国际',
      value: 2,
      value1: 5.64,
      percent: '9.19%',
    },
    {
      name: '矿山',
      value: 3,
      value1: 50.52,
      percent: '82.29%',
    },
  ],
  // data: [],
})
