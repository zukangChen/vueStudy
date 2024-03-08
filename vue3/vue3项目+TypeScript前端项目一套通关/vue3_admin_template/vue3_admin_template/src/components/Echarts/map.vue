<template>
	<div class="comm-chart">
		<div class="chartRef" ref="chart"></div>
		<div class="refresh" v-if="props.data.refresh" @click="selectALL">
			<img src="@/components/Echarts/images/refresh.png">
		</div>
		<div class="toolTip" v-if="tooltipCustom" ref="toolTipRef" :class="{hasAnimal:toolTipData}" :style="{left:toolTip.x+'px',top:toolTip.y+'px'}">
			<el-scrollbar class="list" :max-height="fontSizeWidth(250)+'px'" v-if="toolTipData">
				<div class="item" :class="{hasHover:item.url}" v-html="item.name" v-for="(item,index) in toolTipData.toolTip" :key="index" @click="goToDetail(item)">
				</div>
			</el-scrollbar>
		</div>
	</div>
</template>
<script setup lang="ts">
import {
	shallowRef,
	onMounted,
	watch,
	onUnmounted,
	reactive,
	nextTick,
} from 'vue'
import { throttle } from '@/utils'
import * as echarts from 'echarts'
import { color, fontColor } from './params'
import mapJsonData from './province/china.json'
import chinaBJ from './province/bou1_4p.json'
import world from './province/world.json'
import mapPoint from './images/mapPoint.png'
import mapDimension from './images/mapDimension.png'
import mapDimensionYellow from './images/mapDimensionYellow.png'
import noData from './images/noData.png'
import mapBox from './images/mapBox.png'
// import mapBox from '@/assets/svg/mapBox.svg'
import { fontSizeWidth } from '@/utils/rem'

const emits = defineEmits(['getCurrentItem'])

const chart = shallowRef(null),
	selectItem = shallowRef(null),
	toolTipRef = shallowRef(null),
	toolTipData = shallowRef(null),
	tooltipCustom = shallowRef(false)
