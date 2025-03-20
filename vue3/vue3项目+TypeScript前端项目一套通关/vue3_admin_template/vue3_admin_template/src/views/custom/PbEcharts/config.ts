import { fontSizeWidth } from '@/utils/rem'
import { reactive } from 'vue'
// 利润因素分析
export const profitChartData = reactive({
  type: 12,
  title: '月度员工数量',
  borderRadius: [0, 0, 0, 0],
  barWidth: '16px',
  legend: {
    data: ['增加', '减少', '汇总'],
  },
  grid: {
    top: fontSizeWidth(55),
    // left: fontSizeWidth(80),
    right: fontSizeWidth(57),
  },
  // names: [],
  names: [
    '计划累计',
    '价格变动',
    '销量变动',
    '单位金属销售成本变动',
    '税金',
    '期间费用变动',
    '对利润影响合计',
  ],
  data: [
    {
      name: '辅助',
      type: 'bar',
      stack: '总量',
      label: {
        normal: {
          show: false,
          position: 'top',
        },
      },
      itemStyle: {
        normal: {
          barBorderColor: 'rgba(0,0,0,0)',
          color: 'rgba(0,0,0,0)',
        },
        emphasis: {
          barBorderColor: 'rgba(0,0,0,0)',
          color: 'rgba(0,0,0,0)',
        },
      },
      barWidth: '80%',
      data: [0, 0, 6736, 0, -4294, -4294, 0],
    },
    {
      name: '增加',
      type: 'bar',
      stack: '总量',
      itemStyle: {
        normal: {
          color: '#45d190',
        },
      },
      label: {
        normal: {
          show: true,
          position: 'top',
        },
      },
      data: ['-', 14784, '-', '-', '-', '-', '-'],
      unit: '万美元',
    },
    {
      name: '增加辅助',
      type: 'bar',
      stack: '总量',
      itemStyle: {
        normal: {
          color: '#45d190',
        },
      },
      label: {
        normal: {
          show: false,
          position: 'top',
        },
      },
      data: ['0', -3180, 0, 0, 0, 0, '-'],
      unit: '万美元',
    },
    {
      name: '减少',
      type: 'bar',
      stack: '总量',
      itemStyle: {
        normal: {
          color: '#ffb048',
        },
      },
      label: {
        normal: {
          show: true,
          position: 'bottom',
        },
      },
      data: ['-', '-', 8048, -4294, 0, -1341, '-'],
      unit: '万美元',
    },
    {
      name: '减少辅助',
      type: 'bar',
      stack: '总量',
      itemStyle: {
        normal: {
          color: '#ffb048',
        },
      },
      label: {
        normal: {
          show: false,
          position: 'top',
        },
      },
      data: ['0', 0, 0, 6736, 0, 0, '-'],
      unit: '万美元',
    },
    {
      name: '汇总',
      type: 'bar',
      stack: '总量',
      itemStyle: {
        normal: {
          color: '#7c88ff',
        },
      },
      label: {
        normal: {
          show: true,
          position: 'top',
        },
      },
      data: [-3180, '-', '-', '-', '-', '-', -6360],
      unit: '万美元',
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
      name: `单位：万美元`,
      splitLine: {
        show: false,
      },
    },
  ],
})
