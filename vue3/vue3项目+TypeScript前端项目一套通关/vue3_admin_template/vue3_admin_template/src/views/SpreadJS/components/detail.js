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
    label: '计量点',
  },
  {
    prop: 'month',
    label: '时段',
  },
]
const electric = [
  //电量填报
  {
    prop: 'totalElectricity',
    label: '总电量',
    child: [
      {
        prop: 'totalElectricity_work',
        label: '总有功',
      },
      {
        prop: 'totalElectricity_peak',
        label: '峰电量',
      },
      {
        prop: 'totalElectricity_flat',
        label: '平电量',
      },
      {
        prop: 'totalElectricity_valley',
        label: '谷电量',
      },
      {
        prop: 'totalElectricity_notHave',
        label: '总无功',
      },
      {
        prop: 'totalElectricity_power',
        label: '有功电量',
      },
      {
        prop: 'totalElectricity_power2',
        label: '有功电量',
      },
      {
        prop: 'totalElectricity_notPower',
        label: '总无功电量',
      },
    ],
  },
]
const produce = [
  //生产运营用电
  {
    prop: 'porduct',
    label: '生产运营用电',
    child: [
      {
        size: 300,
        prop: 'porduct_curMonth',
        label: '本旬生产运营用电量',
      },
      {
        size: 300,
        prop: 'porduct_peak',
        label: '峰电量',
      },
      {
        prop: 'porduct_peakPrice',
        label: '单价(度/元)',
      },
      {
        prop: 'porduct_flat',
        label: '平电量',
      },
      {
        prop: 'porduct_flatPrice',
        label: '单价(度/元)',
      },
      {
        prop: 'porduct_valley',
        label: '谷电量',
      },
      {
        prop: 'porduct_valleyPrice',
        label: '单价(度/元)',
      },

      {
        prop: 'porduct_subtotal',
        label: '小计(元)',
      },
      {
        prop: 'porduct_sumTotal',
        label: '合计(元)',
      },
      {
        prop: 'porduct_sumTotal2',
        label: '合计(元)',
      },
    ],
  },
]
const nonproductive = [
  //非生产运营用电
  {
    prop: 'notPorduct',
    label: '非生产运营用电',
    child: [
      {
        prop: 'notPorduct_notPorduct',
        label: '非生产运营用电量',
      },
      {
        prop: 'notPorduct_peak',
        label: '峰电量',
      },
      {
        prop: 'notPorduct_peakPrice',
        label: '单价(度/元)',
      },
      {
        prop: 'notPorduct_flat',
        label: '平电量',
      },
      {
        prop: 'notPorduct_flatPrice',
        label: '单价(度/元)',
      },
      {
        prop: 'notPorduct_valley',
        label: '谷电量',
      },
      {
        prop: 'notPorduct_valleyPrice',
        label: '单价(度/元)',
      },
      {
        prop: 'notPorduct_sumTotal',
        label: '合计(元)',
      },
    ],
  },
]
const spike = [
  //尖峰用电
  {
    prop: 'spike',
    label: '尖峰用电',
    child: [
      {
        prop: 'spike_spike',
        label: '尖峰电量',
      },
      {
        prop: 'spike_spikePrice',
        label: '尖峰单价(度/元)',
      },
      {
        prop: 'spike_spikeSum',
        label: '尖峰电费(元)',
      },
    ],
  },
]
const power = [
  //力调电费
  {
    prop: 'poweRegulation',
    label: '力调电费',
    child: [
      {
        prop: 'poweRegulation_monthFactor',
        label: '月累计功率因素',
      },
      {
        prop: 'poweRegulation_coefficient',
        label: '力调系数',
      },
      {
        prop: 'poweRegulation_monthSum',
        label: '力调电费(元)',
      },
    ],
  },
]
const other = [
  //其他电费
  {
    prop: 'other',
    label: '其他电费',
    child: [
      {
        prop: 'other_market',
        label: '市场平衡费用及运营费用(元)',
      },
      {
        prop: 'other_netWork',
        label: '上网环节线损费用(元)',
      },
    ],
  },
]
const basic = [
  //基本电费
  {
    prop: 'basic',
    label: '基本电费',
    child: [
      {
        prop: 'basic_receivable',
        label: '应收(元)',
      },
    ],
  },
]
const collection = [
  //收缴情况
  {
    prop: 'totalElectricityBill',
    label: '总电费',
    child: [
      {
        prop: 'totalElectricityBill_operation',
        label: '生产运营用电费(元)',
      },
      {
        prop: 'totalElectricityBill_notOperation',
        label: '非生产运营用电费(元)',
      },
      {
        prop: 'totalElectricityBill_netReceipts',
        label: '实收(元)',
      },
      {
        prop: 'totalElectricityBill_receivable',
        label: '应收(元)',
      },
      {
        prop: 'totalElectricityBill_last',
        label: '上期电费(元)',
      },
      {
        prop: 'totalElectricityBill_sumTotal',
        label: '总计(元)',
      },
    ],
  },
]
export const headMap = {
  完整报表: [
    ...baseHeader,
    ...electric,
    ...produce,
    ...nonproductive,
    ...spike,
    ...power,
    ...other,
    ...collection,
  ],
  电量填报: [...baseHeader, ...electric],
  生产运营用电: [...baseHeader, ...produce],
  非生产运营用电: [...baseHeader, ...nonproductive],
  尖峰用电: [...baseHeader, ...spike],
  力调电费: [...baseHeader, ...power],
  其他电费: [...baseHeader, ...other],
  基本电费: [...baseHeader, ...basic],
  收缴情况: [...baseHeader, ...collection],
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
  },
]

