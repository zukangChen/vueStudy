<template>
	<div class="comm-chart" ref="chart"></div>
</template>
<script setup lang="ts">
import { shallowRef, onMounted, watch, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { fontSize, fontSizeWidth } from '@/utils/rem'
import { throttle } from '@/utils'
import noData from '@/assets/header/noData.png'
import { color, fontColor } from './params'
const chart = shallowRef(null)
let myChart: any = null
const props = defineProps({
	data: {
		type: Object,
	},
})
let opts: any = {
	color: color('linear'),
	fontColor: fontColor,
	data: [],
	limitMin: 0.05,
	limitMax: 0.05,
	xAxis: {
		interval: null,
	},
	...props.data,
}
watch(
	() => props.data!,
	throttle((_o, n: any) => {
		opts = {
			...opts,
			...JSON.parse(JSON.stringify(n)),
		}
		init()
	}),
	{ deep: true },
)
onMounted(() => {
	setTimeout(() => {
		// 延迟渲染，防止图表渲染未占满父盒子
		init()
	})
})
let isStop = false
onUnmounted(() => {
	isStop = true
	if (myChart) {
		myChart.dispose()
		myChart = null
	}
})
const init = () => {
	if (!opts.names.length && !myChart && chart.value) {
		chart.value.innerHTML = `<div class="noData"><img src="${noData}"><span class="noDataText">暂无数据</span></div>`
		return
	}
	if (myChart) {
		myChart.dispose()
	}

	if (!opts.names.length || !opts.data.length) return
	myChart = echarts.init(chart.value)
	window.addEventListener('resize', () => {
		myChart.resize()
	})
	if (opts.type === 2) {
		initChat2()
	} else if (opts.type === 3) {
		initChat3()
	} else if (opts.type === 4) {
		initChat4()
	} else {
		initChat()
	}
}
const initChat = () => {
	const options = {
		color: opts.color,
		grid: {
			bottom: 35,
			...opts.grid,
		},
		tooltip: {
			trigger: 'axis',
			backgroundColor: 'rgba(9, 10, 42, 0.56)',
			confine: true,
			enterable: true,
			textStyle: {
				color: '#fff',
				fontSize: fontSizeWidth(18),
			},
			position: 'top',
			formatter: (data: any) => {
				let str = `${data[0].name}<br>`
				data.map((a: any) => {
					str += `${
						a.marker
					}<span style="color:#fff"><span style="width:${fontSizeWidth(
						60,
					)}px;display:inline-block;">${a.seriesName}</span>`
					str += `<span style="min-width:8em;text-align:right;display:inline-block;font-weight:600">${
						a.value != 'undefined' ? a.value : '--'
					}${opts.data[a.seriesIndex].unit}</span></span><br>`
				})
				return str
			},
		},
		dataZoom: {
			start: 0,
			type: 'inside',
		},
		xAxis: {
			type: 'category',
			data: opts.names,
			boundaryGap: 0,

			axisTick: {
				show: false,
			},
			axisLabel: {
				show: true,
				fontSize: fontSizeWidth(14),
			},
			...opts.xAxis,
		},
		yAxis: opts.yAxis || {
			type: 'value',
			name: `单位：${opts.unit}`,
		},
		legend: {
			right: fontSizeWidth(50),
			top: fontSizeWidth(10),
			itemGap: fontSizeWidth(15),
			itemHeight: fontSizeWidth(15),
			itemWidth: fontSizeWidth(15),
			icon: 'rect',
			textStyle: {
				fontSize: fontSizeWidth(16),
			},
			...opts.legend,
		},
		series: opts.data.map((a: any, index: number) => {
			return {
				barWidth: fontSizeWidth(25),
				showSymbol: a.symbol,
				symbol: a.symbol,
				labelLine: {
					show: false,
				},
				label: {
					show: false,
				},
				/* areaStyle:{
                        color:opts.color[index]
                    }, */
				markPoint: a.markPoint,
				...a,
				emphasis: {
					showSymbol: true,
					itemStyle: {
						shadowBlur: 0,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)',
					},
				},
				smooth: true,
				showBackground: true,
				backgroundStyle: {
					color: 'rgba(180, 180, 180, 0.2)',
					shadowColor: 'rgba(180, 180, 180, 1)',
				},
				itemStyle: {
					borderColor: '#fff',
					borderRadius: [fontSizeWidth(4), fontSizeWidth(4), 0, 0],
				},
				lineStyle: {
					width: fontSizeWidth(2),
				},
			}
		}),
	}
	myChart.setOption(options)
	let index = 0,
		timer: any = null
	const fn = () => {
		if (isStop) return
		if (index == opts.data.length) {
			index = 0
		}
		myChart.dispatchAction({
			type: 'highlight',
			seriesIndex: [0],
			dataIndex: index,
		})
		myChart.dispatchAction({
			type: 'showTip',
			seriesIndex: [0],
			dataIndex: index,
		})
		if (timer) {
			clearTimeout(timer)
		}
		if (isStop) return
		timer = setTimeout(() => {
			index++
			fn()
		}, 1000)
	}
	// fn();
}
const initChat2 = () => {
	if (opts.limitMaxMin && opts.yAxis.length && opts.yAxis[0]) {
		let yAxisData = []
		opts.data.map((a) => {
			if (a.yAxisIndex == 0 || !a.yAxisIndex) {
				yAxisData = yAxisData.concat(a.data)
			}
		})
		opts.yAxis[0].max = yAxisData.reduce(
			(s, a) => (s > Number(a) ? s : Number(a)),
			0,
		)
		opts.yAxis[0].max = (
			opts.yAxis[0].max +
			opts.yAxis[0].max * opts.limitMax
		).toFixed(1)
		opts.yAxis[0].min = (
			yAxisData.reduce(
				(s, a) => (!a || s < Number(a) ? s : Number(a)),
				Number(yAxisData[0]),
			) -
			opts.yAxis[0].max * opts.limitMin
		).toFixed(0)
	}
	if (opts.limitMaxMin && opts.yAxis.length && opts.yAxis[1]) {
		let yAxisData = []
		opts.data.map((a) => {
			if (a.yAxisIndex == 1) {
				yAxisData = yAxisData.concat(a.data)
			}
		})
		opts.yAxis[1].max = yAxisData.reduce(
			(s, a) => (s > Number(a) ? s : Number(a)),
			0,
		)
		opts.yAxis[1].max = (
			opts.yAxis[1].max +
			opts.yAxis[1].max * opts.limitMax
		).toFixed(1)
		opts.yAxis[1].min = (
			yAxisData.reduce(
				(s, a) => (!a || s < Number(a) ? s : Number(a)),
				Number(yAxisData[0]),
			) -
			opts.yAxis[1].max * opts.limitMin
		).toFixed(0)
	}
	const options = {
		color: opts.color,
		grid: {
			bottom: fontSizeWidth(40),
			...opts.grid,
		},
		tooltip: {
			trigger: 'axis',
			backgroundColor: 'rgba(9, 10, 42, 0.56)',
			confine: true,
			enterable: true,
			textStyle: {
				color: '#fff',
				fontSize: fontSizeWidth(18),
			},
			position: 'top',
			formatter: (data: any) => {
				let str = `${data[0].name}<br>`
				data.map((a: any) => {
					str += `${
						a.marker
					}<span style="color:#fff"><span style="width:10em;display:inline-block;;font-size: ${fontSizeWidth(
						18,
					)}px">${a.seriesName}</span>`
					str += `<span style="text-align:right;display:inline-block;font-weight:600;font-size: ${fontSizeWidth(
						18,
					)}px">${a.value != 'undefined' && a.value ? a.value : '--'}${
						opts.data[a.seriesIndex].unit
					}</span></span><br>`
				})
				return str
			},
		},
		dataZoom: {
			show: (opts.dataZoom && opts.dataZoom.show) || false,
			type: 'slider',
			bottom: fontSizeWidth(10),
			right: fontSizeWidth(15),
			left: fontSizeWidth(15),
			height: fontSizeWidth(20),
			zoomLock: true,
			startValue: 100,
			endValue: 90,
			brushSelect: false,
			showDetail: false,
			zoomOnMouseWheel: true,
			xAxisIndex: 0,
			...opts.dataZoom,
		},
		xAxis: {
			type: 'category',
			data: opts.names,
			// boundaryGap: 0,
			boundaryGap: ['30%', '10%'],
			axisTick: {
				show: false,
			},
			axisLabel: {
				interval: opts.xAxis.interval,
				show: true,
				fontSize: fontSizeWidth(12),
			},
			...opts.xAxis,
		},
		yAxis: opts.yAxis || {
			type: 'value',
			name: `单位：${opts.unit}`,
		},
		legend: {
			right: fontSizeWidth(50),
			top: fontSizeWidth(10),
			itemGap: fontSizeWidth(13),
			itemHeight: fontSizeWidth(13),
			itemWidth: fontSizeWidth(13),
			textStyle: {
				fontSize: fontSizeWidth(14),
			},
			...opts.legend,
		},
		visualMap: opts.visualMap || [],
		series: opts.data.map((a: any, index: number) => {
			return {
				barWidth: fontSizeWidth(25),
				symbolSize: a.symbolSize,
				labelLine: {
					show: false,
				},
				label: {
					show: false,
				},
				areaStyle: {},
				markPoint: a.markPoint,
				emphasis: {
					showSymbol: true,
					itemStyle: {
						shadowBlur: 0,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)',
					},
				},
				smooth: true,
				showBackground: true,
				backgroundStyle: {
					color: 'rgba(180, 180, 180, 0.2)',
					shadowColor: 'rgba(180, 180, 180, 1)',
				},
				itemStyle: {
					borderColor: '#fff',
					borderRadius: [fontSizeWidth(4), fontSizeWidth(4), 0, 0],
				},
				lineStyle: {
					width: fontSizeWidth(2),
				},
				...a,
			}
		}),
	}
	myChart.setOption(options)
	let index = 0,
		timer: any = null
	const fn = () => {
		if (isStop) return
		if (index == opts.data.length) {
			index = 0
		}
		myChart.dispatchAction({
			type: 'highlight',
			seriesIndex: [0],
			dataIndex: index,
		})
		myChart.dispatchAction({
			type: 'showTip',
			seriesIndex: [0],
			dataIndex: index,
		})
		if (timer) {
			clearTimeout(timer)
		}
		if (isStop) return
		timer = setTimeout(() => {
			index++
			fn()
		}, 1000)
	}
}
const initChat3 = () => {
	let min1 = Math.min(...opts.data[0].value)
	let max1 = Math.max(...opts.data[0].value)
	let min2 = Math.min(...opts.data[1].value)
	let max2 = Math.max(...opts.data[1].value)
	// let min3 = Math.min(...opts.data[2].value)
	// let max3 = Math.max(...opts.data[2].value)

	const options = {
		grid: {
			top: opts.grid.top || '20%',
			left: fontSizeWidth(0),
			right: fontSizeWidth(0),
			bottom: fontSizeWidth(18),
			containLabel: true,
			...opts.grid,
		},
		tooltip: {
			trigger: 'axis',
			backgroundColor: 'rgba(9, 10, 42, 0.56)',
			textStyle: {
				color: '#fff',
				fontSize: fontSizeWidth(14),
			},
			position: 'top',
			formatter: (data: any) => {
				let str = `${data[0].name}<br>`
				data.map((a: any, index: number) => {
					str += `${a.marker}<span style="color:#fff">${
						a.seriesName
					} <span style="width:70px;padding-right:20px;text-align:right;display:inline-block;font-weight:600">${
						a.value
					} ${opts.data[a.seriesIndex].unit}</span></span><br>`
				})
				return str
			},
			...opts.tooltip,
		},
		legend: [
			{
				top: 'top',
				left: 'center',
				orient: 'horizontal',
				itemWidth: 15,
				itemHeight: 10,
				itemGap: 15,
				borderRadius: 4,
				textStyle: {
					color: '#000',
					fontFamily: 'Alibaba PuHuiTi',
					fontSize: 14,
					fontWeight: 400,
				},
			},
		],
		// dataZoom: [
		// 	{
		// 		// 设置滚动条的隐藏与显示
		// 		show: false,
		// 		// 设置滚动条类型
		// 		type: 'slider',
		// 		showDetail: false,
		// 		// 数据窗口范围的起始数值
		// 		startValue: 0,
		// 		// 数据窗口范围的结束数值（一页显示多少条数据）
		// 		endValue: 6,
		// 		// empty：当前数据窗口外的数据，被设置为空。
		// 		// 即不会影响其他轴的数据范围
		// 		filterMode: 'empty',
		// 		// 是否锁定选择区域（或叫做数据窗口）的大小
		// 		zoomLoxk: true,
		// 		// 控制手柄的尺寸
		// 		handleSize: 0,
		// 		// dataZoom-slider组件离容器下侧的距离
		// 		bottom: 0,
		// 	},
		// 	{
		// 		// 没有下面这块的话，只能拖动滚动条，
		// 		// 鼠标滚轮在区域内不能控制外部滚动条
		// 		type: 'inside',
		// 		// 滚轮是否触发缩放
		// 		zoomOnMouseWheel: false,
		// 		// 鼠标滚轮触发滚动
		// 		moveOnMouseMove: true,
		// 		moveOnMouseWheel: true,
		// 	},
		// ],
		color: opts.color,
		xAxis: {
			type: 'category',
			data: opts.names || [],

			axisLine: {
				show: false,
			},
			axisTick: {
				show: false,
			},
			axisLabel: {
				show: true,
				// interval: 0,
				// rotate: 45, // 将标签逆时针旋转45度
				textStyle: {
					color: '#393939', //X轴文字颜色
				},
			},
			...opts.xAxis,
		},
		yAxis: opts.yAxis || [
			{
				type: 'value',
				name: `y1`,
				show: false,
				min: min1,
				max: max1,
			},
			{
				type: 'value',
				name: `y2`,
				show: false,
				min: min2,
				max: max2,
			},
			// {
			// 	type: 'value',
			// 	name: `y3`,
			// 	show: false,
			// 	min: min3,
			// 	max: max3,
			// },
		],
		series: opts.data.map((item) => {
			return {
				name: item.name,
				type: 'line',
				data: item.value,
				yAxisIndex: item.yAxisIndex, // 使用第一个 Y 轴
			}
		}),
	}
	myChart.setOption(options)
	// debugger
}

