<template>
	<div class="comm-chart">
		<div class="container" ref="chartRef"></div>
		<comm type="downloadChartImg" :chart="chart" v-if="imageName" :name="imageName"></comm>
	</div>
</template>
<script setup lang="ts">
import { shallowRef, onMounted, watch, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { color, fontColor } from './params'
import noData from '@/assets/header/noData.png'
import prevImg from './images/prev.png'
import nextImg from './images/next.png'
import { throttle, strlen } from '@/utils'
import { fontSizeWidth } from '@/utils/rem'

const emits = defineEmits(['getCurrentItem'])
const chartRef = shallowRef(null),
	chart = shallowRef(null)
let myChart: any = null
const props = defineProps({
	data: {
		type: Object,
	},
	imageName: {
		type: String,
	},
})
let opts: any = {
	color: color('linear'),
	fontColor: fontColor,
	getCurrentItem: () => {},
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
	{ deep: true },
)
onMounted(() => {
	init()
	chart.value = myChart
})
let isStop = false
onUnmounted(() => {
	isStop = true
	if (myChart) {
		myChart.dispose()
	}
})
const init = () => {
	if (
		(!opts.data.length || ([6, 9].includes(opts.type) && !opts.names.length)) &&
		!myChart
	) {
		chartRef.value.innerHTML = `<div class="noData"><img src="${noData}"><span class="noDataText">暂无数据</span></div>`
		return
	} else if (!opts.data.length) {
		myChart.clear()
		chartRef.value.innerHTML = `<div class="noData"><img src="${noData}"><span class="noDataText">暂无数据</span></div>`
		return
	}
	if (myChart) {
		myChart.clear()
	} else {
		chartRef.value.innerHTML = ''
		myChart = echarts.init(chartRef.value)
		window.addEventListener(
			'resize',
			() => {
				myChart.resize()
			},
			false,
		)
	}
	if (opts.type === 2) {
		initChat2()
	} else if (opts.type === 3) {
		initChat3()
	} else if (opts.type === 4) {
		initChat4()
	} else if (opts.type === 5) {
		initChat5()
	} else if (opts.type === 6) {
		initChat6()
	} else if (opts.type === 7) {
		initChat7()
	} else if (opts.type === 8) {
		initChat8()
	} else if (opts.type === 9) {
		initChat9()
	} else if (opts.type === 10) {
		initChat10()
	} else if (opts.type === 11) {
		initChat11()
	} else if (opts.type === 12) {
		initChat12() // 阶梯瀑布图
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
			trigger: 'item',
			backgroundColor: 'rgba(9, 10, 42, 0.56)',
			textStyle: {
				color: '#fff',
				fontSize: fontSizeWidth(12),
			},
			confine: true,
			position: 'top',
			formatter: (data: any) => {
				return `<span style="padding-bottom:${fontSizeWidth(20)}px">${
					data.name
				}</span><br>${data.marker.replace(
					/10px/gi,
					fontSizeWidth(10) + 'px',
				)} <span style="color:#fff">${
					opts.tipName
				}<span style="width:${fontSizeWidth(
					100,
				)}px;text-align:right;display:inline-block;font-weight:600">${
					data.value
				}${opts.unit}</span></span>`
			},
			...opts.tooltip,
		},
		dataZoom: {
			start: 0,
			type: 'inside',

			...opts.dataZoom,
		},
		xAxis: {
			type: 'category',
			data: opts.data.map((a: any) => a.name),
			axisTick: {
				show: false,
			},
			nameTextStyle: {
				fontSize: fontSizeWidth(12),
			},
			axisLabel: {
				fontSize: fontSizeWidth(12),
			},
			...opts.xAxis,
		},
		yAxis: {
			type: 'value',
			nameTextStyle: {
				fontSize: fontSizeWidth(12),
			},
			name: `单位：${opts.unit}`,
			axisLabel: {
				fontSize: fontSizeWidth(12),
			},
			...opts.yAxis,
		},
		legend: {
			orient: 'vertical',
			right: fontSizeWidth(50),
			top: fontSizeWidth(10),
			itemGap: fontSizeWidth(15),
			itemHeight: fontSizeWidth(15),
			itemWidth: fontSizeWidth(15),
			textStyle: {
				fontSize: fontSizeWidth(12),
			},
			pageIcons: {
				vertical: [`image://${prevImg}`, `image://${nextImg}`],
			},
			...opts.legend,
		},
		series: [
			{
				name: opts.title,
				type: 'bar',
				barWidth: fontSizeWidth(16),
				labelLine: {
					show: false,
				},
				label: {
					show: false,
				},
				data: opts.data,
				emphasis: {
					itemStyle: {
						shadowBlur: 0,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)',
					},
				},
				itemStyle: {
					borderColor: '#fff',
					borderRadius: [4, 4, 0, 0],
				},
			},
		],
	}
	myChart.setOption(options)
	let index = 0,
		timer: any = null
	const fn = () => {
		if (timer) {
			clearTimeout(timer)
		}
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
		timer = setTimeout(() => {
			index++
			fn()
		}, 1000)
	}
	// fn();
}
const initChat2 = () => {
	const left =
		opts.names.reduce((s, a) => (s > strlen(a) ? s : strlen(a)), 0) * 6.5
	const options = {
		color: opts.color,
		grid: {
			left: fontSizeWidth(left < 90 ? 90 : left),
			...opts.grid,
		},
		tooltip: {
			trigger: 'axis',
			backgroundColor: 'rgba(9, 10, 42, 0.56)',
			textStyle: {
				color: '#fff',
				fontSize: fontSizeWidth(12),
			},
			confine: true,
			formatter: (data: any) => {
				let str = `<span style="padding-bottom:${fontSizeWidth(30)}px">${
					data[0].name
				}</span><br>`
				data
					.filter((a) => a.seriesName != 'total')
					.map((a: any, index: number) => {
						str += `${a.marker.replace(/10px/gi, fontSizeWidth(10) + 'px')}
						<span style="font-size: ${fontSizeWidth(14)}px;">
							<span style="display:inline-block;width:${fontSizeWidth(120)}px;">${
							a.seriesName
						}</span>
							<span style="width:${fontSizeWidth(60)}px;font-size: ${fontSizeWidth(
							12,
						)}px;text-align:right;display:inline-block;font-weight:600;padding:${fontSizeWidth(
							8,
						)}px ${fontSizeWidth(12)}px  ${fontSizeWidth(8)}px ${fontSizeWidth(
							12,
						)}px;">${a.value}${opts.unit}</span>
						</span>`
						if ((index + 1) % 2 === 0) {
							str += '<br>'
						}
					})
				return str
			},
			...opts.tooltip,
		},
		dataZoom: {
			show: opts.names.length > 11,
			type: 'slider',
			right: fontSizeWidth(0),
			zoomLock: true,
			startValue: 100,
			endValue: 90,
			width: fontSizeWidth(25),
			brushSelect: false,
			showDetail: false,
			zoomOnMouseWheel: true,
			yAxisIndex: 0,
			...opts.dataZoom,
		},
		xAxis: {
			type: 'value',
			axisTick: {
				show: false,
			},
			nameTextStyle: {
				fontSize: fontSizeWidth(12),
			},
			axisLabel: {
				fontSize: fontSizeWidth(12),
			},
			...opts.xAxis,
		},
		yAxis: {
			type: 'category',
			data: opts.names,
			axisTick: {
				show: false,
			},
			nameTextStyle: {
				fontSize: fontSizeWidth(12),
			},
			axisLabel: {
				fontSize: fontSizeWidth(12),
			},
			...opts.yAxis,
		},
		legend: {
			left: 'center',
			top: '3%',
			itemGap: fontSizeWidth(15),
			itemHeight: fontSizeWidth(15),
			itemWidth: fontSizeWidth(15),
			textStyle: {
				fontSize: fontSizeWidth(12),
			},
			pageIconSize: fontSizeWidth(15),
			data: opts.data.map((a) => a.name),
			pageIcons: {
				vertical: [`image://${prevImg}`, `image://${nextImg}`],
				horizontal: [`image://${prevImg}`, `image://${nextImg}`],
			},
			...opts.legend,
		},
		series: (() => {
			return opts.data.map((a) => {
				return {
					type: 'bar',
					stack: 'total',
					barWidth: fontSizeWidth(16),
					labelLine: {
						show: false,
					},
					label: {
						show: true,
						formatter: function () {
							return `{a|}`
						},
						rich: {
							a: {
								width: fontSizeWidth(840),
								height: fontSizeWidth(40),
								fontSize: fontSizeWidth(20),
								fontWeight: 600,
								color: '#5B6276',
								backgroundColor: 'rgba(0,0,0,0)',
							},
						},
					},
					data: a.value,
					emphasis: {
						itemStyle: {
							shadowBlur: 0,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)',
						},
					},
					...a,
				}
			})
		})().concat({
			name: 'total',
			type: 'bar',
			stack: 'total',
			barWidth: fontSizeWidth(16),
			labelLine: {
				show: false,
			},
			emphasis: {
				itemStyle: {
					shadowBlur: 0,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)',
				},
			},
			label: {
				show: true,
				position: 'right',
				fontSize: fontSizeWidth(12),
				formatter: (a) => {
					let sum = 0
					opts.data.map((b) => {
						if (typeof b.value[a.dataIndex] === 'object') {
							sum += b.value[a.dataIndex].value
						} else {
							sum += b.value[a.dataIndex]
						}
					})
					return sum + opts.unit
				},
			},
			data: opts.data[0].value.map((a) => 0),
		}),
	}
	myChart.setOption(options)
	myChart.on('legendselectchanged', (a) => {
		options.series[options.series.length - 1].label.formatter = (b) => {
			let sum = 0
			opts.data
				.filter((c) => a.selected[c.name])
				.map((c) => {
					sum += c.value[b.dataIndex]
				})
			return sum + opts.unit
		}
		myChart.setOption(options)
	})
	myChart.off('click')
	myChart.on('click', function (params: any) {
		emits('getCurrentItem', params)
	})
}
const initChat3 = () => {
	const sum = opts.data.reduce((s: number, a: any) => s + a.value[0], 0)
	const options = {
		color: opts.color,
		grid: {
			left: -10,
			right: -10,
		},
		dataZoom: {
			start: 0,
			type: 'inside',
		},
		tooltip: {
			trigger: 'axis',
			backgroundColor: 'rgba(9, 10, 42, 0.56)',
			textStyle: {
				color: '#fff',
			},
			position: 'top',
			formatter: (data: any) => {
				let str = `${data[0].name}<br>`
				data.map((a, index) => {
					str += `${a.marker}<span style="color:#fff">${a.seriesName}<span style="width:70px;padding-right:20px;text-align:right;display:inline-block;font-weight:600">${a.value}${opts.unit}</span></span>`
					if ((index + 1) % 2 === 0) {
						str += '<br>'
					}
				})
				return str
			},
		},
		xAxis: {
			show: false,
			type: 'value',
			axisTick: {
				show: false,
			},
		},
		yAxis: {
			show: false,
			type: 'category',
			data: opts.names,
			axisTick: {
				show: false,
			},
		},
		legend: {
			show: false,
			left: 'center',
			top: '0',
			itemGap: 15,
			itemHeight: 15,
			itemWidth: 15,
			...opts.legend,
		},
		series: (() => {
			return opts.data.map((a: any) => {
				return {
					name: a.name,
					type: 'bar',
					stack: 'total',
					labelLine: {
						show: false,
					},
					label: {
						show: true,
						color: opts.fontColor,
						position: 'insideLeft',
						align: 'left',
						padding: [0, 0, 0, 5],
						rich: {
							a: {
								color: '#5B6276',
								lineHeight: 70,
								verticalAlign: 'top',
							},
							b: {
								fontSize: 12,
								fontWeight: 600,
								align: 'left',
							},
							c: {
								fontSize: 12,
								fontWeight: 600,
								align: 'right',
								padding: [0, 0, 0, 5],
							},
						},
						formatter: (data: any) => {
							return `{a|${data.seriesName}}\n{b|${data.value}${
								opts.unit
							}}{c|${((data.value * 100) / sum).toFixed(2)}%}`
						},
					},
					itemStyle: {
						/*    borderColor:"#fff",
                            borderWidth:10,
                            borderRadius:4, */
					},
					data: a.value,
					emphasis: {
						disabled: true,
					},
				}
			})
		})(),
	}
	myChart.setOption(options)
	let index = 0,
		timer: any = null
	const fn = () => {
		if (timer) {
			clearTimeout(timer)
		}
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
		timer = setTimeout(() => {
			index++
			fn()
		}, 1000)
	}
	// fn();
}
const initChat4 = () => {
	const options = {
		color: opts.color,
		grid: {
			left: 60,
			right: 20,
		},
		dataZoom: {
			start: 0,
			type: 'inside',
		},
		tooltip: {
			trigger: 'axis',
			backgroundColor: 'rgba(9, 10, 42, 0.56)',
			textStyle: {
				color: '#fff',
			},
			position: 'top',
			formatter: (data: any) => {
				let str = `${data[0].name}<br>`
				data.map((a: any, index: number) => {
					str += `${a.marker}<span style="color:#fff"><span style="width:5em;display:inline-block;">${a.seriesName}</span>`
					str += `<span style="width:70px;padding-right:10px;text-align:right;display:inline-block;font-weight:600">${a.value}${opts.data[index].unit}</span></span><br>`
				})
				return str
			},
		},
		xAxis: {
			show: true,
			type: 'value',
			axisTick: {
				show: false,
			},
			axisLine: {
				show: false,
			},
			splitLine: {
				show: false,
			},
			axisLabel: {
				formatter: function (value: any) {
					return value < 0 ? -value : value
				},
			},
			max:
				opts.data[1].data.reduce(
					(s: number, t: any) => (s > Math.abs(t) ? s : Math.abs(t)),
					0,
				) + 10,
			min:
				-opts.data[0].data.reduce(
					(s: number, t: any) => (s > Math.abs(t) ? s : Math.abs(t)),
					0,
				) - 10,
		},
		yAxis: [
			{
				show: true,
				type: 'category',
				axisTick: {
					show: false,
				},
				axisLine: {
					show: false,
				},
				splitLine: {
					show: false,
				},
				...opts.yAxis,
			},
			{
				show: true,
				type: 'category',
				position: 'left',
				axisTick: {
					show: false,
				},
				axisLine: {
					show: false,
				},
				splitLine: {
					show: false,
				},
				name: `单位：${opts.data[0].unit}`,
			},
			{
				show: true,
				type: 'category',
				position: 'right',
				right: 20,
				axisTick: {
					show: false,
				},
				axisLine: {
					show: false,
				},
				splitLine: {
					show: false,
				},
				nameTextStyle: {
					padding: [0, 100, 0, 0],
				},
				name: `单位：${opts.data[1].unit}`,
			},
		],
		legend: {
			show: true,
			left: '50%',
			top: '20',
			itemGap: 15,
			itemHeight: 15,
			itemWidth: 15,
			...opts.legend,
		},
		series: (() => {
			return opts.data
				.map((a: any, key: number) => {
					return {
						type: 'bar',
						stack: 'total',
						barWidth: '20px',
						labelLine: {
							show: false,
						},
						label: {
							show: false,
						},
						...a,
						data: a.data.map((b: any) => {
							return key == 0 ? -b : b
						}),
						emphasis: {
							disabled: true,
						},
					}
				})
				.concat(
					opts.data.map((a: any, key: number) => {
						const max = a.data.reduce(
							(s: number, t: any) => (s > Math.abs(t) ? s : Math.abs(t)),
							0,
						)
						return {
							type: 'bar',
							stack: 'total',
							barWidth: '20px',
							tooltip: {
								show: false,
							},
							labelLine: {
								show: false,
							},
							label: {
								show: false,
							},
							...a,
							data: a.data.map(() => {
								return key == 0 ? -max : max
							}),
							itemStyle: {
								color: 'rgba(180, 180, 180, 0.2)',
							},
						}
					}),
				)
		})(),
	}
	myChart.setOption(options)
	let index = 0,
		timer: any = null
	const fn = () => {
		if (timer) {
			clearTimeout(timer)
		}
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

		timer = setTimeout(() => {
			index++
			fn()
		}, 1000)
	}
	// fn();
}
const initChat5 = () => {
	const options = {
		color: opts.color,
		grid: {
			left: 60,
			right: 20,
			...opts.grid,
		},
		dataZoom: {
			start: 0,
			type: 'inside',
		},
		tooltip: {
			trigger: 'axis',
			backgroundColor: 'rgba(9, 10, 42, 0.56)',
			textStyle: {
				color: '#fff',
				fontSize: fontSizeWidth(18),
			},
			confine: true,
			formatter: (data: any) => {
				let str = `${data[0].name}<br>`
				data.map((a: any, index: number) => {
					if (a.seriesName != '背景') {
						str += `${
							a.marker
						}<span style="color:#fff"><span style="width:7em;display:inline-block;font-size:${fontSizeWidth(
							18,
						)}px;">${a.seriesName}</span>`
						str += `<span style="padding-right:10px;text-align:right;display:inline-block;font-weight:600;font-size:${fontSizeWidth(
							18,
						)}px;">${opts.data[index].data[a.dataIndex].sign}${a.value}${
							opts.data[index].unit
						}</span></span><br>`
					}
				})
				return str
			},
		},
		xAxis: [
			{
				show: false,
				type: 'value',
				min: 0,
				axisTick: {
					show: false,
				},
				axisLine: {
					show: false,
				},
				splitLine: {
					show: false,
				},
			},
			{
				show: false,
				type: 'value',
				axisTick: {
					show: false,
				},
				axisLine: {
					show: false,
				},
				splitLine: {
					show: false,
				},
				max: 1,
			},
		],
		yAxis: [
			{
				gridIndex: 0,
				type: 'category',
				inverse: false,
				axisTick: { show: false },
				axisLine: { show: false },
				splitLine: { show: false },
				position: 'left',
				...opts.yAxis,
			},
		],
		legend: {
			show: true,
			top: '20',
			itemGap: 15,
			itemHeight: 15,
			itemWidth: 15,
			...opts.legend,
		},
		series: (() => {
			return opts.data
				.map((a: any, key: number) => {
					return {
						z: 1,
						type: 'bar',
						barWidth: fontSizeWidth(12),
						labelLine: {
							show: false,
						},
						label: {
							show: true,
							position: 'right',
							color: '#0B0F5A',
							fontSize: fontSizeWidth(14),
							fontWeight: 'lighter',
							fontFamily: 'DIN-Bold',
						},
						emphasis: {
							disabled: true,
						},
						...a,
					}
				})
				.concat([
					{
						z: 0,
						name: '背景',
						type: 'bar',
						xAxisIndex: 1,
						barWidth: fontSizeWidth(18),
						barGap: '-130%',
						data: opts.data[0].data.map(() => {
							return 1
						}),
						itemStyle: {
							color: '#d7e0fe',
						},
					},
				])
		})(),
	}
	myChart.setOption(options)
}
const initChat6 = () => {
	const options = {
		names: opts.names,
		title: opts.title,
		legend: {
			top: 0,
			left: 'center',
		},
		tooltip: {},
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
		//你的代码
		grid: [
			{
				show: false,
				left: '0%',
				top: '13%',
				bottom: '10%',
				right: '50%',
				containLabel: true,
				width: '48%',
			},
			{
				show: false,
				top: '13%',
				left: '48%',
				bottom: '10%',
				containLabel: true,
				width: '48%',
			},
		],
		yAxis: [
			{
				//左侧bar
				type: 'category',
				gridIndex: 0,
				axisLabel: {
					show: true,
					fontSize: fontSizeWidth(16),
					fontWeight: 600,
				},
				axisLine: {
					show: false,
				},
				axisTick: {
					show: false,
				},
				splitLine: {
					show: false,
				},
				data: JSON.parse(JSON.stringify(opts.names)).reverse(),
			},
			{
				//右侧bar 注意gridIndex grid[0,1]
				type: 'category',
				gridIndex: 1,
				position: 'right',
				show: false,
				axisLabel: {
					show: false,
					fontSize: fontSizeWidth(16),
					fontWeight: 600,
				},
				axisLine: {
					show: false,
				},
				axisTick: {
					show: false,
				},
				splitLine: {
					show: false,
				},
				data: JSON.parse(JSON.stringify(opts.names)).reverse(),
			},

			// 使用bar markLine绘制虚线
			// 默认虚线实在柱子之上，需要在柱子之下 加两条y轴单独绑定不影响bar的剧中显示问题
			{
				//用于虚线的 y轴1
				type: 'category',
				gridIndex: 0,
				name: 'leg_left',
				show: false, //隐藏 用于柱子的
				position: 'left',
				data: ['a', 'b', 'c'],
			},
			{
				//用于虚线的 y轴2
				type: 'category',
				gridIndex: 1,
				position: 'right',
				show: false,
				data: ['aa', 'bb', 'cc'],
			},
		],
		xAxis: [
			{
				type: 'value',
				gridIndex: 0,
				max: function (value) {
					return Math.floor(value.max * 1.2)
				},
				splitNumber: 3,
				// interval: '0.1%',
				inverse: true, //x轴反方向开始让左侧 从右向左开始
				axisLine: {
					show: true,
					lineStyle: {
						color: '#5B6276',
					},
				},
				splitLine: {
					show: false,
				},
				axisLabel: {
					color: '#5B6276',
					fontSize: fontSizeWidth(12),
					fontWeight: 600,
				},
			},
			{
				type: 'value',
				gridIndex: 1,
				max: function (value) {
					return Math.floor(value.max * 1.2)
				},
				splitNumber: Math.max(...opts.data[1].data) > 100000 ? 2 : 3,
				axisLine: {
					show: true,
					lineStyle: {
						color: '#5B6276',
					},
				},
				splitLine: {
					show: false,
				},
				axisLabel: {
					color: '#5B6276',
					fontSize: fontSizeWidth(12),
					fontWeight: 600,
				},
			},
		],
		// ...opts,
		series: opts.data.map((item, index) => {
			return {
				...item,
				label: {
					show: true,
					position: 'top',
					offset: [index === 0 ? fontSizeWidth(-20) : fontSizeWidth(20), 0],
				},
			}
		}),
	}
	console.log('options', options)
	delete options.data
	myChart.setOption(options)
}
const initChat7 = () => {
	const options = {
		color: opts.color,
		grid: {
			left: '20%',
			...opts.grid,
		},
		tooltip: {
			trigger: 'axis',
			backgroundColor: 'rgba(9, 10, 42, 0.56)',
			textStyle: {
				color: '#fff',
				fontSize: fontSizeWidth(18),
			},
			position: 'top',
			formatter: (data: any) => {
				let str = `${data[0].name}<br>`
				data.map((a: any, index: number) => {
					if (a.seriesName.indexOf('series') === -1) {
						str += `${a.marker}<span style="color:#fff">${a.seriesName}<span style="width:90px;padding-right:20px;text-align:right;display:inline-block;font-weight:600">${a.value}${opts.unit}</span></span>`
						if ((index + 1) % 2 === 0) {
							str += '<br>'
						}
					}
				})
				return str
			},
			...opts.tooltip,
		},
		dataZoom: {
			start: 0,
			type: 'inside',
		},
		xAxis: [
			{
				type: 'value',
				axisTick: {
					show: false,
				},
				axisLabel: {
					fontWeight: 'bold',
					fontSize: fontSizeWidth(12),
					color: '#5B6276',
				},
				...opts.xAxis,
			},
			{
				show: false,
				type: 'value',
				axisTick: {
					show: false,
				},
				splitLine: {
					show: false,
				},
				max: 1,
			},
		],
		yAxis: {
			type: 'category',
			data: opts.names,
			axisTick: {
				show: false,
			},
			axisLabel: {
				fontWeight: 'bold',
				fontSize: fontSizeWidth(16),
				color: '#5B6276',
			},
			...opts.yAxis,
		},
		legend: {
			left: 'center',
			top: '3%',
			itemGap: fontSizeWidth(15),
			itemHeight: fontSizeWidth(15),
			itemWidth: fontSizeWidth(15),
			textStyle: {
				fontSize: fontSizeWidth(16),
			},
			...opts.legend,
		},
		series: (() => {
			return opts.data
				.map((a) => {
					return {
						name: a.name,
						type: 'bar',
						barWidth: 15,
						barGap: '-50%',
						labelLine: {
							show: false,
						},
						label: {
							show: false,
							color: '#5B6276',
							fontSize: fontSizeWidth(12),
							...a.label,
						},
						data: a.value,
						emphasis: {
							itemStyle: {
								shadowBlur: 0,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)',
							},
						},
						zlevel: 2,
					}
				})
				.concat([
					{
						type: 'bar',
						barWidth: 15,
						barGap: '-100%',
						xAxisIndex: 1,
						labelLine: {
							show: false,
						},
						legend: {
							show: false,
						},
						label: {
							show: false,
						},
						emphasis: {
							disabled: true,
						},
						toolTip: {
							show: false,
						},
						data: opts.data[0].value.map((a) => {
							return {
								value: 1,
								itemStyle: {
									fontSize: fontSizeWidth(12),
									color: 'rgba(235, 234, 252, 0)',
								},
							}
						}),
						zlevel: 1,
					},
				])
		})(),
	}
	myChart.setOption(options)
	let index = 0,
		timer: any = null
	const fn = () => {
		if (timer) {
			clearTimeout(timer)
		}
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
		timer = setTimeout(() => {
			index++
			fn()
		}, 1000)
	}
	myChart.off('click')
	myChart.on('click', function (params: any) {
		let isSelect = false
		options.series[0].data = options.series[0].data.map((a, index) => {
			let value = a
			if (a.value) {
				value = a.value
			}
			if (
				params.dataIndex == index &&
				a.itemStyle &&
				a.itemStyle.color == '#7B89FF'
			) {
				isSelect = true
			}
			return {
				value,
				itemStyle:
					params.dataIndex == index && !isSelect
						? {
								color: '#7B89FF',
						  }
						: {
								color: opts.color[0],
						  },
			}
		})
		options.series[1].data = options.series[1].data.map((a, index) => {
			return {
				value: 1,
				itemStyle:
					params.dataIndex == index && !isSelect
						? {
								color: 'rgba(235, 234, 252, 1)',
						  }
						: {
								color: 'rgba(235, 234, 252, 0)',
						  },
			}
		})
		options.yAxis.data = options.yAxis.data.map((a) => {
			let value = a
			if (a.value) {
				value = a.value
			}
			return {
				value: value,
				textStyle:
					(value == params.value || value == params.name) && !isSelect
						? {
								color: 'rgb(11, 15, 90)',
								fontWeight: '800',
								fontSize: fontSizeWidth(20),
						  }
						: {
								color: '#5B6276',
								fontWeight: null,
								fontSize: fontSizeWidth(16),
						  },
			}
		})
		myChart.setOption(options)
		emits('getCurrentItem', isSelect ? {} : params)
	})
	// fn();
}

