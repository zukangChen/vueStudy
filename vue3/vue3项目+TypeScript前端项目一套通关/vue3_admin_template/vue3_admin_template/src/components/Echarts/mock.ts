import { fontSize, fontSizeWidth } from '@/utils/rem'
//学历/年龄结构
export const ageData = {
  title: '学历/年龄结构',
  data: [
    { value: 238, name: '博士' },
    { value: 212, name: '硕士' },
    { value: 165, name: '本科' },
    { value: 98, name: '大专' },
    { value: 78, name: '中专' },
  ],
  unit: '人',
}
///职称/职级结构
export const capacityData = {
  type: 2,
  data: [
    { value: 437, name: '正高' },
    { value: 396, name: '副高' },
    { value: 254, name: '中级' },
    { value: 127, name: '员级' },
    { value: 93, name: '助理级' },
  ],
  unit: '人',
  tipName: '人数',
}
//学历结构情况
export const educationData = {
  type: 2,
  title: '各学历占比',
  data: [
    { value: 238, name: '博士' },
    { value: 212, name: '硕士' },
    { value: 165, name: '本科' },
    { value: 98, name: '大专' },
    { value: 78, name: '中专' },
    { value: 56, name: '其他' },
  ],
  unit: '人',
  tipName: '人数',
}
//人力成本占比分析
export const laborCostsData = {
  type: 3,
  data: [
    { value: 2.45, name: '高管' },
    { value: 1.38, name: '非高管' },
  ],
  unit: '万元',
  tipName: '金额',
}
export const laborCostsData2 = {
  type: 3,
  data: [
    { value: 2.45, name: '本土' },
    { value: 5.48, name: '外籍-其他' },
    { value: 3.87, name: '外籍-中方' },
  ],
  unit: '万元',
  tipName: '金额',
}
//员工数量情况
export const staffData = {
  title: '月度员工数量',
  data: [
    { value: 2200, name: '1月' },
    { value: 3300, name: '2月' },
    { value: 2050, name: '3月' },
    { value: 3700, name: '4月' },
    { value: 2400, name: '5月' },
    { value: 2900, name: '6月' },
    { value: 2100, name: '7月' },
    { value: 3100, name: '8月' },
    { value: 3300, name: '9月' },
    { value: 2700, name: '10月' },
    { value: 2900, name: '11月' },
    { value: 3500, name: '12月' },
  ],
  unit: '人',
  tipName: '员工',
}
//业务板块情况
export const businessData = {
  type: 2,
  title: '月度员工数量',
  names: ['模块A', '模块B', '模块C', '模块D', '模块E', '模块F'],
  data: [
    { value: [246, 222, 123, 321, 123, 332, 53], name: '博士' },
    { value: [336, 322, 173, 121, 163, 132, 33], name: '硕士' },
    { value: [128, 122, 113, 221, 123, 232, 113], name: '本科' },
    { value: [301, 212, 123, 131, 23, 352, 253], name: '大专' },
    { value: [89, 212, 153, 211, 73, 132, 153], name: '中专' },
    { value: [107, 242, 143, 225, 23, 222, 433], name: '其他' },
  ],
  unit: '人',
  tipName: '员工',
}
//核心专业占比
export const majorsData = {
  type: 3,
  title: '核心专业占比',
  names: ['核心专业占比'],
  data: [
    { value: [459], name: '地质' },
    { value: [386], name: '采矿' },
    { value: [310], name: '选矿' },
    { value: [249], name: '冶金' },
  ],
  unit: '人',
  tipName: '员工',
}
//晋升分析占比
export const promotionData = {
  title: '晋升分析占比',
  data: [
    { value: 2378, name: '总人数' },
    { value: 701, name: '在库' },
    { value: 387, name: '晋升' },
    { value: 133, name: '晋升两次以上' },
  ],
  unit: '人',
  tipName: '晋升',
}
//管理人员结构
export const manageData = {
  type: 4,
  data: [
    {
      name: '高层总人数',
      unit: '人',
      color: ['#007BFF', '#F4F7FD'],
      data: [
        {
          name: '女性',
          value: 37,
        },
        {
          name: '男性',
          value: 541,
        },
      ],
    },
    {
      name: '中层总人数',
      unit: '人',
      color: ['#FF9F23', '#F4F7FD'],
      data: [
        {
          name: '女性',
          value: 264,
        },
        {
          name: '男性',
          value: 7000,
        },
      ],
    },
    {
      name: '基层总人数',
      unit: '人',
      color: ['#52C41A', '#F4F7FD'],
      data: [
        {
          name: '女性',
          value: 1264,
        },
        {
          name: '男性',
          value: 2563,
        },
      ],
    },
  ],
}
//安全及质量检查统计分析
export const qualitySecureData = {
  title: '月度员工数量',
  names: ['23/01', '23/02', '23/03', '23/04', '23/05', '23/06'],
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
          color: '#86C6FE', // 0% 处的颜色
        },
        {
          offset: 1,
          color: 'rgba(105, 138, 255, 0)', // 100% 处的颜色
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
          color: '#698AFF', // 0% 处的颜色
        },
        {
          offset: 1,
          color: 'rgba(105, 138, 255, 0)', // 100% 处的颜色
        },
      ],
      global: false, // 缺省为 false
    },
    '#F1D880',
  ],
  data: [
    {
      name: '质量检查',
      type: 'bar',
      data: [100000, 170000, 142000, 125000, 131000, 170000],
      unit: '件',
    },
    {
      name: '安全检查',
      type: 'bar',
      data: [140000, 112000, 81000, 175000, 85000, 125000],
      unit: '件',
    },
    {
      name: '完成率',
      type: 'line',
      yAxisIndex: 1,
      data: [40, 60, 72, 66, 51, 80],
      unit: '%',
    },
  ],
  yAxis: [
    {
      type: 'value',
      name: `单位：件`,
    },
    {
      type: 'value',
      position: 'right',
      max: 100,
      axisLabel: {
        show: true,
        formatter: function (value: any) {
          return value + '%'
        },
      },
    },
  ],
}
//工程项目数量及立项金额分析
export const projectData = {
  type: 4,
  title: '工程项目数量及立项金额分析',
  yAxis: {
    data: ['投资', '费用', '生产', '延续'],
  },
  data: [
    {
      data: [45, 23, 23, 24],
      name: '合同数量',
      unit: '个',
    },
    {
      data: [38, 22, 21, 23],
      name: '合同金额',
      unit: '万元',
    },
  ],
}
//矿山地图
export const mineData = {
  data: [
    {
      name: '宁夏自治区',
      coord: [116.405285, 39.904989],
      value: [
        '紫金矿业集团南方投资有限公司',
        '西藏巨龙铜业有限公司',
        '紫金矿业集团南方投资有限公司',
        '西藏巨龙铜业有限公司',
      ],
    },
    {
      name: '辽宁',
      coord: [123.429096, 41.796767],
      value: [
        '紫金矿业集团南方投资有限公司',
        '西藏巨龙铜业有限公司',
        '紫金矿业集团南方投资有限公司',
        '西藏巨龙铜业有限公司',
      ],
    },
  ],
}
//境外地图
export const abroadData = {
  type: 2,
  data: [
    {
      name: '宁夏自治区',
      coord: [116.405285, 39.904989],
      value: [
        '紫金矿业集团南方投资有限公司',
        '西藏巨龙铜业有限公司',
        '紫金矿业集团南方投资有限公司',
        '西藏巨龙铜业有限公司',
      ],
    },
    {
      name: '辽宁',
      coord: [123.429096, 41.796767],
      value: [
        '紫金矿业集团南方投资有限公司',
        '西藏巨龙铜业有限公司',
        '紫金矿业集团南方投资有限公司',
        '西藏巨龙铜业有限公司',
      ],
    },
  ],
}
// 集团入选品味统计分析
export const SelectedTasteData = {
  title: '月度员工数量',
  legend: {
    right: 0,
    top: 0,
  },
  grid: {
    top: fontSizeWidth(55),
    left: fontSizeWidth(80),
    right: fontSizeWidth(57),
  },
  names: ['企业A', '企业B', '企业C', '企业D', '企业E', '企业F'],
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
          color: '#F9D88B', // 0% 处的颜色
        },
        {
          offset: 1,
          color: '#FAA659', // 100% 处的颜色
        },
      ],
      global: false, // 缺省为 false
    },
    '#4261F6',
    '#FFAF47',
  ],
  data: [
    {
      name: '当日完成',
      type: 'bar',
      data: [100000, 170000, 142000, 125000, 131000, 170000],
      unit: '件',
    },
    {
      name: '当月完成',
      type: 'bar',
      data: [140000, 112000, 81000, 175000, 85000, 125000],
      unit: '件',
    },
    {
      name: '月同比',
      type: 'line',
      yAxisIndex: 1,
      data: [40, 60, 72, 66, 51, 80],
      markLine: {
        silent: true, // 鼠标移动到标记线上无操作
        symbol: ['', 'arrow'],
        symbolSize: fontSizeWidth(16),
        label: {
          show: false,
          fontSize: fontSizeWidth(16),
        },
        data: [
          {
            yAxis: '0',
            lineStyle: {
              color: '#000',
            },
          },
        ],
      },
      unit: '%',
    },
    {
      name: '月环比',
      type: 'line',
      yAxisIndex: 1,
      data: [54, 55, 43, 23, 43, 78],
      unit: '%',
    },
  ],
  yAxis: [
    {
      type: 'value',
      name: `单位：kg`,
      splitLine: {
        show: false,
      },
    },
    {
      type: 'value',
      position: 'right',
      max: 100,
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
}
export const completionStatus = {
  title: '月度员工数量',
  grid: {
    top: fontSizeWidth(70),
    left: fontSizeWidth(80),
    right: fontSizeWidth(57),
  },
  legend: {
    right: 10,
    top: 0,
  },
  names: ['企业A', '企业B', '企业C', '企业D', '企业E', '企业F'],
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
          color: '#FFAF47', // 0% 处的颜色
        },
        {
          offset: 1,
          color: '#FB8C2D', // 100% 处的颜色
        },
      ],
      global: false, // 缺省为 false
    },
    '#509CEA',
  ],
  data: [
    {
      name: '实际投资',
      type: 'bar',
      data: [100000, 170000, 142000, 125000, 131000, 170000],
      unit: '件',
    },
    {
      name: '计划投资',
      type: 'bar',
      data: [140000, 112000, 81000, 175000, 85000, 125000],
      unit: '件',
    },
    {
      name: '完成率',
      type: 'line',
      yAxisIndex: 1,
      data: [40, 60, 72, 66, 51, 80],
      markLine: {
        silent: true, // 鼠标移动到标记线上无操作
        symbol: ['', 'arrow'],
        symbolSize: fontSizeWidth(16),
        label: {
          show: false,
          fontSize: fontSizeWidth(16),
        },
        data: [
          {
            yAxis: '0',
            lineStyle: {
              color: '#000',
            },
          },
        ],
      },
      unit: '%',
    },
  ],
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
      max: 100,
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
}

