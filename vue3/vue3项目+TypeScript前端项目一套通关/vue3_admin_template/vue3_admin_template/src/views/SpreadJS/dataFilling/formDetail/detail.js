const baseHeader = [
  {
    prop: 'date',
    label: '日期',
  },
  {
    prop: 'line',
    label: '线路',
  },
  {
    prop: 'place',
    label: '所别',
  },
  {
    prop: 'line2',
    label: '线路',
  },
  {
    prop: 'month',
    label: '时段',
  },
]
const electric = [ //电量填报
  {
    prop: 'totalElectricity',
    label: '总电量',
    child: [
      {
        prop: 'work',
        label: '总有功',
      },
      {
        prop: 'peak',
        label: '峰电量',
      },
      {
        prop: 'flat',
        label: '平电量',
      },
      {
        prop: 'valley',
        label: '谷电量',
      },
      {
        prop: 'notHave',
        label: '总无功',
      },
      {
        prop: 'power',
        label: '有功电量',
      },
      {
        prop: 'power2',
        label: '有功电量',
      },
      {
        prop: 'notPower',
        label: '总无功电量',
      },
    ],
  },
]
const produce = [ //生产运营用电
  {
    prop: 'porduct',
    label: '生产运营用电',
    child: [
      {
        size: 300,
        prop: 'curMonth',
        label: '本月生产运营用电量',
      },
      {
        size: 300,
        prop: 'peak',
        label: '峰电量',
      },
      {
        prop: 'peakPrice',
        label: '单价（度/元）',
      },
      {
        prop: 'flat',
        label: '平电量',
      },
      {
        prop: 'flatPrice',
        label: '单价（度/元）',
      },
      {
        prop: 'subtotal',
        label: '小计（元）',
      },
      {
        prop: 'sumTotal',
        label: '合计（元）',
      },
      {
        prop: 'sumTotal2',
        label: '合计（元）',
      },
    ],
  },
]
const nonproductive = [ //非生产运营用电
  {
    prop: 'notPorduct',
    label: '非生产运营用电',
    child: [
      {
        prop: 'notPorduct',
        label: '非生产运营用电量',
      },
      {
        prop: 'peak',
        label: '峰电量',
      },
      {
        prop: 'peakPrice',
        label: '单价（度/元）',
      },
      {
        prop: 'flat',
        label: '平电量',
      },
      {
        prop: 'flatPrice',
        label: '单价（度/元）',
      },
      {
        prop: 'valley',
        label: '谷电量',
      },
      {
        prop: 'valleyPrice',
        label: '单价（度/元）',
      },
      {
        prop: 'sumTotal',
        label: '合计（元）',
      },
    ],
  },
]
const spike = [ //尖峰用电
  {
    prop: 'spike',
    label: '尖峰用电',
    child: [
      {
        prop: 'spike',
        label: '尖峰电量',
      },
      {
        prop: 'spikePrice',
        label: '尖峰单价（度/元）',
      },
      {
        prop: 'spikeSum',
        label: '尖峰电费（元）',
      },
    ],
  },
]
const power = [ //力调电费
  {
    prop: 'poweRegulation',
    label: '力调电费',
    child: [
      {
        prop: 'monthFactor',
        label: '月累计功率因素',
      },
      {
        prop: 'coefficient',
        label: '力调系数',
      },
      {
        prop: 'monthSum',
        label: '力调电费（元）',
      },
    ],
  },
]
const other = [ //其他电费
  {
    prop: 'other',
    label: '其他电费',
    child: [
      {
        prop: 'market',
        label: '市场平衡费用及运营费用（元）',
      },
      {
        prop: 'netWork',
        label: '上网环节线损费用（元）',
      },
    ],
  },
]
const collection = [ //收缴情况
  {
    prop: 'totalElectricityBill',
    label: '总电费',
    child: [
      {
        prop: 'operation',
        label: '生产运营用电费（元）',
      },
      {
        prop: 'notOperation',
        label: '非生产运营用电费（元）',
      },
      {
        prop: 'netReceipts',
        label: '实收（元）',
      },
      {
        prop: 'receivable',
        label: '应收（元）',
      },
      {
        prop: 'last',
        label: '上期电费（元）',
      },
      {
        prop: 'sumTotal',
        label: '总计（元）',
      },
    ],
  },
]
export const headMap = {
  '完整报表': [
    ...baseHeader, ...electric, ...produce, ...nonproductive, ...spike, ...power, ...other, ...collection
  ],
  '电量填报': [
    ...baseHeader, ...electric
  ],
  '生产运营用电': [
    ...baseHeader, ...produce
  ],
  '非生产运营用电': [
    ...baseHeader, ...nonproductive
  ],
  '尖峰用电': [
    ...baseHeader, ...spike
  ],
  '力调电费': [
    ...baseHeader, ...power
  ],
  '其他电费': [
    ...baseHeader, ...other
  ],
  '收缴情况': [
    ...baseHeader, ...collection
  ]
}

const baseData = [
  {
    prop: 'date',
    label: '日期',
  },
  {
    prop: 'line',
    label: '线路',
  },
  {
    prop: 'place',
    label: '所别',
  },
  {
    prop: 'line2',
    label: '线路',
  },
  {
    prop: 'month',
    label: '时段',
  }
]

export const tableDataMap = {
  '完整报表': [
    {
      date: '2024.12.01-2024.12.15',
      line: '1号线',
      place: '创新大道主所',
      line2: '游乐变448',
      month: '上月',
      work: '808.08',
      peak: '319.57',
      flat: '269.93',
      valley: '207.6',
      notHave: '154.3',
      power: '691680',
      power2: '1318240',
      notPower: '161920'
    },
    // ...baseHeader, ...electric, ...produce, ...nonproductive, ...spike, ...power, ...other, ...collection
  ],
  '电量填报': [
    {
      date: '2024.12.01-2024.12.15',
      line: '1号线',
      place: '创新大道主所',
      line2: '游乐变448',
      month: '上月',
      work: '808.08',
      peak: '319.57',
      flat: '269.93',
      valley: '207.6',
      notHave: '154.3',
      power: '691680',
      power2: '1318240',
      notPower: '161920'
    },
    {
      date: '2024.12.01-2024.12.15',
      line: '1号线',
      place: '创新大道主所',
      line2: '游乐变401',
      month: '本月',
      work: '812.01',
      peak: '320.82',
      flat: '271',
      valley: '208.34',
      notHave: '154.8',
      power: '691680',
      power2: '1318240',
      notPower: '161920'
    },
    {
      date: '2024.12.01-2024.12.15',
      line: '1号线',
      place: '大东门开闭所',
      line2: '计量点1',
      month: '上月',
      work: '808.08',
      peak: '319.57',
      flat: '269.93',
      valley: '207.6',
      notHave: '154.3',
      power: '691680',
      power2: '1318240',
      notPower: '161920'
    },
    {
      date: '2024.12.01-2024.12.15',
      line: '1号线',
      place: '大东门开闭所',
      line2: '计量点2',
      month: '本月',
      work: '808.08',
      peak: '319.57',
      flat: '269.93',
      valley: '207.6',
      notHave: '154.3',
      power: '691680',
      power2: '1318240',
      notPower: '161920'
    },
  ],
  '生产运营用电': [

  ],
  '非生产运营用电': [
  ],
  '尖峰用电': [
  ],
  '力调电费': [
  ],
  '其他电费': [
  ],
  '收缴情况': [
  ]
}