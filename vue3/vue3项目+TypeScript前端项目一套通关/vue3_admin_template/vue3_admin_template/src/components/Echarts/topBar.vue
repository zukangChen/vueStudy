<template>
	<div class="comm-chart" ref="chart"></div>
</template>
<script setup lang="ts">
import { shallowRef, onMounted, watch, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { fontSizeWidth } from '@/utils/rem'
import noData from '@/assets/header/noData.png'
import { color, fontColor } from './params'

// let imgRect = 'image://src/assets/GroupOverview/rect.png'
import imgUp from '@/assets/GroupOverview/up.png'
import imgDown from '@/assets/GroupOverview/down.png'

const emits = defineEmits(['getCurrentItem'])
const chart = shallowRef(null)
let myChart: any = null
const props = defineProps({
	data: {
		type: Object,
	},
	result: {
		type: Array,
		default: () => [],
	},
})
let opts: any = {
	color: color('linear'),
	fontColor: fontColor,
	data: [],
	...props.data,
}

const transOptions = (result) => {
	return {
		// color: colorList,
		tooltip: {
			show: true,
			trigger: 'item',
			padding: [8, 15],
			backgroundColor: 'rgba(23, 51, 67,1)',
			textStyle: {
				color: 'rgba(255, 255, 255, 1)',
			},
			formatter: (data: any) => {
				return `${data.marker} ${data.name}完成率：${data.data.value}%`
			},
		},
		legend: {
			show: false,
		},
		grid: {
			top: fontSizeWidth(10),
			left: fontSizeWidth(20),
			right: fontSizeWidth(120),
			bottom: fontSizeWidth(10),
			// 禁用所有分隔线
			splitLine: {
				show: false,
			},
		},
		xAxis: [
			{
				splitLine: {
					show: false,
				},
				type: 'value',
				show: false,
				max: 100,
			},
		],
		yAxis: [
			{
				position: 'right',
				splitLine: {
					show: false,
				},
				axisLine: {
					show: false,
				},
				type: 'category',
				axisTick: {
					show: false,
				},
				inverse: true,
				data: result.map((item) => item.title),
				axisLabel: {
					color: 'red',
					fontSize: 14,
					margin: 40,

					formatter: (title, index) => {
						let data = result.filter((item) => item.title === title)[0]
						let yoy = ''
						let yoyIcon = ''
						let yoyColor = ''
						// debugger
						if (Number(data.yoy) >= 0) {
							yoy = `+${Number(data.yoy).toFixed(2)}`
							yoyIcon = 'icon'
							yoyColor = 'greenColor'
						} else {
							yoy = `${Number(data.yoy).toFixed(2)}`
							yoyIcon = 'icon2'
							yoyColor = 'redColor'
						}
						let mom = ''
						let momIcon = ''
						let momColor = ''
						let hbName = '环比'
						if (Number(data.mom) >= 0) {
							mom = `+${Number(data.mom).toFixed(2)}`
							momIcon = 'icon'
							momColor = 'greenColor'
						} else {
							mom = `${Number(data.mom).toFixed(2)}`
							momIcon = 'icon2'
							momColor = 'redColor'
						}
						return [`{name|同比}\n{${yoyColor}|${yoy}%     }{${yoyIcon}|}`]
						// return [
						// 	`{name|同比}{${yoyColor}|${yoy}%     }{${yoyIcon}|}\n{name|${hbName}}{${momColor}|${mom}%     }{${momIcon}|}`,
						// ]
					},
					rich: {
						name: {
							width: fontSizeWidth(54),
							fontWeight: 400,
							padding: [
								fontSizeWidth(-30),
								fontSizeWidth(20),
								0,
								fontSizeWidth(-20),
							],
							fontSize: fontSizeWidth(15),
							color: '#5B6276',
						},
						greenColor: {
							width: fontSizeWidth(14),
							height: fontSizeWidth(19),
							padding: [0, fontSizeWidth(20), 0, 0],
							align: 'center',
							// backgroundColor: {
							// 	image: ranking2,
							// },
							fontSize: fontSizeWidth(16),
							fontWeight: 700,
							color: '#1DDDB1',
						},
						redColor: {
							width: fontSizeWidth(14),
							height: fontSizeWidth(19),
							padding: [0, fontSizeWidth(20), 0, 0],
							// margin-right:fontSizeWidth(5),
							align: 'center',
							// backgroundColor: {
							// 	image: icon1,
							// },
							color: '#FF6565',
							fontSize: fontSizeWidth(16),
							fontWeight: 700,
						},
						icon: {
							backgroundColor: {
								image: imgUp,
							},
						},
						icon2: {
							backgroundColor: {
								image: imgDown,
							},
							// fontSize: fontSizeWidth(16),
						},
					},
				},
			},
			{
				position: 'left',
				type: 'category',
				inverse: true,
				axisTick: 'none',
				axisLine: 'none',
				show: true,
				axisLabel: {
					verticalAlign: 'bottom',
					align: 'left',
					// margin: [0, 0, 0, 0],
					padding: [0, fontSizeWidth(10), fontSizeWidth(15), fontSizeWidth(80)],
					textStyle: {
						color: '#0B0F5A',
						fontSize: fontSizeWidth(14),
					},
					formatter: function (title, index) {
						let data = result.filter((item) => item.title === title)[0]
						// debugger
						let value = data.production.toFixed(2)
						let planValue =
							data.productionPlan && data.productionPlan.toFixed(2)
						let unit = data.unit
						return [
							`{name|实际/计划: }{num|${value}}{unit| ${unit}} / {num|${planValue}}{unit| ${unit}}`,
						]
					},
					rich: {
						name: {
							fontWeight: 600,
							fontSize: fontSizeWidth(18),
							color: '#5B6276',
						},
						num: {
							fontWeight: 600,
							fontSize: fontSizeWidth(18),
							color: '#0B0F5A',
						},
						unit: {
							align: 'center',
							color: '#0B0F5A',
							fontSize: fontSizeWidth(16),
						},
					},
				},
				data: result.map((item) => item.title),
			},
		],
		dataZoom: [
			{
				show: result.length > 6,
				startValue: 0, // 数据窗口范围的起始数值
				endValue: 6, // 数据窗口范围的结束数值（一页显示多少条数据）
				type: 'slider',
				maxValueSpan: 6, // 显示数据的条数(默认显示10个)
				handleSize: 0, // 滑动条的 左右2个滑动条的大小
				height: '0', // 组件高度
				width: '0',
				left: '96%', // 左边的距离
				right: 4, // 右边的距离
				bottom: 10, // 上边边的距离
				borderColor: '#0e426c',
				fillerColor: '#1890ff', // 滑动块的颜色
				backgroundColor: '#0e426c', // 两边未选中的滑动条区域的颜色
				showDataShadow: false, // 是否显示数据阴影 默认auto
				showDetail: false, // 即拖拽时候是否显示详细数值信息 默认true
				realtime: true, // 是否实时更新
				filterMode: 'filter',
				yAxisIndex: [0, 1, 2], // 控制的y轴
				brushSelect: false, // 刷选功能，设为false可以防止拖动条长度改变 ************（这是一个坑）
			},
			{
				//没有下面这块的话，只能拖动滚动条，鼠标滚轮在区域内不能控制外部滚动条
				type: 'inside',
				yAxisIndex: [0, 1, 2], //控制哪个轴，如果是 number 表示控制一个轴，如果是 Array 表示控制多个轴。此处控制第二根轴
				zoomOnMouseWheel: false, //滚轮是否触发缩放
				moveOnMouseMove: true, //鼠标移动能否触发平移
				moveOnMouseWheel: true, //鼠标滚轮能否触发平移
			},
		],
		series: [
			{
				name: '',
				type: 'bar',
				barWidth: fontSizeWidth(16), // 柱子宽度
				MaxSize: 0,
				showBackground: true,
				// symbol: imgRect,
				// symbolSize: fontSizeWidth(20), //标记的大小
				// barBorderRadius: [30, 0, 0, 30],
				backgroundStyle: {
					color: '#DDE3FF',
				},
				label: {
					show: true,
					offset: [fontSizeWidth(7), fontSizeWidth(-25)],
					color: '#5B6276',
					fontWeight: 500,
					fontSize: fontSizeWidth(20),
					position: 'left',
					align: 'left',
					formatter: function (params) {
						return `${params.data.name}`
					},
				},
				data: result.map((item, index) => {
					return {
						name: item.title,
						value: item.complete,
						itemStyle: {
							barBorderRadius: [10, 10, 10, 10],
							color: {
								type: 'linear',
								x: 0,
								y: 0,
								x2: 1,
								y2: 1,
								colorStops: [
									{
										offset: 0,
										color: '#4261F6',
									},
									{
										offset: 1,
										color: '#7B89FF',
									},
								],
							},
						},
					}
				}),
			},
		],
	}
}

// watch(props.data!, (_o, n: any) => {
// 	opts = {
// 		...opts,
// 		...n,
// 	}
// 	init()
// })
const init = () => {
	if (myChart) {
		myChart.dispose()
		myChart = null
	}
	chart.value.innerHTML = `<div class="noData"><img src="${noData}"><span class="noDataText">暂无数据</span></div>`
	if (!props?.result?.length) return
	myChart = echarts.init(chart.value)
	window.addEventListener('resize', () => {
		myChart?.resize()
	})
	initChat()
}
const initChat = () => {
	let option = transOptions(props.result)
	// debugger
	myChart.setOption(option)
	myChart.off('click')
	myChart.on('click', function (params: any) {
		emits('getCurrentItem', params)
	})
}
watch(
	() => props.result,
	(_o, n: any) => {
		init()
	},
	{ deep: true }
)
onMounted(() => {
	init()
})
let isStop = false
onUnmounted(() => {
	isStop = true
	if (myChart) {
		myChart.dispose()
		myChart = null
	}
})
</script>
<style lang="scss" scope>
.comm-chart {
	display: flex;
	align-items: center;
	justify-content: center;
	color: var(--el-text-color-secondary);
	font-size: 14px;
	.noData {
		margin-top: -10 * $bs;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		img {
			width: 70 * $bs;
			height: 70 * $bs;
		}
		.noDataText {
			line-height: 50 * $bs;
			padding-left: 10 * $bs;
			font-size: 16 * $bs;
		}
	}
}
</style>