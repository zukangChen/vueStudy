<template>
	<div class="comm-chart" ref="chart"></div>
</template>
<script setup lang="ts">
import { shallowRef, onMounted, watch, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { color, fontColor } from './params'
import { fontSize, fontSizeWidth } from '@/utils/rem'
import noData from '@/assets/header/noData.png'
import { throttle } from '@/utils'
const emits = defineEmits(['getCurrentItem'])
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
watch(
	() => props.data!,
	throttle((_o, n: any) => {
		opts = {
			...opts,
			...JSON.parse(JSON.stringify(n)),
		}
		init()
	}),
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
	}
})
const init = () => {
	if ((!opts.data.length || !opts.names.length) && !myChart) {
		chart.value.innerHTML = `<div class="noData"><img src="${noData}"><span class="noDataText">暂无数据</span></div>`
		return
	}

	if (myChart) {
		myChart.clear()
	} else {
		myChart = echarts.init(chart.value)
		window.addEventListener('resize', () => {
			myChart.resize()
		})
	}

	if (opts.type === 2) {
		initChat2()
	} else if (opts.type === 3) {
		// initChat3();
	} else if (opts.type === 4) {
		// initChat4();
	} else {
		initChat()
	}
}
const initChat = () => {
	const len = opts.names.length
	let end = len
	if (opts.limit) {
		end = len >= opts.limit ? opts.limit : len
	}
	if (opts.limitMaxMin && opts.yAxis.length && opts.yAxis[0]) {
		let yAxisData = []
		opts.data.map((a) => {
			if (a.yAxisIndex == 0 || !a.yAxisIndex) {
				yAxisData = yAxisData.concat(a.data)
			}
		})
		opts.yAxis[0].max = Number(
			(
				yAxisData.reduce((s, a) => (s > Number(a) ? s : Number(a)), 0) *
				(opts.limitMax || 1.1)
			).toFixed(2)
		)
		opts.yAxis[0].min = Number(
			(
				yAxisData.reduce(
					(s, a) => (s < Number(a) ? s : Number(a)),
					Number(yAxisData[0])
				) * (opts.limitMin || 0.95)
			).toFixed(2)
		)
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
			0
		)
		opts.yAxis[1].min = (
			yAxisData.reduce(
				(s, a) => (s < Number(a) ? s : Number(a)),
				Number(yAxisData[0])
			) -
			opts.yAxis[1].max * 0.05
		).toFixed(0)
	}
	/*  if(opts.yAxis.length&&opts.yAxis[1]){
            opts.yAxis[1].max =  function (value) {
                return value.max;
            }
             opts.yAxis[1].min =  function (value) {
                return value.min - value.max*0.1;
            }
        }
         if(opts.yAxis.length&&opts.yAxis[2]){
            opts.yAxis[2].max =  function (value) {
                return value.max;
            }
             opts.yAxis[2].min =  function (value) {
                return value.min - value.max*0.1;
            }
        } */
	const options = {
		color: opts.color,
		grid: {
			bottom: fontSizeWidth(35),

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
				const newData = data.filter(
					(i: any) => i.value !== null && i.value !== undefined
				)
				newData.map((a: any) => {
					str += `${a.marker}<span style="color:#fff"><span style="width:5em;display:inline-block;">${a.seriesName}</span>`
					str += `<span style="width:10em;padding-right:10px;text-align:right;display:inline-block;font-weight:600">${
						a.value
					}${opts.data[a.seriesIndex].unit}</span></span><br>`
				})
				return str
			},
			...opts.tooltips,
		},
		dataZoom: {
			start: 0,
			type: opts.limit ? 'slider' : 'inside',
			startValue: 0,
			endValue: opts.limit ? end : len,
			bottom: '-5%',
			moveHandleStyle: {
				borderWidth: 10,
				color: '#7d74fa',
			},
			...opts.dataZoom,
		},
		xAxis: {
			type: 'category',
			data: opts.names,
			axisTick: {
				show: false,
			},
			axisLabel: {
				show: true,
				fontSize: fontSizeWidth(12),
				formatter: function (value: string) {
					const len = value.length
					return len > 6 ? value.slice(0, 6) + '...' : value
				},
			},
			...opts.xAxis,
			...opts.mYxAxis,
		},
		yAxis: opts.yAxis || {
			type: 'value',
			axisLabel: {
				fontSize: fontSizeWidth(14),
			},
			name: `单位：${opts.unit}`,
		},
		legend: {
			right: fontSizeWidth(50),
			top: fontSizeWidth(5),
			itemGap: fontSizeWidth(15),
			itemHeight: fontSizeWidth(15),
			itemWidth: fontSizeWidth(15),
			textStyle: {
				fontSize: fontSizeWidth(14),
			},
			...opts.legend,
		},
		series: opts.data.map((a: any) => {
			return {
				barWidth: opts.barWidth || fontSizeWidth(15),
				symbolSize: 0,
				labelLine: {
					show: false,
				},
				label: {
					show: false,
				},
				...a,
				emphasis: {
					itemStyle: {
						shadowBlur: 0,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)',
					},
				},
				backgroundStyle: {
					color: 'rgba(180, 180, 180, 0.2)',
					shadowColor: 'rgba(180, 180, 180, 1)',
				},

				itemStyle: {
					borderColor: (a.itemStyle && a.itemStyle.borderColor) || '#fff',
					borderWidth: (a.itemStyle && a.itemStyle.borderWidth) || 0,
					borderRadius: opts.borderRadius || [6, 6, 0, 0],
					color: a.color || 'auto',
				},

				...opts.seriesOpts,
			}
		}),
	}
	// 地勘保有权益图表特殊逻辑
	if (opts.xAxis) {
		options.xAxis = opts.xAxis
	}
	if (opts.customYAxis) {
		options.yAxis = props.data.customYAxis
	}
	if (opts.customDataZoom) {
		options.dataZoom = opts.customDataZoom
	}
	myChart.setOption(options)
	myChart.off('click')
	myChart.on('click', function (params: any) {
		emits('getCurrentItem', params)
	})
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
	const len = opts.names.length
	let end = len
	if (opts.limit) {
		end = len >= opts.limit ? opts.limit : len
	}
	if (opts.limitMaxMin && opts.yAxis.length && opts.yAxis[0]) {
		let yAxisData = []
		opts.data.map((a) => {
			if (a.yAxisIndex == 0 || !a.yAxisIndex) {
				yAxisData = yAxisData.concat(a.data)
			}
		})
		opts.yAxis[0].max = Number(
			(
				yAxisData.reduce((s, a) => (s > Number(a) ? s : Number(a)), 0) *
				(opts.limitMax || 1.1)
			).toFixed(2)
		)
		opts.yAxis[0].min = Number(
			(
				yAxisData.reduce(
					(s, a) => (s < Number(a) ? s : Number(a)),
					Number(yAxisData[0])
				) * (opts.limitMin || 0.95)
			).toFixed(2)
		)
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
			0
		)
		opts.yAxis[1].min = (
			yAxisData.reduce(
				(s, a) => (s < Number(a) ? s : Number(a)),
				Number(yAxisData[0])
			) -
			opts.yAxis[1].max * 0.05
		).toFixed(0)
	}
	/*  if(opts.yAxis.length&&opts.yAxis[1]){
            opts.yAxis[1].max =  function (value) {
                return value.max;
            }
             opts.yAxis[1].min =  function (value) {
                return value.min - value.max*0.1;
            }
        }
         if(opts.yAxis.length&&opts.yAxis[2]){
            opts.yAxis[2].max =  function (value) {
                return value.max;
            }
             opts.yAxis[2].min =  function (value) {
                return value.min - value.max*0.1;
            }
        } */
	const options = {
		color: opts.color,
		grid: {
			bottom: fontSizeWidth(35),

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
				const newData = data.filter(
					(i: any) => i.value !== null && i.value !== undefined
				)
				newData.map((a: any) => {
					str += `${a.marker}<span style="color:#fff"><span style="width:5em;display:inline-block;">${a.seriesName}</span>`
					str += `<span style="width:10em;padding-right:10px;text-align:right;display:inline-block;font-weight:600">${
						a.value
					}${opts.data[a.seriesIndex].unit}</span></span><br>`
				})
				return str
			},
			...opts.tooltips,
		},
		dataZoom: {
			start: 0,
			type: opts.limit ? 'slider' : 'inside',
			startValue: 0,
			endValue: opts.limit ? end : len,
			bottom: '-5%',
			moveHandleStyle: {
				borderWidth: 10,
				color: '#7d74fa',
			},
			...opts.dataZoom,
		},
		xAxis: {
			type: 'category',
			data: opts.names,
			axisTick: {
				show: false,
			},
			axisLabel: {
				show: true,
				interval: 0,
				fontSize: fontSizeWidth(12),
				formatter: function (value, index) {
					// 判断是否是第一个或最后一个类目
					if (index === 0 || index === opts.names.length - 1) {
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
						fontSize: fontSizeWidth(12),
					},
				},
			},
			...opts.xAxis,
		},
		yAxis: opts.yAxis || {
			type: 'value',
			axisLabel: {
				fontSize: fontSizeWidth(14),
			},
			name: `单位：${opts.unit}`,
		},
		legend: {
			right: fontSizeWidth(50),
			top: fontSizeWidth(5),
			itemGap: fontSizeWidth(15),
			itemHeight: fontSizeWidth(15),
			itemWidth: fontSizeWidth(15),
			textStyle: {
				fontSize: fontSizeWidth(14),
			},
			...opts.legend,
		},
		series: opts.data.map((a: any) => {
			return {
				barWidth: opts.barWidth || fontSizeWidth(15),
				symbolSize: 0,
				labelLine: {
					show: false,
				},
				label: {
					show: false,
				},
				...a,
				emphasis: {
					itemStyle: {
						shadowBlur: 0,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)',
					},
				},
				backgroundStyle: {
					color: 'rgba(180, 180, 180, 0.2)',
					shadowColor: 'rgba(180, 180, 180, 1)',
				},

				itemStyle: {
					borderColor: (a.itemStyle && a.itemStyle.borderColor) || '#fff',
					borderWidth: (a.itemStyle && a.itemStyle.borderWidth) || 0,
					borderRadius: opts.borderRadius || [6, 6, 0, 0],
					color: a.color || 'auto',
				},

				...opts.seriesOpts,
			}
		}),
	}
	if (opts.customYAxis) {
		options.yAxis = props.data.customYAxis
	}
	if (opts.customDataZoom) {
		options.dataZoom = opts.customDataZoom
	}
	myChart.setOption(options)
	myChart.off('click')
	myChart.on('click', function (params: any) {
		emits('getCurrentItem', params)
	})
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
</script>