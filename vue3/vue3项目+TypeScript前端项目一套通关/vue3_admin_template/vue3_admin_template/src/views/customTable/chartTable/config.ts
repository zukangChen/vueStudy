import { fontSizeWidth } from '@/utils/rem'
import { reactive } from 'vue'

// 核心指标
export const targetChartData = reactive({
  title: '月度员工数量',
  borderRadius: [0, 0, 0, 0],
  barWidth: '16px',
  grid: {
    top: fontSizeWidth(55),
    left: fontSizeWidth(80),
    right: fontSizeWidth(57),
  },
  names: [
    '1月',
    '2月',
    '1月',
    '2月',
    '1月',
    '2月',
    '1月',
    '2月',
    '1月',
    '2月',
    '1月',
    '2月',
  ],
  // limit: 5,
  color: [
    {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [
        {
          offset: 0,
          color: '#7B89FF', // 0% 处的颜色
        },
        {
          offset: 1,
          color: '#4261F6', // 100% 处的颜色
        },
      ],
      global: false, // 缺省为 false
    },
    {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [
        {
          offset: 0,
          color: '#7B89FF', // 0% 处的颜色
        },
        {
          offset: 1,
          color: '#4261F6', // 100% 处的颜色
        },
      ],
      global: false, // 缺省为 false
    },
    {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [
        {
          offset: 0,
          color: '#FFAF47', // 0% 处的颜色
        },
        {
          offset: 1,
          color: '#FB8C2D', // 100% 处的颜色
        },
      ],
      global: false, // 缺省为 false
    },
  ],
  data: [
    {
      name: '当月完成',
      type: 'bar',
      data: [10, 20, 30, 40, 50, 60, 10, 20, 30, 40, 50, 60],
      unit: '',
    },
    {
      name: '月同比',
      type: 'line',
      yAxisIndex: 1,
      data: [60, 10, 20, 30, 40, 50, 60, 10, 20, 30, 40, 50],
      unit: '%',
    },
    {
      name: '月环比',
      type: 'line',
      yAxisIndex: 1,
      data: [10, 20, 30, 40, 50, 60, 10, 20, 30, 40, 50, 60],
      unit: '%',
    },
  ],
  seriesOpts: {
    itemStyle: {
      borderRadius: [2, 2, 0, 0],
    },
    showSymbol: true,
    symbolSize: 8,
  },
  yAxis: [
    {
      type: 'value',
      name: `单位：亿元`,
      splitLine: {
        show: false,
      },
    },
    {
      type: 'value',
      position: 'right',
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: true,
        formatter: function (value: any) {
          return value + '%'
        },
      },
    },
  ],
})