const initChat4 = () => {
	let min1 = Math.min(...opts.data[0].value)
	let max1 = Math.max(...opts.data[0].value)
	let min2 = Math.min(...opts.data[1].value)
	let max2 = Math.max(...opts.data[1].value)
	const options = {
		grid: {
			top: opts.grid.top || '20%',
			left: fontSizeWidth(0),
			right: fontSizeWidth(0),
			bottom: fontSizeWidth(18),
			containLabel: true,
			...opts.grid,
		},
		tooltip: {
			trigger: 'axis',
			backgroundColor: 'rgba(9, 10, 42, 0.56)',
			textStyle: {
				color: '#fff',
				fontSize: fontSizeWidth(14),
			},
			position: 'top',
			formatter: (data: any) => {
				let str = `${data[0].name}<br>`
				data.map((a: any, index: number) => {
					str += `${a.marker}<span style="color:#fff">${
						a.seriesName
					} <span style="width:70px;padding-right:20px;text-align:right;display:inline-block;font-weight:600">${
						a.value
					} ${opts.data[a.seriesIndex].unit}</span></span><br>`
				})
				return str
			},
			...opts.tooltip,
		},
		legend: [
			{
				top: 'top',
				left: 'center',
				orient: 'horizontal',
				itemWidth: 15,
				itemHeight: 10,
				itemGap: 15,
				borderRadius: 4,
				textStyle: {
					color: '#000',
					fontFamily: 'Alibaba PuHuiTi',
					fontSize: 14,
					fontWeight: 400,
				},
			},
		],
		color: opts.color,
		xAxis: {
			type: 'category',
			data: opts.names || [],

			axisLine: {
				show: false,
			},
			axisTick: {
				show: false,
			},
			axisLabel: {
				show: true,
				interval: 0,
				// rotate: 45, // 将标签逆时针旋转45度
				fontSize: fontSizeWidth(14),
				formatter: function (value, index) {
					// 判断是否是第一个或最后一个类目
					if (index === 0 || index === opts?.names?.length - 1) {
						// 如果是，使用HTML标记来设置颜色
						return '{color|' + value + '}'
					} else {
						// 否则使用默认颜色
						return value
					}
				},
				rich: {
					// 定义富文本样式
					color: {
						color: '#536DF8',
						fontSize: fontSizeWidth(14),
					},
				},
			},
			...opts.xAxis,
		},
		yAxis: opts.yAxis || [
			{
				type: 'value',
				name: `y1`,
				show: false,
				min: min1,
				max: max1,
			},
			{
				type: 'value',
				name: `y2`,
				show: false,
				min: min2,
				max: max2,
			},
		],
		series: opts.data.map((item) => {
			return {
				name: item.name,
				type: 'line',
				data: item.value,
				yAxisIndex: item.yAxisIndex, // 使用第一个 Y 轴
			}
		}),
	}
	myChart.setOption(options)
}
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