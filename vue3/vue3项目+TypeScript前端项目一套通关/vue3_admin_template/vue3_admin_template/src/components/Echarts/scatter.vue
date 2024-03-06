<template>
	<div class="comm-chart" ref="chart"></div>
</template>
<script setup lang="ts">
import { shallowRef, onMounted, watch, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { color, fontColor } from './params'
import { fontSize, fontSizeWidth } from '@/utils/rem'
import noData from '@/assets/header/noData.png'

const emits = defineEmits(['getCurrentItem'])
const chart = shallowRef(null)
let myChart: any = null
const props = defineProps({
	data: {
		type: Object,
	},
})
let opts: any = {
	...props.data,
}
watch(
	props.data!,
	(_o, n: any) => {
		opts = {
			...opts,
			...n,
		}
		init()
	},
	{
		deep: true,
	}
)
onMounted(() => {
	myChart = echarts.init(chart.value)
	window.addEventListener('resize', () => {
		myChart.resize()
	})
	init()
})
let isStop = false
onUnmounted(() => {
	isStop = true
	myChart && myChart.dispose()
	myChart = null
})
const init = () => {
	if (myChart) {
		myChart.dispose()
		myChart = null
	}
	chart.value.innerHTML = `<div class="noData"><img src="${noData}"><span class="noDataText">暂无数据</span></div>`
	if (!opts?.dataset?.source.length) return
	myChart = echarts.init(chart.value)
	window.addEventListener('resize', () => {
		myChart && myChart.resize()
	})
	myChart.clear()
	initChat()
}
const initChat = () => {
	const options = {
		//你的代码
		grid: {
			bottom: fontSizeWidth(35),
			...opts.grid,
		},
		title: {
			text: '',
			left: 'center',
			bottom: '10',
			...opts.title,
		},
		// tooltip: {},
		dataset: opts.dataset || {
			dimensions: ['dept', 'age'],
			source: resultData,
		},
		xAxis: [
			{
				type: 'category',
				...opts.xAxis,
			},
		],
		yAxis: [
			{
				type: 'category',
				...opts.yAxis,
			},
		],
		series: [
			{
				type: 'scatter',
				symbolSize(data) {
					if (data.isFirst) {
						const num = opts.hashMap[`${data.is_plate}_${data.value}`]
						let result = parseInt(num) * 3
						if (result > 0 && result < 25) {
							result = 25
						}
						if (result > 70) {
							result = 50
						}
						return result
					}
				},
				label: {
					show: true,
					position: 'inside',
					color: '#0b0f5a',
					fontSize: fontSizeWidth(16),
					fontWeight: 500,
					formatter(param) {
						// console.log('hh', param)
						// console.log('hh2', opts.hashMap)
						const num =
							opts.hashMap[`${param.value.is_plate}_${param.value.value}`]
						if (param.value.isFirst) return `${num}`
					},
				},
				itemStyle: {
					color(param) {
						// console.log('param2', param)
						let color = '#4098cf'
						const num = parseInt(param.value.value_mon)
						// if (num <= 10) {
						// 	color = '#534bdc'
						// } else if (num > 10 && num <= 20) {
						// 	color = '#6ed2c5'
						// } else {
						// 	color = '#4098cf'
						// }
						return color
					},
				},
			},
		],
	}
	// const options = {
	// 	grid: {
	// 		bottom: fontSizeWidth(35),

	// 		...opts.grid,
	// 	},
	// 	title: {
	// 		text: '',
	// 		left: 'center',
	// 		bottom: '10',
	// 		...opts.title,
	// 	},
	// 	tooltip: {},
	// 	xAxis: {
	// 		name: '',
	// 		type: 'category',
	// 		data: opts.names,
	// 		splitLine: {
	// 			lineStyle: {
	// 				type: 'dashed',
	// 			},
	// 		},
	// 		...opts.xAxis,
	// 	},
	// 	yAxis: {
	// 		name: '',
	//     type: 'category',
	// 		splitLine: {
	// 			lineStyle: {
	// 				type: 'dashed',
	// 			},
	// 		},
	// 		...opts.yAxis,
	// 	},
	// 	dataZoom: {
	// 		start: 0,
	// 		type: opts.limit ? 'slider' : 'inside',
	// 		startValue: 0,
	// 		bottom: '-5%',
	// 		moveHandleStyle: {
	// 			borderWidth: 10,
	// 			color: '#7d74fa',
	// 		},
	// 		...opts.dataZoom,
	// 	},
	// 	// series: [
	// 	// 	{
	// 	// 		symbolSize: 10,
	// 	// 		data: opts.data,
	// 	// 		type: 'scatter',
	// 	// 	},
	// 	// ],
	// 	series: [
	// 		{
	// 			type: 'scatter',
	// 		},
	// 	],
	// 	dataset: opts.dataset || {
	// 		dimensions: ['dept', 'age'],
	// 		source: resultData,
	// 	},
	// }
	if (opts.customDataZoom) {
		options.dataZoom = opts.customDataZoom
	}
	// debugger
	console.log('sdsd', options)
	myChart.setOption(options)
}
</script>