let myChart: any = null
const props = defineProps({
	data: {
		type: Object,
	},
	isMetallurgy: {
		type: Boolean,
		require: true,
		default: false,
	},
	yellowFirst: {
		type: Boolean,
		require: false,
	},
})
let opts: any = {
	color: color('linear'),
	fontColor: fontColor,
	data: [],
	grid: {},
	...props.data,
}
watch(
	props.data!,
	throttle((_o, n: any) => {
		opts = {
			...opts,
			...JSON.parse(JSON.stringify(n)),
		}
		init()
	}),
	{
		deep: true,
	},
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
	opts = {}
	if (myChart) {
		myChart.dispose()
	}
})
const init = () => {
	if (myChart) {
		myChart.clear()
	} else {
		myChart = echarts.init(chart.value)
		window.addEventListener('resize', () => {
			myChart.resize()
		})
		window.myDialog = function (name: string) {
			emits('getCurrentItem', name)
			console.log(name, '-----')
		}
	}
	// myChart.clear();
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
const goToDetail = (item) => {
	emits('getCurrentItem', item)
	selectALL()
}
const toolTip = reactive({
	x: 0,
	y: 0,
})
const selectALL = () => {
	selectItem.value = null
	toolTipData.value = false
	init()
	emits('getCurrentItem')
}

const initChat = () => {
	const mapZoom = 1.6,
		mapTop = 30,
		mapLeft = '29.1%'
	const options = {
		color: opts.color,
		grid: {
			bottom: 35,
		},
		dataZoom: {
			start: 0,
			type: 'inside',
		},
		tooltip: {
			backgroundColor: 'rgba(9, 10, 42,0)',
			extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0);',
			borderWidth: 0,
			textStyle: {
				color: '#fff',
			},
			renderMode: 'html',
			position: 'inside',
			padding: 0,
			show: true,
			trigger: 'item', // 触发类型
			enterable: false, //鼠标可进入浮层内
			triggerOn: 'mousemove', // 点击触发
			formatter: (data: any) => {
				const len = data.name.length
				const baseWidth = fontSizeWidth(30)
				const longitude_offset =
					data.data.coord[0] > 120
						? -fontSizeWidth(200)
						: data.data.coord[0] > 70
						? fontSizeWidth(200)
						: 0
				const latitude_offset = data.data.coord[1] > 50 ? 100 : 0
				const num =
					data.value && Array.isArray(data.value) ? 30 * data.value.length : 30
				let str = `<div style="margin-left:${longitude_offset};transform:translateY(${latitude_offset}%);height:${fontSizeWidth(
					num,
				)};margin-bottom:${fontSizeWidth(
					70,
				)};z-index:999"><div style="background: rgba(0,0,0,0.7); width:${
					baseWidth * len
				};height:${fontSizeWidth(num)};padding:${fontSizeWidth(
					12,
				)}px ${fontSizeWidth(30)}px;border-radius:5px;">
                    <div>${data.name}</div>`
				if (data.value && Array.isArray(data.value)) {
					data.value.map((a: any) => {
						str += `<div onclick="myDialog('${a}')" style="padding:${fontSizeWidth(
							5,
						)}px 0;">${a}</div>`
					})
				}
				str += `</div></div>`
				return str
			},
		},
		series: [
			{
				map: 'chinaBJ',
				type: 'map',
				zoom: mapZoom - 0.09,
				top: `${mapTop - 4.1}%`,
				left: '28%',
				roam: 0,
				zoomEnable: false,
				tooltip: {
					show: false,
				},

				aspectScale: 0.8,
				itemStyle: {
					borderColor: '#BEC5F5',
					borderWidth: 8,
					areaColor: '#CADBF4',
				},
				emphasis: {
					disabled: true,
					label: {
						show: false,
					},
					itemStyle: {
						areaColor: '#A2ACFB', //悬浮区背景
					},
				},
			},
			{
				map: 'china',
				type: 'map',
				aspectScale: 0.8, //长宽比
				zoom: mapZoom,
				top: `${mapTop}%`,
				left: mapLeft,
				tooltip: {
					show: true,
					trigger: 'item',
					position: 'inside',
					backgroundColor: 'rgba(255,255,255,0)',
					borderColor: 'rgba(255,255,255,0)',
					borderWidth: 0,
					textStyle: {
						color: 'transparent',
					},
					formatter: function () {
						return ''
					},
				},
				label: {
					show: false,
				},
				itemStyle: {
					areaColor: '#BBC9FF',
					borderColor: '#7B81DA',
					borderWidth: 1,
				},
				emphasis: {
					itemStyle: {
						disabled: true,
						areaColor: '#A2ACFB',
					},
				},
				select: {
					disabled: true,
					// 点击选中的样式
					// label: {
					// 	show: true,
					// 	color: '#fff',
					// },

					// itemStyle: {
					// 	borderColor: '#7B81DA',
					// 	borderWidth: 1,
					// 	areaColor: '#BBC9FF',
					// },
				},
				markPoint: {
					//动态标记
					animation: false,
					symbol: (value, params) => {
						if (props.yellowFirst) {
							const show_or_not = params.data.show_or_not
							return show_or_not
								? `image://${mapDimensionYellow}`
								: `image://${noData}`
						} else {
							return `image://${props.isMetallurgy ? mapDimension : mapPoint}`
						}
					},
					symbolSize: fontSizeWidth(25),
					symbolOffset: [0, fontSizeWidth(-20)],
					data: opts.data,
					label: {
						show: false,
						position: [fontSizeWidth(-40), fontSizeWidth(-30)],
						color: '#03a7cd',
						padding: [fontSizeWidth(5), fontSizeWidth(5)],
						backgroundColor: 'rgba(255,255,255,0.5)',
						/*  formatter: (a) => {
                        return `{a|${a.data.province}}\n{value|${a.data.companyTotal}}{unit|家机构}{value|${a.data.dealerTotal}}{unit|个经销商}`
                    }, */
						rich: {
							a: {
								align: 'center',
								padding: 5,
								color: '#666',
							},
							value: {
								color: 'rgb(255, 112, 67)',
								padding: [fontSizeWidth(0), fontSizeWidth(3)],
								fontSize: fontSizeWidth(14),
							},
							unit: {
								color: '#666',
							},
						},
					},
					emphasis: {
						disabled: true,
					},
				},
			},
		],
	}
	myChart.setOption(options)
	myChart.off('click')
	myChart.on('click', function (params: any) {
		emits('getCurrentItem', params.data)
	})
}
const initChat2 = () => {
	const mapZoom = opts.mapZoom || 1.3,
		mapTop = opts.grid.top || fontSizeWidth(30),
		mapLeft = opts.grid.left || fontSizeWidth(80)
	const options = {
		color: opts.color,
		grid: {
			bottom: 35,
		},
		tooltip: {
			backgroundColor: 'rgba(9, 10, 42,0)',
			extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0);',
			borderWidth: 0,
			textStyle: {
				color: '#fff',
			},
			// trigger: 'item', // 触发类型
			// enterable: false, //鼠标可进入浮层内
			// renderMode: 'html',
			alwaysShowContent: true,
			position: 'inside',
			// top: 20,
			// padding: 0,
			triggerOn: 'mousemove', // 点击触发
			formatter: (data: any) => {
				const len = data.name.replace('(', '').replace(')', '').length
				const baseWidth = fontSizeWidth(20)
				// const longitude_offset = data.data.coord[0] > 70 ? 200 : data.data.coord[0] < 40 ? -200 : 0
				const longitude_offset = 0
				const num =
					data.value && Array.isArray(data.value) ? 30 * data.value.length : 30
				let str = `<div style="margin-left:${fontSizeWidth(
					longitude_offset,
				)}px;height:${fontSizeWidth(num)}px;margin-bottom:${fontSizeWidth(
					70,
				)}px;z-index:999"><div style="background: rgba(0,0,0,0.7); width:${
					len * baseWidth
				}px;height:${fontSizeWidth(num)}px;padding:${fontSizeWidth(
					12,
				)}px ${fontSizeWidth(30)}px;border-radius:5px;">
                    <div>${data.name}</div>`
				if (data.value && Array.isArray(data.value)) {
					data.value.map((a: any) => {
						str += `<div onclick="myDialog('${a}')" style="padding:${fontSizeWidth(
							5,
						)}px 0;">${a}</div>`
					})
				}
				str += `</div></div>`
				return str
			},
		},
		series: [
			{
				map: 'world',
				type: 'map',
				aspectScale: opts.aspectScale || 0.7, //长宽比
				zoom: mapZoom,
				top: `${mapTop}%`,
				left: mapLeft,
				tooltip: {
					show: true,
					trigger: 'item',
					position: 'inside',
					backgroundColor: 'rgba(255,255,255,0)',
					borderColor: 'rgba(255,255,255,0)',
					borderWidth: 0,
					textStyle: {
						color: 'transparent',
					},
					formatter: function () {
						return ''
					},
				},
				label: {
					show: true,
					color: '#0B0F5A',
					fontSize: fontSizeWidth(14),
					formatter: (data: any) => {
						return ''
					},
					...opts.label,
				},
				select: {
					disabled: true,
				},
				itemStyle: {
					areaColor: '#BBC9FF',
					borderColor: '#7B81DA',
					borderWidth: 1,
				},
				emphasis: {
					disabled: true,
					itemStyle: {
						areaColor: '#A2ACFB',
					},
				},
				markPoint: {
					//动态标记
					animation: true,
					// symbol: `image://${
					// 	props.yellowFirst
					// 		? mapDimensionYellow
					// 		: props.isMetallurgy
					// 		? mapDimension
					// 		: mapPoint
					// }`,
					// symbol: `image://${mapDimensionYellow}`,
					symbol: (value, params) => {
						if (props.yellowFirst) {
							const show_or_not = params.data.show_or_not
							return show_or_not
								? `image://${mapDimensionYellow}`
								: `image://${noData}`
						} else {
							return `image://${props.isMetallurgy ? mapDimension : mapPoint}`
						}
					},
					// symbolOffset: [0, -20],
					symbolSize: fontSizeWidth(25),
					data: opts.data,
					label: {
						show: false,
						position: [fontSizeWidth(-40), fontSizeWidth(-30)],
						color: '#03a7cd',
						padding: [fontSizeWidth(5), fontSizeWidth(5)],
						backgroundColor: 'rgba(255,255,255,0.5)',
						/*  formatter: (a) => {
                            return `{a|${a.data.province}}\n{value|${a.data.companyTotal}}{unit|家机构}{value|${a.data.dealerTotal}}{unit|个经销商}`
                        }, */
						rich: {
							a: {
								align: 'center',
								padding: 5,
								color: '#666',
							},
							value: {
								color: 'rgb(255, 112, 67)',
								padding: [fontSizeWidth(0), fontSizeWidth(3)],
								fontSize: fontSizeWidth(14),
							},
							unit: {
								color: '#666',
							},
						},
					},
					emphasis: {
						disabled: true,
					},
					// afterCompleteAnimation: (el:any) => {
					//     function animateLoop() {
					//         let symbolPath = el.childAt(0);
					//         let end = {
					//             position: [0, -20]
					//         };
					//         let animationEasing = 'cubicInOut';
					//         symbolPath.animateTo(end, 10, 0, animationEasing, () => {
					//             let start = {
					//                 position: [0, 0]
					//             };
					//             let animationEasing = 'cubicInOut ';
					//             symbolPath.animateTo(start, 1000, 0, animationEasing, undefined, !!undefined, false)
					//         }, !!undefined, false)
					//     }
					//     animateLoop();
					//     setInterval(() => {
					//         animateLoop();
					//     }, 600);
					// }
				},
			},
		],
	}
	myChart.setOption(options)
	myChart.off('click')
	myChart.on('click', function (params: any) {
		emits('getCurrentItem', params.data)
	})
	/* let index = 0,timer = null;
    const fn = () => {
        if(index == opts.data.length){
            index = 0;
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
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            index++;
            fn();
        }, 1000);
    }
    fn(); */
}
const initChat3 = () => {
	tooltipCustom.value = true
	const mapZoom = opts.mapZoom || 1.6,
		mapTop = opts.grid.top || 30,
		mapLeftB = opts.grid.leftB || '21.5%',
		mapLeft = opts.grid.left || '23.1%'
	opts.data = opts.data.sort((a, b) => {
		if (a.name && b.name) {
			return a.name.localeCompare(b.name, 'zh')
		}
	})
	const options = {
		color: opts.color,
		tooltip: {
			backgroundColor: 'rgba(9, 10, 42,0)',
			extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0);',
			borderWidth: 0,
			textStyle: {
				color: '#fff',
			},
			triggerOn: 'click',
			alwaysShowContent: true,
			position: (point, params, dom, rect, size) => {
				toolTipData.value = params.data
				nextTick(() => {
					const { width, height } = toolTipRef.value.getBoundingClientRect()
					// 获取经纬度,针对境内东北提示框遮挡做特殊处理
					const longi = params.data.coord[0]
					const lati = params.data.coord[1]
					const inRange = (val, type: string) => {
						if (type == 'longi') {
							const longiRange = [120, 135]
							return longiRange[0] <= val && val <= longiRange[1]
						} else {
							const latiRange = [40, 54]
							return latiRange[0] <= val && val <= latiRange[1]
						}
					}
					const isDongbei = inRange(longi, 'longi') && inRange(lati, 'lati')
					// 固定在顶部
					toolTip.x = rect.x - width / 2 + fontSizeWidth(80)
					const baseY = rect.y - height - fontSizeWidth(10)
					toolTip.x =
						toolTip.x < 0
							? fontSizeWidth(30)
							: size.viewSize[0] - toolTip.x + fontSizeWidth(30) < width
							? size.viewSize[0] - width - fontSizeWidth(40)
							: toolTip.x
					toolTip.y = isDongbei ? baseY + fontSizeWidth(100) : baseY
					// 固定在顶部
				})
				return [point[0], '10%']
			},
			formatter() {
				return ''
			},
		},
		dataZoom: {
			start: 0,
			type: 'inside',
			...opts.dataZoom,
		},
		series: [
			{
				map: 'chinaBJ',
				type: 'map',
				zoom: mapZoom - 0.09,
				top: `${mapTop - 4.1}%`,
				left: mapLeftB,
				roam: 0,
				zoomEnable: false,
				tooltip: {
					show: false,
				},
				aspectScale: 0.8,
				itemStyle: {
					borderColor: '#BEC5F5',
					borderWidth: 8,
					areaColor: '#CADBF4',
				},
				emphasis: {
					label: {
						show: false,
					},
					disabled: true,
					itemStyle: {
						areaColor: '#A2ACFB', //悬浮区背景
					},
				},
			},
			{
				map: 'china',
				type: 'map',
				aspectScale: 0.8, //长宽比
				zoom: mapZoom,
				top: `${mapTop}%`,
				left: mapLeft,
				tooltip: {
					show: true,
					trigger: 'item',
					position: 'inside',
					backgroundColor: 'rgba(255,255,255,0)',
					borderColor: 'rgba(255,255,255,0)',
					borderWidth: 0,
					textStyle: {
						color: 'transparent',
					},
					formatter: function () {
						return ''
					},
				},
				label: {
					show: true,
					formatter: (data: any) => {
						return ''
					},
					...opts.label,
				},
				select: {
					disabled: true,
				},
				itemStyle: {
					areaColor: '#BBC9FF',
					borderColor: '#7B81DA',
					borderWidth: 1,
				},
				emphasis: {
					disabled: true,
					itemStyle: {
						areaColor: '#A2ACFB',
					},
				},
				markPoint: {
					//动态标记
					animation: false,
					symbol: `image://${mapDimensionYellow}`,
					symbolSize: fontSizeWidth(25),
					animationDuration: 0,
					data: opts.data.map((a) => {
						let symbolSize = fontSizeWidth(25)
						if (
							selectItem.value &&
							selectItem.value.data &&
							selectItem.value.data.data.company_name == a.data.company_name
						) {
							symbolSize = fontSizeWidth(35)
						}
						return {
							...a,
							symbolSize,
						}
					}),
					label: {
						show: false,
						position: [fontSizeWidth(-40), fontSizeWidth(-20)],
						color: '#03a7cd',
						padding: [fontSizeWidth(5), fontSizeWidth(5)],
						fontSize: fontSizeWidth(14),
						backgroundColor: 'rgba(255,255,255,0.5)',
						rich: {
							a: {
								align: 'center',
								padding: 5,
								fontSize: fontSizeWidth(14),
								color: '#666',
							},
							value: {
								color: 'rgb(255, 112, 67)',
								padding: [0, 3],
								fontSize: fontSizeWidth(14),
							},
							unit: {
								color: '#666',
							},
						},
					},
				},
				data: opts.data.map((a) => {
					const name = a.data.company_country
					const max = opts.data
						.filter((b) => b.data.company_country == name)
						.reduce((s, a) => {
							if (a.data.company_name_list) {
								s += a.data.company_name_list.split(',').length
							} else if (a.data.company_name) {
								s += a.data.company_name.split(',').length
							} else {
								s += 1
							}
							return s
						}, 0)
					return {
						...a,
						name: a.data.company_country,
						itemStyle: {
							areaColor: `hsl(234.87deg,100%,${
								90 - (max < 3 ? 10 : max < 5 ? 15 : 20)
							}%)`,
						},
					}
				}),
			},
		],
	}
	myChart.setOption(options)
	// myChart.getZr().off('click')
	myChart.off('click')
	myChart.getZr().on('click', (params) => {
		if (!params.target && toolTipData.value) {
			selectALL()
		}
	})
	myChart.on('click', function (params: any) {
		if (params.data) {
			options.tooltip.show = true
			options.tooltip.alwaysShowContent = true
			let hasEnvens = false
			selectItem.value = params
			options.series[1].markPoint.data = options.series[1].markPoint.data.map(
				(a) => {
					if (
						a.data.latitude === params.data.data.latitude &&
						a.data.longitude === params.data.data.longitude
					) {
						if (a.symbolSize == fontSizeWidth(25) || !a.symbolSize) {
							hasEnvens = true
						} else {
							selectALL()
						}
						return {
							...a,
							symbolOffset:
								a.symbolSize == fontSizeWidth(25) || !a.symbolSize
									? [0, -fontSizeWidth(5)]
									: [0, 0],
							symbolSize:
								a.symbolSize == fontSizeWidth(25) || !a.symbolSize
									? fontSizeWidth(35)
									: fontSizeWidth(25),
						}
					} else {
						return {
							...a,
							symbolOffset: [0, 0],
							symbolSize: fontSizeWidth(25),
						}
					}
				},
			)
			myChart.setOption(options)
			if (hasEnvens) {
				emits('getCurrentItem', params)
			}
		} else {
			selectALL()
		}
	})
	if (selectItem.value) {
		myChart.dispatchAction({
			type: 'showTip',
			name: selectItem.value.name,
			seriesIndex: 0,
			// 数据项的 index，如果不指定也可以通过 name 属性根据名称指定数据项
			dataIndex: selectItem.value.dataIndex,
		})
	}
}
const initChat4 = () => {
	tooltipCustom.value = true
	const mapZoom = opts.mapZoom || 1.3,
		mapTop = opts.grid.top || fontSizeWidth(30),
		mapLeft = opts.grid.left || fontSizeWidth(80)
	opts.data = opts.data.sort((a, b) => {
		if (a.name && b.name) {
			return a.name.localeCompare(b.name, 'zh')
		}
	})
	const options = {
		color: opts.color,
		tooltip: {
			backgroundColor: 'rgba(9, 10, 42,0)',
			extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0);',
			borderWidth: 0,
			textStyle: {
				color: '#fff',
			},
			triggerOn: 'click',
			alwaysShowContent: true,
			position: (point, params, dom, rect, size) => {
				toolTipData.value = params.data
				nextTick(() => {
					const { width, height } = toolTipRef.value.getBoundingClientRect()
					// 固定在顶部
					toolTip.x = rect.x - width / 2 + fontSizeWidth(40)
					toolTip.x =
						toolTip.x < 0
							? 20
							: size.viewSize[0] - toolTip.x < width
							? size.viewSize[0] - width - fontSizeWidth(30)
							: toolTip.x
					toolTip.y = rect.y - height - fontSizeWidth(20)
					toolTip.y = toolTip.y < 0 ? height + fontSizeWidth(30) : toolTip.y
					// 固定在顶部
				})
				return [point[0], '10%']
			},
			formatter() {
				return ''
			},
		},
		dataZoom: {
			start: 0,
			type: 'inside',
			...opts.dataZoom,
		},
		series: [
			{
				map: 'world',
				type: 'map',
				aspectScale: opts.aspectScale || 0.7, //长宽比
				zoom: mapZoom,
				top: `${mapTop}%`,
				left: mapLeft,
				tooltip: {
					show: true,
					trigger: 'item',
					position: 'inside',
					backgroundColor: 'rgba(255,255,255,0)',
					borderColor: 'rgba(255,255,255,0)',
					borderWidth: 0,
					textStyle: {
						color: 'transparent',
					},
					formatter: function () {
						return ''
					},
				},
				label: {
					show: true,
					color: '#0B0F5A',
					fontSize: fontSizeWidth(14),
					formatter: (data: any) => {
						return ''
					},
					...opts.label,
				},
				select: {
					disabled: true,
				},
				itemStyle: {
					areaColor: '#BBC9FF',
					borderColor: '#7B81DA',
					borderWidth: 1,
				},
				emphasis: {
					disabled: true,
					itemStyle: {
						areaColor: '#A2ACFB',
					},
				},
				markPoint: {
					//动态标记
					animation: false,
					symbol: (value, params) => {
						const { point_value } = params.data.data
						return point_value === undefined
							? `image://${mapDimensionYellow}`
							: point_value
							? `image://${mapDimensionYellow}`
							: `image://${noData}`
					},
					symbolSize: fontSizeWidth(25),
					animationDuration: 0,
					data: opts.data.map((a) => {
						let symbolSize = fontSizeWidth(25)
						if (
							selectItem.value &&
							selectItem.value.data &&
							selectItem.value.data.data.company_name == a.data.company_name
						) {
							symbolSize = fontSizeWidth(35)
						}
						return {
							...a,
							symbolSize,
						}
					}),
					label: {
						show: false,
						position: [fontSizeWidth(-40), fontSizeWidth(-20)],
						color: '#03a7cd',
						padding: [fontSizeWidth(5), fontSizeWidth(5)],
						fontSize: fontSizeWidth(14),
						backgroundColor: 'rgba(255,255,255,0.5)',
						rich: {
							a: {
								align: 'center',
								padding: 5,
								fontSize: fontSizeWidth(14),
								color: '#666',
							},
							value: {
								color: 'rgb(255, 112, 67)',
								padding: [0, 3],
								fontSize: fontSizeWidth(14),
							},
							unit: {
								color: '#666',
							},
						},
					},
				},
				data: opts.data.map((a) => {
					return {
						...a,
						name: a.data.company_country,
						itemStyle: {
							areaColor: '#8A94FF ',
						},
					}
				}),
			},
		],
	}
	myChart.setOption(options)
	myChart.off('click')
	myChart.getZr().on('click', (params) => {
		if (!params.target && toolTipData.value) {
			selectALL()
		}
	})
	myChart.on('click', function (params: any) {
		if (params.data) {
			options.tooltip.show = true
			options.tooltip.alwaysShowContent = true
			let hasEnvens = false
			selectItem.value = params
			options.series[0].markPoint.data = options.series[0].markPoint.data.map(
				(a) => {
					if (
						a.data.latitude === params.data.data.latitude &&
						a.data.longitude === params.data.data.longitude
					) {
						if (a.symbolSize == fontSizeWidth(25) || !a.symbolSize) {
							hasEnvens = true
						} else {
							selectALL()
						}
						return {
							...a,
							symbolOffset:
								a.symbolSize == fontSizeWidth(25) || !a.symbolSize
									? [0, -fontSizeWidth(10)]
									: [0, 0],
							symbolSize:
								a.symbolSize == fontSizeWidth(25) || !a.symbolSize
									? fontSizeWidth(35)
									: fontSizeWidth(25),
						}
					} else {
						return {
							...a,
							symbolOffset: [0, 0],
							symbolSize: fontSizeWidth(25),
						}
					}
				},
			)
			myChart.setOption(options)
			if (hasEnvens) {
				emits('getCurrentItem', params)
			}
		} else {
			selectALL()
		}
	})
	if (selectItem.value) {
		myChart.dispatchAction({
			type: 'showTip',
			name: selectItem.value.name,
			seriesIndex: 0,
			// 数据项的 index，如果不指定也可以通过 name 属性根据名称指定数据项
			dataIndex: selectItem.value.dataIndex,
		})
	}
}
</script>
<style lang="scss" scope>
.comm-chart {
	position: relative;
	.chartRef {
		width: 100%;
		height: 100%;
		z-index: 1;
	}
	.refresh {
		background-size: 100% 100%;
		background-repeat: no-repeat;
		position: absolute;
		bottom: 10 * $base;
		z-index: 2;
		font-size: 20 * $base;
		left: -4px;
		bottom: 5 * $base;
		width: 54 * $base;
		height: 54 * $base;
		cursor: pointer;
		&:active {
			opacity: 0.6;
		}
		img {
			width: 100%;
			height: 100%;
		}
	}
	.toolTip {
		position: absolute;
		left: 20%;
		top: 50%;
		width: auto;
		color: #fff;
		border-radius: 5 * $bs;
		// 如果在scope里需要加 /deep/
		background-image: url('./images/mapBox.png');
		background-size: 100% 100%;
		z-index: 9;
		//&.hasAnimal{
		//	transition: left 0.2s ease-in-out,top 0.2s ease-in-out;
		//}
		.list {
			padding: 35 * $bs 20 * $bs;

			.item {
				padding: 6 * $bs;
				cursor: pointer;
				white-space: pre;
				font-size: 14 * $bs;
				&.hasHover:hover {
					background: rgba(255, 255, 255, 0.4);
				}
				&:active {
					opacity: 0.6;
				}
			}
		}
	}
}
</style>