export const tableDataMap = {
  完整报表: [
    {
      date: '2024.12.01-2024.12.15',
      line: '1号线',
      place: '创新大道主所',
      line2: '游乐变448',
      month: '上旬',
      work: '808.08',
      peak: '319.57',
      flat: '269.93',
      valley: '207.6',
      notHave: '154.3',
      power: '691680',
      totalElectricity_power2: '',
      totalElectricity_notPower: '161920',
    },
    {
      date: '2024.12.01-2024.12.15',
      line: '1号线',
      place: '创新大道主所',
      line2: '游乐变448',
      month: '上旬',
      work: '808.08',
      peak: '319.57',
      flat: '269.93',
      valley: '207.6',
      notHave: '154.3',
      power: '691680',
      totalElectricity_power2: '',
      totalElectricity_notPower: '161920',
    },
    {
      date: '2024.12.01-2024.12.15',
      line: '1号线',
      place: '创新大道主所',
      line2: '游乐变448',
      month: '上旬',
      work: '808.08',
      peak: '319.57',
      flat: '269.93',
      valley: '207.6',
      notHave: '154.3',
      power: '691680',
      totalElectricity_power2: '',
      totalElectricity_notPower: '161920',
    },
    {
      date: '2024.12.01-2024.12.15',
      line: '1号线',
      place: '创新大道主所',
      line2: '游乐变448',
      month: '上旬',
      work: '808.08',
      peak: '319.57',
      flat: '269.93',
      valley: '207.6',
      notHave: '154.3',
      power: '691680',
      totalElectricity_power2: '',
      totalElectricity_notPower: '161920',
    },
  ],
  电量填报: [
    {
      date: '2024.12.01-2024.12.15',
      line: '1号线',
      place: '创新大道主所',
      line2: '游乐变448',
      month: '上旬',
      totalElectricity_work: '8',
      totalElectricity_peak: '319.57',
      totalElectricity_flat: '269.93',
      totalElectricity_valley: '207.6',
      totalElectricity_notHave: '154.3',
      totalElectricity_power: '1',
      totalElectricity_power2: '3',
      totalElectricity_notPower: '161920',
    },
    {
      date: '2024.12.01-2024.12.15',
      line: '1号线',
      place: '创新大道主所',
      line2: '游乐变448',
      month: '本旬',
      totalElectricity_work: '10',
      totalElectricity_peak: '2',
      totalElectricity_flat: '3',
      totalElectricity_valley: '4',
      totalElectricity_notHave: '5',
      totalElectricity_power: '6',
      totalElectricity_power2: '',
      totalElectricity_notPower: '8',
    },
    {
      date: '2024.12.01-2024.12.15',
      line: '1号线',
      place: '创新大道主所',
      line2: '游乐变401',
      month: '上旬',
      totalElectricity_work: '1',
      totalElectricity_peak: '2',
      totalElectricity_flat: '3',
      totalElectricity_valley: '4',
      totalElectricity_notHave: '5',
      totalElectricity_power: '6',
      totalElectricity_power2: '',
      totalElectricity_notPower: '8',
    },
    {
      date: '2024.12.01-2024.12.15',
      line: '1号线',
      place: '创新大道主所',
      line2: '游乐变401',
      month: '本旬',
      totalElectricity_work: '8',
      totalElectricity_peak: '320.82',
      totalElectricity_flat: '271',
      totalElectricity_valley: '208.34',
      totalElectricity_notHave: '154.8',
      totalElectricity_power: '8',
      totalElectricity_power2: '',
      totalElectricity_notPower: '161920',
    },
    {
      date: '2024.12.01-2024.12.15',
      line: '1号线',
      place: '大东门开闭所',
      line2: '计量点1',
      month: '上旬',
      totalElectricity_work: '808.08',
      totalElectricity_peak: '319.57',
      totalElectricity_flat: '269.93',
      totalElectricity_valley: '207.6',
      totalElectricity_notHave: '154.3',
      totalElectricity_power: '691680',
      totalElectricity_power2: '1',
      totalElectricity_notPower: '161920',
    },
    {
      date: '2024.12.01-2024.12.15',
      line: '1号线',
      place: '大东门开闭所',
      line2: '计量点1',
      month: '本旬',
      totalElectricity_work: '808.08',
      totalElectricity_peak: '319.57',
      totalElectricity_flat: '269.93',
      totalElectricity_valley: '207.6',
      totalElectricity_notHave: '154.3',
      totalElectricity_power: '691680',
      totalElectricity_power2: '2',
      totalElectricity_notPower: '161920',
    },
    {
      date: '2024.12.01-2024.12.15',
      line: '1号线',
      place: '大东门开闭所',
      line2: '计量点2',
      month: '上旬',
      totalElectricity_work: '808.08',
      totalElectricity_peak: '319.57',
      totalElectricity_flat: '269.93',
      totalElectricity_valley: '207.6',
      totalElectricity_notHave: '154.3',
      totalElectricity_power: '691680',
      totalElectricity_power2: '1',
      totalElectricity_notPower: '161920',
    },
    {
      date: '2024.12.01-2024.12.15',
      line: '1号线',
      place: '大东门开闭所',
      line2: '计量点2',
      month: '本旬',
      totalElectricity_work: '808.08',
      totalElectricity_peak: '319.57',
      totalElectricity_flat: '269.93',
      totalElectricity_valley: '207.6',
      totalElectricity_notHave: '154.3',
      totalElectricity_power: '691680',
      totalElectricity_power2: '2',
      totalElectricity_notPower: '161920',
    },
  ],
  生产运营用电: [
    {
      date: '2024.12.01-2024.12.15',
      line: '1号线',
      place: '创新大道主所',
      line2: '游乐变448',
      month: '上旬',
      porduct_curMonth: '8',
      porduct_peak: '319.57',
      porduct_peakPrice: '269.93',
      porduct_flat: '207.6',
      porduct_flatPrice: '154.3',
      porduct_subtotal: '1',
      porduct_sumTotal: '1',
      porduct_sumTotal2: '161920',
      porduct_account: '2', // 生产运营占比
      totalElectricity_power: '1',
      product_caculatePrice: '5', // 测算电价
    },
    {
      date: '2024.12.01-2024.12.15',
      line: '1号线',
      place: '创新大道主所',
      line2: '游乐变448',
      month: '本旬',
      porduct_curMonth: '8',
      porduct_peak: '319.57',
      porduct_peakPrice: '269.93',
      porduct_flat: '207.6',
      porduct_flatPrice: '154.3',
      porduct_subtotal: '1',
      porduct_sumTotal: '3',
      porduct_sumTotal2: '161920',
    },
    {
      date: '2024.12.01-2024.12.15',
      line: '1号线',
      place: '创新大道主所',
      line2: '游乐变401',
      month: '上旬',
      porduct_curMonth: '8',
      porduct_peak: '319.57',
      porduct_peakPrice: '269.93',
      porduct_flat: '207.6',
      porduct_flatPrice: '154.3',
      porduct_subtotal: '1',
      porduct_sumTotal: '3',
      porduct_sumTotal2: '161920',
    },
    {
      date: '2024.12.01-2024.12.15',
      line: '1号线',
      place: '创新大道主所',
      line2: '游乐变401',
      month: '本旬',
      porduct_curMonth: '8',
      porduct_peak: '319.57',
      porduct_peakPrice: '269.93',
      porduct_flat: '207.6',
      porduct_flatPrice: '154.3',
      porduct_subtotal: '1',
      porduct_sumTotal: '3',
      porduct_sumTotal2: '161920',
    },
    {
      date: '2024.12.01-2024.12.15',
      line: '1号线',
      place: '大东门开闭所',
      line2: '计量点1',
      month: '上旬',
      porduct_curMonth: '8',
      porduct_peak: '319.57',
      porduct_peakPrice: '269.93',
      porduct_flat: '207.6',
      porduct_flatPrice: '154.3',
      porduct_subtotal: '1',
      porduct_sumTotal: '3',
      porduct_sumTotal2: '161920',
      porduct_account: '1',
      product_caculatePrice: '2', // 测算电价
    },
    {
      date: '2024.12.01-2024.12.15',
      line: '1号线',
      place: '大东门开闭所',
      line2: '计量点1',
      month: '本旬',
      porduct_curMonth: '8',
      porduct_peak: '319.57',
      porduct_peakPrice: '269.93',
      porduct_flat: '207.6',
      porduct_flatPrice: '154.3',
      porduct_subtotal: '1',
      porduct_sumTotal: '3',
      porduct_sumTotal2: '161920',
    },
    {
      date: '2024.12.01-2024.12.15',
      line: '1号线',
      place: '大东门开闭所',
      line2: '计量点2',
      month: '上旬',
      porduct_curMonth: '8',
      porduct_peak: '319.57',
      porduct_peakPrice: '269.93',
      porduct_flat: '207.6',
      porduct_flatPrice: '154.3',
      porduct_subtotal: '1',
      porduct_sumTotal: '3',
      porduct_sumTotal2: '161920',
    },
    {
      date: '2024.12.01-2024.12.15',
      line: '1号线',
      place: '大东门开闭所',
      line2: '计量点2',
      month: '本旬',
      porduct_curMonth: '8',
      porduct_peak: '319.57',
      porduct_peakPrice: '269.93',
      porduct_flat: '207.6',
      porduct_flatPrice: '154.3',
      porduct_subtotal: '1',
      porduct_sumTotal: '3',
      porduct_sumTotal2: '161920',
    },
  ],
  非生产运营用电: [
    {
      date: '2024.12.01-2024.12.15',
      line: '1号线',
      place: '创新大道主所',
      line2: '游乐变448',
      month: '上旬',
      notPorduct_notPorduct: '8',
      notPorduct_peak: '319.57',
      notPorduct_peakPrice: '269.93',
      notPorduct_flat: '207.6',
      notPorduct_flatPrice: '154.3',
      notPorduct_valley: '1',
      notPorduct_valleyPrice: '3',
      notPorduct_sumTotal: '161920',
      totalElectricity_notPower: '161920', //总无工电量
      notPorduct_account: '0.5', // 非生产运营占比
      notPorduct_caculatePrice: '5', // 非生产运营测算电价
    },
    {
      date: '2024.12.01-2024.12.15',
      line: '1号线',
      place: '创新大道主所',
      line2: '游乐变448',
      month: '本旬',
      notPorduct_notPorduct: '10',
      notPorduct_peak: '2',
      notPorduct_peakPrice: '3',
      notPorduct_flat: '4',
      notPorduct_flatPrice: '5',
      notPorduct_valley: '6',
      notPorduct_valleyPrice: '',
      notPorduct_sumTotal: '8',
    },
    {
      date: '2024.12.01-2024.12.15',
      line: '1号线',
      place: '创新大道主所',
      line2: '游乐变401',
      month: '上旬',
      notPorduct_notPorduct: '1',
      notPorduct_peak: '2',
      notPorduct_peakPrice: '3',
      notPorduct_flat: '4',
      notPorduct_flatPrice: '5',
      notPorduct_valley: '6',
      notPorduct_valleyPrice: '',
      notPorduct_sumTotal: '8',
    },
    {
      date: '2024.12.01-2024.12.15',
      line: '1号线',
      place: '创新大道主所',
      line2: '游乐变401',
      month: '本旬',
      notPorduct_notPorduct: '8',
      notPorduct_peak: '320.82',
      notPorduct_peakPrice: '271',
      notPorduct_flat: '208.34',
      notPorduct_flatPrice: '154.8',
      notPorduct_valley: '8',
      notPorduct_valleyPrice: '',
      notPorduct_sumTotal: '161920',
    },
  ],
  尖峰用电: [
    {
      date: '2024.12.01-2024.12.15',
      line: '1号线',
      place: '创新大道主所',
      line2: '游乐变448',
      month: '上旬',
      spike_spike: '8',
      spike_spikePrice: '319.57',
      spike_spikeSum: '269.93',
    },
    {
      date: '2024.12.01-2024.12.15',
      line: '1号线',
      place: '创新大道主所',
      line2: '游乐变448',
      month: '本旬',
      spike_spike: '10',
      spike_spikePrice: '2',
      spike_spikeSum: '3',
    },
    {
      date: '2024.12.01-2024.12.15',
      line: '1号线',
      place: '创新大道主所',
      line2: '游乐变401',
      month: '上旬',
      spike_spike: '1',
      spike_spikePrice: '2',
      spike_spikeSum: '3',
    },
    {
      date: '2024.12.01-2024.12.15',
      line: '1号线',
      place: '创新大道主所',
      line2: '游乐变401',
      month: '本旬',
      spike_spike: '8',
      spike_spikePrice: '320.82',
      spike_spikeSum: '271',
    },
  ],
  力调电费: [
    {
      date: '2024.12.01-2024.12.15',
      line: '1号线',
      place: '创新大道主所',
      line2: '游乐变448',
      month: '上旬',
      poweRegulation_monthFactor: '8',
      poweRegulation_coefficient: '319.57',
      poweRegulation_monthSum: '269.93',
    },
    {
      date: '2024.12.01-2024.12.15',
      line: '1号线',
      place: '创新大道主所',
      line2: '游乐变448',
      month: '本旬',
      poweRegulation_monthFactor: '10',
      poweRegulation_coefficient: '2',
      poweRegulation_monthSum: '3',
    },
    {
      date: '2024.12.01-2024.12.15',
      line: '1号线',
      place: '创新大道主所',
      line2: '游乐变401',
      month: '上旬',
      poweRegulation_monthFactor: '1',
      poweRegulation_coefficient: '2',
      poweRegulation_monthSum: '3',
    },
    {
      date: '2024.12.01-2024.12.15',
      line: '1号线',
      place: '创新大道主所',
      line2: '游乐变401',
      month: '本旬',
      poweRegulation_monthFactor: '8',
      poweRegulation_coefficient: '320.82',
      poweRegulation_monthSum: '271',
    },
  ],
  其他电费: [
    {
      date: '2024.12.01-2024.12.15',
      line: '1号线',
      place: '创新大道主所',
      line2: '游乐变448',
      month: '上旬',
      other_market: '8',
      other_netWork: '319.57',
    },
    {
      date: '2024.12.01-2024.12.15',
      line: '1号线',
      place: '创新大道主所',
      line2: '游乐变448',
      month: '本旬',
      other_market: '10',
      other_netWork: '2',
    },
    {
      date: '2024.12.01-2024.12.15',
      line: '1号线',
      place: '创新大道主所',
      line2: '游乐变401',
      month: '上旬',
      other_market: '1',
      other_netWork: '2',
    },
    {
      date: '2024.12.01-2024.12.15',
      line: '1号线',
      place: '创新大道主所',
      line2: '游乐变401',
      month: '本旬',
      other_market: '8',
      other_netWork: '320.82',
    },
  ],
  基本电费: [
    {
      date: '2024.12.01-2024.12.15',
      line: '1号线',
      place: '创新大道主所',
      line2: '游乐变448',
      month: '上旬',
      basic_receivable: '8',
    },
    {
      date: '2024.12.01-2024.12.15',
      line: '1号线',
      place: '创新大道主所',
      line2: '游乐变448',
      month: '本旬',
      basic_receivable: '10',
    },
    {
      date: '2024.12.01-2024.12.15',
      line: '1号线',
      place: '创新大道主所',
      line2: '游乐变401',
      month: '上旬',
      basic_receivable: '1',
    },
    {
      date: '2024.12.01-2024.12.15',
      line: '1号线',
      place: '创新大道主所',
      line2: '游乐变401',
      month: '本旬',
      basic_receivable: '8',
    },
  ],
  收缴情况: [
    {
      date: '2024.12.01-2024.12.15',
      line: '1号线',
      place: '创新大道主所',
      line2: '游乐变448',
      month: '上旬',
      totalElectricityBill_operation: '8',
      totalElectricityBill_notOperation: 1,
      totalElectricityBill_netReceipts: '8',
      totalElectricityBill_receivable: 1,
      totalElectricityBill_last: '8',
      totalElectricityBill_sumTotal: 1,
      porduct_sumTotal2: 2, // 生产运营用电合计2
      poweRegulation_monthSum: 3, // 力调电费(元)
      other_market: 2, // 市场平衡费用及运营费用(元)
      other_netWork: 6, // 上网环节线损费用(元)
      porduct_sumTotal: 5, // 生产运营用电合计1
      spike_spikeSum: 6, // 尖峰电费
      basic_receivable: 8, // 基本电费应收
    },
    {
      date: '2024.12.01-2024.12.15',
      line: '1号线',
      place: '创新大道主所',
      line2: '游乐变448',
      month: '本旬',
      totalElectricityBill_operation: '10',
      totalElectricityBill_notOperation: 1,
      totalElectricityBill_netReceipts: '8',
      totalElectricityBill_receivable: 1,
      totalElectricityBill_last: '8',
      totalElectricityBill_sumTotal: 1,
    },
    {
      date: '2024.12.01-2024.12.15',
      line: '1号线',
      place: '创新大道主所',
      line2: '游乐变401',
      month: '上旬',
      totalElectricityBill_operation: '1',
      totalElectricityBill_notOperation: 1,
      totalElectricityBill_netReceipts: '8',
      totalElectricityBill_receivable: 1,
      totalElectricityBill_last: '8',
      totalElectricityBill_sumTotal: 1,
    },
    {
      date: '2024.12.01-2024.12.15',
      line: '1号线',
      place: '创新大道主所',
      line2: '游乐变401',
      month: '本旬',
      totalElectricityBill_operation: '8',
      totalElectricityBill_notOperation: 1,
      totalElectricityBill_netReceipts: '8',
      totalElectricityBill_receivable: 1,
      totalElectricityBill_last: '8',
      totalElectricityBill_sumTotal: 1,
    },
  ],
}

function getColumnMap(tabName) {
  let heads = headMap[tabName]
  let obj = {}
  heads.forEach((item, index) => {
    if (!item.child) {
      obj[item.prop] = index
    } else {
      item.child.forEach((sub, subIndex) => {
        obj[sub.prop] = index + subIndex
      })
    }
  })
  return obj
}
export const columnMap = {
  完整报表: getColumnMap('完整报表'),
  电量填报: getColumnMap('电量填报'),
  生产运营用电: getColumnMap('生产运营用电'),
  非生产运营用电: getColumnMap('非生产运营用电'),
  尖峰用电: getColumnMap('尖峰用电'),
  力调电费: getColumnMap('力调电费'),
  其他电费: getColumnMap('其他电费'),
  基本电费: getColumnMap('基本电费'),
  收缴情况: getColumnMap('收缴情况'),
}
