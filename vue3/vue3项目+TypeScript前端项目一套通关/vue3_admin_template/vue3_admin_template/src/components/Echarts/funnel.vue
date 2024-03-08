<template>
	<div class="comm-chart" ref="chart"></div>
</template>
<script setup lang="ts">
import { shallowRef, onMounted, watch, onUnmounted } from 'vue'
import * as echarts from 'echarts'
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
	...props.data,
}
watch(props.data!, (_o, n: any) => {
	opts = {
		...opts,
		...n,
	}
	init()
})
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
	}
})
const init = () => {
	if (!opts.data.length && !myChart) {
		chart.value.innerHTML = `<div class="noData"><img src="${noData}"><span class="noDataText">暂无数据</span></div>`
		return
	}
	if (myChart) {
		myChart.clear()
	} else {
		chart.value.innerHTML = ''
		myChart = echarts.init(chart.value)
		window.addEventListener(
			'resize',
			() => {
				myChart.resize()
			},
			false,
		)
	}
	if (opts.type === 2) {
		// initChat2();
	} else if (opts.type === 3) {
		// initChat3();
	} else if (opts.type === 4) {
		// initChat4();
	} else {
		initChat()
	}
}
const initChat = () => {
	const sum = opts.data.reduce((s: number, a: any) => s + a.value, 0)
	const options = {
		color: opts.color,
		tooltip: {
			trigger: 'item',
			backgroundColor: 'rgba(9, 10, 42, 0.56)',
			textStyle: {
				color: '#fff',
			},
			position: 'right',
			formatter: (data: any) => {
				return `${data.name}<br>${
					data.marker
				} <span style="color:#fff">人数<span style="width:100px;text-align:right;display:inline-block;font-weight:600">${
					data.value
				}${
					opts.unit
				}</span></span><br><span style="color:#fff;padding-left:18px;">占比<span style="width:100px;text-align:right;display:inline-block;font-weight:600">${(
					(data.value * 100) /
					sum
				).toFixed(2)}%</span></span>`
			},
		},
		dataZoom: {
			start: 0,
			type: 'inside',
		},
		legend: {
			left: 'center',
			bottom: '0',
			itemGap: 15,
			itemHeight: 15,
			itemWidth: 15,
			textStyle: {
				color: opts.fontColor,
				align: 'right',
				rich: {
					a: {
						fontSize: 16,
						fontWeight: 600,
						padding: [0, 0, 0, 0],
					},
					b: {
						fontSize: 16,
						fontWeight: 600,
						width: 80,
						align: 'right',
						padding: [0, 0, 0, 10],
					},
				},
			},
			formatter: (name: string) => {
				const data1 = opts.data.find((a: any) => a.name === name)
				let zw = ''
				for (
					let i = String(data1.value).length + name.length * 1.2;
					i < 12;
					i++
				) {
					zw += '\t\t'
				}
				return ` ${name}{a|${zw}${data1.value}${opts.unit}} {b|${(
					(data1.value * 100) /
					sum
				).toFixed(2)}%}\t\t\t\t`
			},
			...opts.legend,
		},
		series: [
			{
				name: opts.title,
				type: 'funnel',
				gap: 20,
				min: 0,
				max: 1100,
				bottom: 100,
				minSize: '10%',
				maxSize: '100%',
				sort: 'descending',
				labelLine: {
					show: false,
				},
				label: {
					show: false,
				},
				data: opts.data,
				emphasis: {
					disabled: true,
				},
				itemStyle: {
					borderColor: 'rgba(227,232,255,1)',
					borderRadius: 10,
					borderWidth: 10,
					/* shadowBlur: 1,
                    shadowOffsetX: 0,
                    shadowOffsetY:10,
                    shadowColor: 'rgba(227,232,255,0.8)' */
				},
			},
		],
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
			seriesIndex: 0,
			dataIndex: index,
		})
		myChart.dispatchAction({
			type: 'showTip',
			seriesIndex: 0,
			dataIndex: index,
		})
		if (timer) {
			clearTimeout(timer)
		}
		timer = setTimeout(() => {
			index++
			fn()
		}, 1000)
	}
	// fn();
}
</script>