export const engineeringContracts = {
  title: '月度员工数量',
  grid: {
    top: fontSizeWidth(40),
    left: fontSizeWidth(80),
    right: fontSizeWidth(57),
  },
  legend: {
    left: 'center',
    top: 10,
  },
  names: ['企业A', '企业B', '企业C', '企业D', '企业E', '企业F'],
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
          color: '#698AFF', // 0% 处的颜色
        },
        {
          offset: 1,
          color: '#86FEFE', // 100% 处的颜色
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
          color: '#1DDDB1', // 0% 处的颜色
        },
        {
          offset: 1,
          color: '#1DDDB1', // 100% 处的颜色
        },
      ],
      global: false, // 缺省为 false
    },
    '#F2D06F',
  ],
  data: [
    {
      name: '问题数量',
      type: 'bar',
      data: [100000, 170000, 142000, 125000, 131000, 170000],
      unit: '件',
    },
    {
      name: '反馈数量',
      type: 'bar',
      data: [140000, 112000, 81000, 175000, 85000, 125000],
      unit: '件',
    },
    {
      name: '完成率',
      type: 'line',
      yAxisIndex: 1,
      data: [54, 55, 43, 23, 43, 78],
      unit: '%',
    },
  ],
  yAxis: [
    {
      type: 'value',
      name: `单位：个`,
      splitLine: {
        show: false,
      },
    },
    {
      type: 'value',
      position: 'right',
      max: 100,
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
}

// 利润
export const profitTasteData = {
  title: '月度员工数量',
  names: ['企业A', '企业B', '企业C', '企业D', '企业E', '企业F'],
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
          color: '#F9D88B', // 0% 处的颜色
        },
        {
          offset: 1,
          color: '#FAA659', // 100% 处的颜色
        },
      ],
      global: false, // 缺省为 false
    },
    '#4261F6',
  ],
  data: [
    {
      name: '当月完成',
      type: 'bar',
      data: [140000, 112000, 81000, 175000, 85000, 125000],
      unit: '件',
    },
    {
      name: '月同比',
      type: 'line',
      yAxisIndex: 1,
      data: [40, 60, 72, 66, 51, 80],
      unit: '%',
    },
    {
      name: '月环比',
      type: 'line',
      yAxisIndex: 1,
      markLine: {
        silent: true, // 鼠标移动到标记线上无操作
        symbol: ['', 'arrow'],
        symbolSize: fontSizeWidth(16),
        label: {
          show: false,
          fontSize: fontSizeWidth(16),
        },
        data: [
          {
            yAxis: '0',
            lineStyle: {
              color: '#000',
            },
          },
        ],
      },
      data: [54, 55, 43, 23, 43, 78],
      unit: '%',
    },
  ],
  yAxis: [
    {
      type: 'value',
      name: `单位：kg`,
      splitLine: {
        show: false,
      },
    },
    {
      type: 'value',
      position: 'right',
      max: 100,
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: true,
        formatter: function (value, index) {
          return value + '%'
        },
      },
    },
  ],
}
// 冶化新冷源
export const MetallurgySecureData = {
  title: '月度员工数量',
  names: ['23/01', '23/02', '23/03', '23/04', '23/05', '23/06'],
  legend: {
    right: 250,
    top: 0,
    itemGap: 15,
    itemHeight: 15,
    itemWidth: 15,
  },
  grid: {
    top: fontSizeWidth(89),
    left: fontSizeWidth(50),
    right: fontSizeWidth(23),
    bottom: fontSizeWidth(35),
  },
  color: [
    {
      type: 'bar',
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
      type: 'bar',
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
      name: '本年度月产量',
      type: 'bar',
      data: [32, 232, 142, 125, 131, 170],
      unit: '件',
    },
    {
      name: '去年同期月产量',
      type: 'bar',
      data: [140, 112, 81, 175, 85, 125],
      unit: '件',
    },
  ],
  yAxis: [
    {
      type: 'value',
      name: `单位：件`,
      splitLine: {
        show: false,
      },
    },
  ],
}
// 冶化新能源 处理精矿量
export const concentrateProcessingData = {
  grid: {
    top: fontSizeWidth(100),
    left: fontSizeWidth(45),
    right: fontSizeWidth(0),
    bottom: fontSizeWidth(35),
  },
  title: '月度员工数量',
  names: ['23/01', '23/02', '23/03', '23/04', '23/05', '23/06'],
  color: [
    {
      type: 'bar',
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
      type: 'bar',
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
      name: '本年度月采矿量',
      type: 'bar',
      data: [100, 170, 142, 125, 131, 170],
      unit: '件',
    },
    {
      name: '本年同期月采矿量',
      type: 'bar',
      data: [140, 112, 81, 175, 85, 125],
      unit: '件',
    },
  ],
  yAxis: [
    {
      type: 'value',
      name: `单位：件`,
      splitLine: {
        show: false,
      },
      // position:'right'
    },
  ],
}
// 冶化新能源 金属产量
export const MetalproductionData = {
  grid: {
    top: fontSizeWidth(100),
    left: fontSizeWidth(55),
    right: fontSizeWidth(0),
    bottom: fontSizeWidth(35),
  },
  title: '月度员工数量',
  names: ['23/01', '23/02', '23/03', '23/04', '23/05', '23/06'],
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
      name: '本年度月采矿量',
      type: 'line',
      data: [100, 170, 142, 125, 131, 170],
      unit: '件',
    },
    {
      name: '本年同期月采矿量',
      type: 'line',
      data: [140, 112, 81, 175, 85, 125],
      unit: '件',
    },
  ],
  yAxis: [
    {
      type: 'value',
      name: `单位：件`,
      splitLine: {
        show: false,
      },
    },
  ],
}
// 冶化新能源
export const LaborproductivityData = {
  legend: {
    right: 350,
    top: 10,
    itemGap: 15,
    itemHeight: 15,
    itemWidth: 15,
  },
  grid: {
    left: 55,
    top: 78,
    bottom: 25,
    right: 25,
  },
  title: '月度员工数量',
  names: ['23/01', '23/02', '23/03', '23/04', '23/05', '23/06'],
  color: [
    {
      type: 'bar',
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
      type: 'bar',
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
      name: '本年度月采矿量',
      type: 'bar',
      data: [100, 170, 142, 125, 131, 170],
      unit: '件',
    },
    {
      name: '本年同期月采矿量',
      type: 'bar',
      data: [140, 112, 81, 175, 85, 125],
      unit: '件',
    },
  ],
  yAxis: [
    {
      type: 'value',
      name: `单位：t/人`,
      splitLine: {
        show: false,
      },
    },
  ],
}