const initChat8 = () => {
	const defaultColor = [
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
					color: '#DEE2FF', // 0% 处的颜色
				},
				{
					offset: 1,
					color: '#AFBDFF', // 100% 处的颜色
				},
			],
			global: false, // 缺省为 false
		},
	]
	const options = {
		backgroundColor: '#fff',
		grid: {
			top: fontSizeWidth(20),
			left: fontSizeWidth(50),
			right: fontSizeWidth(20),
			bottom: fontSizeWidth(85),
			...opts.grid,
		},
		tooltip: {
			trigger: 'axis',
			backgroundColor: 'rgba(9, 10, 42, 0.56)',
			textStyle: {
				color: '#fff',
				fontSize: fontSizeWidth(18),
			},
			position: 'top',
			formatter: (data: any) => {
				let str = `${data[0].name}<br>`
				data.map((a: any, index: number) => {
					if (index === data.length - 1 || !a.value) return // 最后一个不需要或者值为ubdefined时
					str += `${a.marker}<span style="color:#fff">${a.seriesName}<span style="width:70px;padding-right:20px;text-align:right;display:inline-block;font-weight:600">${a.value}${opts.unit}</span></span><br>`
				})
				return str
			},
			...opts.tooltip,
		},
		legend: {
			left: 'right',
			right: fontSizeWidth(20),
			top: fontSizeWidth(5),
			itemGap: fontSizeWidth(15),
			itemHeight: fontSizeWidth(15),
			itemWidth: fontSizeWidth(15),
			textStyle: {
				fontSize: fontSizeWidth(16),
			},
			...opts.legend,
		},
		xAxis: {
			type: 'value',
		},
		yAxis: {
			axisTick: {
				show: false,
			},
			type: 'category',
			inverse: true,
			data: opts.names,
		},
		color: opts.color || defaultColor,
		dataZoom: [
			{
				// show: result.length > 5,
				startValue: 0, // 数据窗口范围的起始数值
				endValue: 5, // 数据窗口范围的结束数值（一页显示多少条数据）
				type: 'slider',
				maxValueSpan: 5, // 显示数据的条数(默认显示10个)
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
		series: opts.data,
	}
	myChart.setOption(options)
}

const initChat9 = () => {
	const defaultColor = [
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
					color: '#DEE2FF', // 0% 处的颜色
				},
				{
					offset: 1,
					color: '#AFBDFF', // 100% 处的颜色
				},
			],
			global: false, // 缺省为 false
		},
	]
	const options = {
		grid: {
			top: fontSizeWidth(20),
			left: fontSizeWidth(80),
			right: fontSizeWidth(0),
			bottom: fontSizeWidth(85),
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
					if (index === data.length - 1 || !a.value) return // 最后一个不需要或者值为ubdefined时
					str += `${a.marker}<span style="color:#fff">${a.seriesName}<span style="width:70px;padding-right:20px;text-align:right;display:inline-block;font-weight:600">${a.value}${opts.unit}</span></span><br>`
				})
				return str
			},
			...opts.tooltip,
		},
		legend: {
			left: 'center',
			right: fontSizeWidth(20),
			top: fontSizeWidth(5),
			itemGap: fontSizeWidth(15),
			itemHeight: fontSizeWidth(15),
			itemWidth: fontSizeWidth(15),
			textStyle: {
				fontSize: fontSizeWidth(16),
			},
			...opts.legend,
		},
		xAxis: {
			type: 'category',
			// inverse: true,
			data: opts.names,
		},
		yAxis: {
			type: 'value',
			max: function (value) {
				return Math.floor(value.max * 1.02)
			},
			min: function (value) {
				return Math.floor(value.min * 0.9)
			},
			axisTick: {
				show: false,
			},
		},
		color: opts.color || defaultColor,
		dataZoom: opts.dataZoom || {
			start: 0,
			type: 'inside',
		},
		series: opts.data,
	}
	myChart.setOption(options)
	// debugger
}

