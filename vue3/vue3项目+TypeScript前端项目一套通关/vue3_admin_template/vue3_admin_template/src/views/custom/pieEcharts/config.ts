import { fontSizeWidth } from '@/utils/rem'
import { reactive } from 'vue'

// 月度投资完成情况mock
export const chartData1 = reactive({
  type: 6,
  textStyleSize: fontSizeWidth(15),
  subtextStyleSize: fontSizeWidth(17),
  titleLeft: '26%',
  titleTop: '37%',
  legend: {
    itemGap: fontSizeWidth(12),
    left: 'auto',
    right: fontSizeWidth(20),
    orient: 'vertical',
    padding: [20, 0],
    top: 'center',
    textStyle: {
      align: 'left',
      rich: {
        a: {
          fontWeight: 600,
        },
        b: {
          fontSize: fontSizeWidth(16),
          width: fontSizeWidth(60),
          padding: [0, 0, 0, fontSizeWidth(20)],
        },
      },
    },
  },
  timer: 2000,
  center: ['28%', '50%'],
  names: [1, 2, 3, 4, 5],
  data: [
    {
      name: '矿山',
      value: 4,
    },
    {
      name: '冶新',
      value: 4,
    },
    {
      name: '国际',
      value: 5,
    },
  ],
  unit: '个',
})

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