// 地勘数据mock
export const drillingData = {
  grid: {
    top: fontSizeWidth(58),
    left: fontSizeWidth(60),
    right: fontSizeWidth(57),
  },
  legend: {
    right: 10,
    top: 0,
    itemWidth: 20,
    itemHeight: 20,
  },
  names: ['01月', '02月', '03月', '04月', '05月'],
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
          color: '#FFAF47', // 0% 处的颜色
        },
        {
          offset: 1,
          color: '#FB8C2D', // 100% 处的颜色
        },
      ],
      global: false, // 缺省为 false
    },
    '#509CEA',
  ],
  data: [
    {
      name: '实际完成',
      type: 'bar',
      data: [1000, 1700, 1420, 1250, 1310, 1700],
      unit: '件',
    },
    {
      name: '计划完成',
      type: 'bar',
      data: [1400, 1120, 810, 1750, 850, 1250],
      unit: '件',
    },
    {
      name: '完成率',
      type: 'line',
      yAxisIndex: 1,
      data: [40, 60, 72, 66, 51, 80],
      markLine: {
        silent: true, // 鼠标移动到标记线上无操作
        symbol: ['', ''],
        symbolSize: fontSizeWidth(16),
        label: {
          show: false,
          fontSize: fontSizeWidth(16),
        },
        data: [
          {
            yAxis: '0',
            lineStyle: {
              color: '#000',
            },
          },
        ],
      },
      unit: '%',
    },
  ],
  yAxis: [
    {
      type: 'value',
      name: `单位：万元`,
      splitLine: {
        show: false,
      },
    },
    {
      type: 'value',
      position: 'right',
      max: 100,
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
}

// 集团数据mock
export const groupOverviewData = {
  grid: {
    top: fontSizeWidth(120),
    left: fontSizeWidth(60),
    right: fontSizeWidth(57),
  },
  legend: {
    left: '42%',
    top: 80,
    itemWidth: 20,
    itemHeight: 20,
  },
  names: ['2023/1月', '2023/2月', '2023/3月', '2023/4月', '2023/5月'],
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
          color: '#FFAF47', // 0% 处的颜色
        },
        {
          offset: 1,
          color: '#FB8C2D', // 100% 处的颜色
        },
      ],
      global: false, // 缺省为 false
    },
    '#509CEA',
  ],
  data: [
    {
      name: '年累计收入',
      type: 'bar',
      data: [2900, 2200, 3840, 4450, 2310, 1500],
      unit: '万元',
    },
    {
      name: '年计划收入',
      type: 'bar',
      data: [1200, 3120, 1410, 3350, 3100, 2850],
      unit: '万元',
    },
    {
      name: '完成率',
      type: 'line',
      yAxisIndex: 1,
      data: [40, 60, 72, 66, 51, 80],
      markLine: {
        silent: true, // 鼠标移动到标记线上无操作
        symbol: ['', ''],
        symbolSize: fontSizeWidth(16),
        label: {
          show: false,
          fontSize: fontSizeWidth(16),
        },
        data: [
          {
            yAxis: '0',
            lineStyle: {
              color: '#000',
            },
          },
        ],
      },
      unit: '%',
    },
  ],
  yAxis: [
    {
      type: 'value',
      name: `单位：万元`,
      splitLine: {
        show: false,
      },
    },
    {
      type: 'value',
      position: 'right',
      max: 100,
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
}