const initChat10 = () => {
	const options = {
		tooltip: {
			show: true,
			trigger: 'item',
			padding: [8, 15],
			backgroundColor: 'rgba(12, 51, 115,0.8)',
			borderColor: 'rgba(3, 11, 44, 0.5)',
			textStyle: {
				color: 'rgba(255, 255, 255, 1)',
			},
		},
		legend: {
			show: false,
		},
		grid: {
			left: fontSizeWidth(120),
			right: fontSizeWidth(100),
			top: fontSizeWidth(8),
			bottom: fontSizeWidth(5),
		},
		xAxis: [
			{
				splitLine: {
					show: false,
				},
				type: 'value',
				show: false,
			},
		],
		yAxis: [
			{
				type: 'category',
				inverse: true,
				offset: 70,
				position: 'left',
				axisLabel: {
					show: true,
					align: 'left',
					textStyle: {
						color: '#fff',
						fontSize: 14,
					},
					formatter: function (value, index) {
						let num = ''
						let str = ''
						num = index + 1
						str = '{name|' + opts.data[index].name + '}'
						return str
					},
					rich: {
						name: { color: '#5B6276', fontSize: 14, padding: [0, 0, 0, 0] },
					},
				},
				splitLine: {
					show: false,
				},
				axisTick: {
					show: false,
				},
				axisLine: {
					show: false,
				},
				data: opts.data.map((item) => item.name),
			},
			{
				type: 'category',
				inverse: true,
				axisTick: 'none',
				axisLine: 'none',
				show: true,
				axisLabel: {
					align: 'left',
					textStyle: {
						color: '#fff',
						fontSize: 12,
					},
					formatter: function (value, index) {
						let num = ''
						let str = ''
						num = index + 1
						str = '{name|' + opts.data[index].value + '}'
						return str
					},
					rich: {
						name: { color: '#fff', fontSize: 14, padding: [40, 0, 2, 0] },
					},
				},
				data: opts.data.map((item) => item.value),
			},
		],
		series: opts.data,
	}
	// debugger
	myChart.setOption(options)
}
const initChat11 = () => {
	const options = {
		tooltip: {
			show: true,
			trigger: 'item',
			padding: [8, 15],
			backgroundColor: 'rgba(23, 51, 67,1)',
			textStyle: {
				color: 'rgba(255, 255, 255, 1)',
			},
			formatter: (data: any) => {
				return `${data.marker} ${data.name}：${data.data.value}${opts.unit}`
			},
		},
		legend: {
			show: false,
		},
		grid: {
			top: fontSizeWidth(10),
			left: fontSizeWidth(20),
			right: fontSizeWidth(30),
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
				max: opts.max,
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
				data: opts.data.map((item) => item.value),
				axisLabel: {
					color: 'red',
					fontSize: 14,
					margin: 40,

					formatter: (value: number) => {
						return [`{name|${value}}{unit|${opts.unit}}`]
					},
					rich: {
						name: {
							textAlign: 'right',
							padding: [
								fontSizeWidth(-40),
								fontSizeWidth(20),
								0,
								fontSizeWidth(-100),
							],
							fontSize: fontSizeWidth(14),
							color: '#5B6276',
						},
						unit: {
							fontWeight: 400,
							padding: [
								fontSizeWidth(-40),
								fontSizeWidth(20),
								0,
								fontSizeWidth(-10),
							],
							fontSize: fontSizeWidth(15),
							color: '#5B6276',
						},
					},
				},
			},
		],
		dataZoom: [
			{
				show: opts.data.length > 6,
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
				name: '背景',
				type: 'bar',
				barWidth: fontSizeWidth(16), // 柱子宽度
				barGap: '-100%',
				data: opts.data.map((item) => item.max),
				// 禁止tooltip触发
				tooltip: {
					show: false,
				},
				itemStyle: {
					normal: {
						color: 'red',
						opacity: 0,
						barBorderRadius: [0, 30, 0, 30],
					},
				},
			},
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
					fontSize: fontSizeWidth(20),
					position: 'left',
					align: 'left',
					formatter: function (params) {
						return `{a|${params.data.name}}`
					},
					rich: {
						a: {
							width: fontSizeWidth(1420),
							height: fontSizeWidth(70),
							fontSize: fontSizeWidth(20),
							color: '#5B6276',
							backgroundColor: 'rgba(0,0,0,0)',
						},
					},
				},
				data: opts.data.map((item) => {
					return {
						name: item.title,
						value: item.value,
						itemStyle: {
							barBorderRadius: [0, 10, 10, 0],
							color: {
								type: 'linear',
								x: 0,
								y: 0,
								x2: 1,
								y2: 1,
								colorStops: [
									{
										offset: 0,
										color: item.color || '#4261F6',
										opacity: 0.5,
									},
									{
										offset: 1,
										color: item.color || '#7B89FF',
									},
								],
							},
						},
					}
				}),
			},
		],
	}
	// debugger
	myChart.setOption(options)
	myChart.off('click')
	myChart.on('click', opts.getCurrentItem)
}
const initChat12 = () => {
	const options = {
		tooltip: {
			trigger: 'axis',
			backgroundColor: 'rgba(9, 10, 42, 0.56)',
			textStyle: {
				color: '#fff',
				fontSize: fontSizeWidth(14),
			},
			position: 'top',
			axisPointer: {
				// 坐标轴指示器，坐标轴触发有效
				type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
			},
			formatter: (data: any) => {
				let str = `${data[0].name}<br>`
				const newData = data.filter(
					(i: any) =>
						!['辅助', '增加辅助', '减少辅助'].includes(i.seriesName) &&
						i.data !== '-',
				)
				newData.map((a: any) => {
					str += `${a.marker}<span style="color:#fff"><span style="width:5em;display:inline-block;">${a.seriesName}</span>`
					str += `<span style="width:10em;padding-right:10px;text-align:right;display:inline-block;font-weight:600">${
						a.value
					}${opts.data[a.seriesIndex].unit}</span></span><br>`
				})
				return str
			},
		},

		color: opts.color,
		legend: {
			top: 0,
			left: 'center',
			data: ['增加', '减少', '汇总'],
			...opts.legend,
		},
		grid: {
			bottom: fontSizeWidth(35),

			...opts.grid,
		},
		xAxis: {
			type: 'category',
			splitLine: { show: false },
			data: opts.names,
			axisLabel: {
				show: true,
				interval: 0, // 设置为0，强制显示所有标签
				fontSize: fontSizeWidth(14),
				formatter: function (value: string) {
					const len = value.length
					return len > 7 ? value.slice(0, 7) + '...' : value
				},
			},
			...opts.xAxis,
		},
		yAxis: opts.yAxis,
		series: opts.data.map((a: any, index) => {
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
	overflow: hidden;
	.container {
		width: 100%;
		height: 100%;
	}
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