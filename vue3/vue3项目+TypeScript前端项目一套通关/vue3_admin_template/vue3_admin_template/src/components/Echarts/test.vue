<template>
	<div class="comm-chart" ref="chart"></div>
</template>
<script setup lang="ts">
import { shallowRef, onMounted, watch, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { color, fontColor } from './params'
import noData from '@/assets/header/noData.png'
import { fontSizeWidth } from '@/utils/rem'
import { throttle } from '@/utils'
const emits = defineEmits(['getCurrentItem'])

const chart = shallowRef(null)

// const chart = ref(null);
let myChart: any = null

const props = defineProps({
	data: {
		type: Object,
	},
	top: Number,
	isPropsStop: {
		type: Boolean,
		default: true,
	},
	fontSize: { type: Number, default: 0 },
})
let opts: any = {
	type: 1,
	color: color(),
	fontColor: fontColor,
	timer: 5000,
	data: [],
	...props.data,
}
watch(
	props.data,
	throttle((_o, n: any) => {
		opts = {
			...opts,
			...JSON.parse(JSON.stringify(n)),
		}
		console.log('啊1？')
		init()
	}),
	{
		deep: true,
	},
)
onMounted(() => {
	console.log('啊2？')
	setTimeout(() => {
		init()
	}, 500)
})
let isStop = false
onUnmounted(() => {
	isStop = true
})
const init = () => {
	if (myChart) {
		myChart.clear()
	} else {
		myChart = echarts.init(chart.value)
		window.addEventListener(
			'resize',
			() => {
				myChart.resize()
			},
			false,
		)
	}

	initChat6()
}
const initChat5 = () => {
	let captions = ['2017', '2018', '2019', '2020', '2021']
	let values = ['81', '65', '76', '84', '49']

	let options = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'none',
			},
			formatter: (params) => {
				console.log(params)
				const { name, data } = params[0]
				return `
            <span style="font-size: 14px;font-family: Source Han Sans CN-Medium;font-weight: 500;color: #FFFFFF;margin-bottom:12px;">${name}</span>
            <sapn style="font-size: 14px;font-family: Source Han Sans CN-Medium;font-weight: 500;color: #FFFFFF;margin-bottom:4px;">：${data} 次</span>
         `
			},
			extraCssText:
				'opacity: 0.8;background-color:#050F1B;padding:16px;box-shadow: 1px 6px 15px 1px rgba(0,0,0,0.13);border-radius: 4px;filter: blur(undefinedpx);border:none;',
		},
		grid: {
			top: '10%', //上边距
			right: '20', //右边距
			left: '20', //左边距
			bottom: '10%', //下边距
			containLabel: true,
		},
		xAxis: {
			type: 'category',
			data: captions,
			axisTick: {
				show: false, //隐藏X轴刻度
			},
			axisLine: {
				lineStyle: {
					color: '#CCCCCC',
				},
			},
			axisLabel: {
				show: true,
				textStyle: {
					color: '#000',
					fontSize: 14,
					fontFamily: 'Source Han Sans CN-Regular',
				},
			},
		},
		yAxis: [
			{
				type: 'value',
				name: '',
				nameTextStyle: {
					color: 'rgba(0,0,0,0.65)',
					fontSize: 14,
					fontFamily: 'Source Han Sans CN-Regular',
					align: 'left',
					verticalAlign: 'center',
				},
				axisLabel: {
					color: 'rgba(0,0,0,0.65)',
					textStyle: {
						fontSize: 14,
					},
				},
				axisLine: {
					show: false,
					lineStyle: {
						color: 'rgba(223, 223, 223, 1)',
					},
				},
				axisTick: {
					show: false,
				},
				splitLine: {
					lineStyle: {
						color: 'rgba(223, 223, 223, 1)',
						type: 'dashed',
					},
				},
			},
		],
		series: [
			{
				type: 'line',
				data: values,
				symbolSize: 8, //标记的大小
				areaStyle: {
					color: new echarts.graphic.LinearGradient(
						0,
						0,
						0,
						1,
						[
							{
								offset: 0,
								color: 'rgba(116,160,249,0.15)', // 0% 处的颜色
							},
							{
								offset: 1,
								color: 'rgba(29,63,120,0)', // 100% 处的颜色
							},
						],
						false,
					),
				},
				lineStyle: {
					color: '#5B8FF9',
					width: 3,
					shadowColor: 'rgba(26,117,218,0.17)', //设置折线阴影
					shadowBlur: 5,
					shadowOffsetY: 9,
				},
				itemStyle: {
					//折线拐点标志的样式
					color: '#5B8FF9',
					borderColor: '#5B8FF9',
					borderWidth: 5,
				},
				smooth: 0.4,
				emphasis: {
					scale: 1.5,
				},
			},
		],
	}
	myChart.setOption(options)
}
const initChat6 = () => {
	const sum = opts.data.reduce((s: number, a: any) => s + a.value, 0)
	const options = {
		color: opts.color,
		title: {
			text: opts.data[0]?.name,
			textStyle: {
				color: opts.fontColor,
				fontSize: opts.textStyleSize || fontSizeWidth(14),
				fontWeight: 400,
				lineHeight: fontSizeWidth(25),
			},
			textAlign: 'center',
			subtext: `${
				opts.data[0]?.value
					? ((opts.data[0]?.value * 100) / sum).toFixed(2)
					: ''
			}%`,
			subtextStyle: {
				color: opts.fontColor,
				fontSize: opts.subtextStyleSize || fontSizeWidth(24),
				fontWeight: 600,
				width: 200,
			},
			left: opts.titleLeft || 'center',
			top: opts.titleTop || opts.top || '27%',
			...opts.title,
		},
		tooltip: {
			show: false,
			trigger: 'item',
			...opts.tooltip,
		},
		legend: {
			left: fontSizeWidth(3),
			bottom: fontSizeWidth(opts.labelBottom || '0'),
			itemGap: fontSizeWidth(12),
			itemHeight: fontSizeWidth(15),
			itemWidth: fontSizeWidth(15),
			textStyle: {
				color: opts.fontColor,
				align: 'left',
				rich: {
					a: {
						width: fontSizeWidth(60),
						fontWeight: 600,
					},
					b: {
						fontSize: fontSizeWidth(16),
						width: fontSizeWidth(60),
						padding: [0, 0, 0, fontSizeWidth(20)],
					},
				},
			},
			data: opts.data.map((r) => r.name || r),
			// formatter: (name) => {
			// 	if (name) {
			// 		const data1 = opts.data.find((a) => a.name === name)
			// 		if (!data1) return
			// 		let zw = ''
			// 		for (let i = String(data1.value).length + name.length; i < 9; i++) {
			// 			zw += ''
			// 		}
			// 		return `{a| ${name}}{b|${zw}${data1.value}${opts.unit}}`
			// 	}
			// },
			...opts.legend,
		},
		series: [
			{
				name: opts.title,
				type: 'pie',
				center: opts.center || ['50%', '35%'],
				radius: ['43%', '60%'],
				labelLine: {
					show: false,
				},
				tooltip: {
					show: true,
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
					borderRadius: 4,
				},
				selectedMode: 'single',
				select: {
					disabled: false,
				},
			},
			{
				type: 'pie',
				center: opts.center || ['50%', '35%'],
				radius: '25%',
				tooltip: {
					show: false,
				},
				legend: {
					show: false,
				},
				labelLine: {
					show: false,
				},
				label: {
					show: false,
				},
				data: [100],
				itemStyle: {
					color: {
						type: 'radial',
						x: 0.5,
						y: 0.5,
						r: 0.5,
						colorStops: [
							{
								offset: 0,
								color: '#fff', // 0% 处的颜色
							},
							{
								offset: 0.4,
								color: '#fff', // 0% 处的颜色
							},
							{
								offset: 1,
								color: '#E3E8FF', // 100% 处的颜色
							},
						],
						global: false, // 缺省为 false
					},
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.1)',
				},
				emphasis: {
					disabled: true,
				},
			},
			{
				type: 'pie',
				center: opts.center || ['50%', '35%'],
				radius: ['35%', '36%'],
				labelLine: {
					show: false,
				},
				label: {
					show: false,
				},
				tooltip: {
					show: false,
				},
				data: [
					{
						value: 100,
						itemStyle: {
							color: {
								type: 'linear',
								x: 0,
								y: 0,
								x2: 1,
								y2: 1,
								colorStops: [
									{
										offset: 0,
										color: '#fff', // 0% 处的颜色
									},
									{
										offset: 0.4,
										color: '#fff', // 0% 处的颜色
									},
									{
										offset: 1,
										color: '#6A70BE', // 100% 处的颜色
									},
								],
								global: false, // 缺省为 false
							},
						},
					},
					{
						value: 100,
						itemStyle: {
							color: {
								type: 'linear',
								x: 1,
								y: 0,
								x2: 0,
								y2: 0,
								colorStops: [
									{
										offset: 0,
										color: '#fff', // 0% 处的颜色
									},
									{
										offset: 0.4,
										color: '#fff', // 0% 处的颜色
									},
									{
										offset: 1,
										color: '#6A70BE', // 100% 处的颜色
									},
								],
								global: false, // 缺省为 false
							},
						},
					},
					{
						value: 100,
						itemStyle: {
							color: {
								type: 'linear',
								x: 1,
								y: 1,
								x2: 1,
								y2: 0,
								colorStops: [
									{
										offset: 0,
										color: '#fff', // 0% 处的颜色
									},
									{
										offset: 0.6,
										color: '#fff', // 0% 处的颜色
									},
									{
										offset: 1,
										color: '#6A70BE', // 100% 处的颜色
									},
								],
								global: false, // 缺省为 false
							},
						},
					},
				],
				emphasis: {
					disabled: true,
				},
			},
		],
	}
	myChart.setOption(options)
	myChart.on('highlight', (data: any) => {
		if (!opts.data[data.dataIndex]) return
		options.title.text = opts.data[data.dataIndex].name
		options.title.subtext = `${(
			(opts.data[data.dataIndex].value * 100) /
			sum
		).toFixed(2)}%`
		// myChart.setOption(options)
	})
	let index = 0,
		timer: any = null
	const fn = () => {
		if (isStop || !myChart) return
		if (index == opts.data.length) {
			index = 0
		}
		myChart.dispatchAction({
			type: 'highlight',
			seriesIndex: 0,
			dataIndex: index,
		})
		new Promise((resolve, reject) => {
			isStop = true
			timer = window.setTimeout(() => {
				window.clearTimeout(timer)
				if (!myChart) return
				resolve()
			}, opts.timer)
		}).then(() => {
			isStop = false
			myChart.dispatchAction({
				type: 'downplay',
				seriesIndex: 0,
				dataIndex: index,
			})
			index++
			fn()
			myChart.setOption(options)
		})
	}
	if (opts.timer && !timer) {
		fn()
	}
}
</script>
<style lang="scss" scope>
.CardContheader {
	width: 100%;
}
.comm-chart {
	display: flex;
	align-items: center;
	justify-content: center;
	// width: 100%;
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
