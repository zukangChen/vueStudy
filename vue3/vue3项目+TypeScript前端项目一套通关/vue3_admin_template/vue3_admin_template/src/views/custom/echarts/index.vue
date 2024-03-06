<template>
	<div class="dataStiatis">
		<title>设备故障统计的图表使用echarts自带滚动效果展示有问题，完整效果看vue2_test项目的/echarts页面</title>
		<el-card>
			<div class="title">设备概览</div>
		</el-card>
		<el-row :gutter="30" style="padding:20px 10px 0 10px;background-color:#fff;margin: 0 2px 20px 2px">
			<el-col :span="6">
				<el-card class="content1" id="content1">
					<div class="content">
						<div>
							<div class="equipTitle">设备总数(台)</div>
							<span>243</span>
						</div>
						<div>
							<img src="@/assets/dataStatistics/equipTotal.png" alt="">
						</div>
					</div>
				</el-card>
			</el-col>
			<el-col :span="6">
				<el-card class="content2">
					<div class="content">
						<div>
							<div class="equipTitle">在线设备数量(台)</div>
							<span>4</span>
						</div>
						<div>
							<img src="@/assets/dataStatistics/online.png" alt="">
						</div>
					</div>
				</el-card>
			</el-col>
			<el-col :span="6">
				<el-card class="content3">
					<div class="content">
						<div>
							<div class="equipTitle">离线设备数量(台)</div>
							<span>20</span>
						</div>
						<div>
							<img src="@/assets/dataStatistics/offline.png" alt="">
						</div>
					</div>
				</el-card>
			</el-col>
			<el-col :span="6">
				<el-card class="content4">
					<div class="content">
						<div>
							<div class="equipTitle">告警设备数量(台)</div>
							<span>2</span>
						</div>
						<div>
							<img src="@/assets/dataStatistics/disabled.png" alt="">
						</div>
					</div>
				</el-card>
			</el-col>
		</el-row>
		<!-- 统计 -->
		<div class="statisticsContent">
			<!-- 设备资产统计 -->
			<div class="box">
				<div class="top">
					<div class="title">
						<img src="@/assets/dataStatistics/titleLeft.png" alt="">
						<span>设备资产统计</span>
						<div class="unit">单位：台</div>
					</div>
					<div class="line">
						<div class="lineLeft" />
						<div class="lineStright" />
						<div class="lineRight" />
					</div>
				</div>
				<div class="chartMain">
					<div id="property" style="width:100%;height:200px" />
				</div>
			</div>
			<!-- 设备在线率统计 -->
			<div class="box" style="margin: 0 20px">
				<div class="top">
					<div class="title">
						<img src="@/assets/dataStatistics/titleLeft.png" alt="">
						<span>设备在线率统计</span>
						<div class="unit">单位：%</div>
					</div>
					<div class="line">
						<div class="lineLeft" />
						<div class="lineStright" />
						<div class="lineRight" />
					</div>
				</div>
				<div class="chartMain">
					<div id="online" style="width:100%;height:200px" />
				</div>
			</div>
			<!-- 设备故障统计 -->
			<div class="box">
				<div class="top faultTop">
					<div class="title">
						<img src="@/assets/dataStatistics/titleLeft.png" alt="">
						<span>设备故障统计</span>
						<div class="unit">单位：次</div>
					</div>
					<div class="line">
						<div class="lineLeft" />
						<div class="lineStright" />
						<div class="lineRight" />
					</div>
				</div>
				<div class="chartMain" style="margin:0;width:576px;">
					<div id="fault" style="width:100%;height:230px" />
				</div>
			</div>
		</div>
		<!-- 底部 -->
		<div class="bottom" id="bottom">
			<!-- 告警信息 -->
			<div class="box infoBox" style="width:300px">
				<div class="top">
					<div class="title">
						<img src="@/assets/dataStatistics/titleLeft.png" alt="">
						<span>设备资产统计</span>
					</div>
				</div>
				<div v-for="(item,index) in infoList" :key="index" class="bottom-content">
					<div class="contentTitle">
						<img src="@/assets/dataStatistics/data.png" alt="">
						<span>{{ item.title }}</span>
					</div>
					<div v-for="(sub, subIndex) in item.list" :key="subIndex" class="wrap">
						<img src="@/assets/dataStatistics/music.png" alt="">
						<span>{{ sub.title }}</span>
						<div class="num">{{ sub.num }}</div>
					</div>
				</div>
			</div>
			<!-- 最近七天告警数量变化情况 -->
			<div class="box warnBox" style="flex:1">
				<div class="top faultTop">
					<div class="title">
						<img src="@/assets/dataStatistics/titleLeft.png" alt="">
						<span>最近七天告警数量变化情况</span>
						<div class="unit">单位：次</div>
					</div>
					<div class="line">
						<div class="lineLeft" />
						<div class="lineStright" />
						<div class="lineRight" />
					</div>
				</div>
				<div class="chartMain" style="margin:0;">
					<div id="warn" style="width:100%;height:270px" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// 引入echarts
// import $echarts from 'echarts'
import * as $echarts from 'echarts'
import { setWaterMarkAlone } from './utils'
const propertyData = [
	{
		value: 238,
		name: '设备名称1',
	},
	{
		value: 212,
		name: '设备名称2',
	},
	{
		value: 165,
		name: '设备名称3',
	},
	{
		value: 98,
		name: '设备名称4',
	},
	{
		value: 56,
		name: '设备名称5',
	},
]
const onlineData = [
	{
		value: 238,
		name: '设备名称1',
	},
	{
		value: 212,
		name: '设备名称2',
	},
	{
		value: 165,
		name: '设备名称3',
	},
	{
		value: 98,
		name: '设备名称4',
	},
	{
		value: 56,
		name: '设备名称5',
	},
]
const categoryData = [
	'2022.4.21',
	'2022.4.22',
	'2022.4.23',
	'2022.4.24',
	'2022.4.25',
	'2022.4.26',
	'2022.4.27',
	'2022.4.28',
	'2022.4.29',
	'2022.4.30',
	'2022.4.31',
]
export default {
	data() {
		return {
			// 设备资产chart
			propertyChart: '',
			// 设备资产option
			propertyOption: {
				legend: {
					orient: 'vertical',
					icon: 'react',
					right: '3%',
					bottom: '20',
					y: 'center',
					itemWidth: 14,
					itemHeight: 10,
					itemGap: 10,
					align: 'left',
					textStyle: {
						rich: {
							name: {
								color: '#5B6276',
								fontSize: 16,
							},
							value: {
								fontSize: 20,
								padding: [0, 5, 0, 15],
								color: '#0B0F5A',
								fontWeight: 500,
							},
						},
					},
					formatter: function (name) {
						let res = propertyData.filter((v) => v.name === name)
						res = res[0] || {}
						const p = res.value
						return '{name|' + name + '：}' + '{value|' + p + '台}'
					},
				},
				tooltip: {
					show: false,
				},
				series: [
					{
						avoidLabelOverlap: false,
						type: 'pie',
						roseType: 'area', // 玫瑰图
						center: ['20%', '50%'],
						radius: ['40%', '65%'],
						color: ['#6E87FF', '#FB8C2D', '#24C35A', '#168AFE', '#7998FF'],
						label: {
							show: false,
						},
						labelLine: {
							normal: {
								length: 10,
								length2: 25,
							},
						},
						data: propertyData,
						itemStyle: {
							borderColor: '#fff',
							borderWidth: 5,
							borderRadius: 25,
						},
					},
				],
			},
			// 在线率chart
			onlineChart: '',
			// 在线率option
			onlineOption: {
				legend: {
					orient: 'vertical',
					icon: 'react',
					right: '3%',
					y: 'center',
					itemWidth: 14,
					itemHeight: 10,
					itemGap: 10,
					align: 'left',
					textStyle: {
						rich: {
							name: {
								color: '#5B6276',
								fontSize: 16,
							},
							value: {
								fontSize: 20,
								padding: [0, 5, 0, 15],
								color: '#0B0F5A',
								fontWeight: 500,
							},
						},
					},
					formatter: function (name) {
						let res = onlineData.filter((v) => v.name === name)
						res = res[0] || {}
						const p = res.value
						return '{name|' + name + '：}' + '{value|' + p + '台}'
					},
				},
				tooltip: {
					show: false,
				},
				series: [
					{
						avoidLabelOverlap: false,
						type: 'pie',
						center: ['20%', '50%'],
						radius: ['40%', '65%'],
						color: ['#6E87FF', '#FB8C2D', '#24C35A', '#168AFE', '#7998FF'],
						label: {
							show: false,
						},
						labelLine: {
							normal: {
								length: 10,
								length2: 25,
							},
						},
						data: propertyData,
						itemStyle: {
							borderColor: '#fff',
							borderWidth: 5,
							borderRadius: 25,
						},
					},
				],
			},

			// 设备故障chart
			faultChart: '',
			// 设备故障options
			faultOption: {
				grid: {
					top: '35%',
					left: '50',
					right: '20',
					bottom: '15%',
					width: 'auto',
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow',
					},
					// formatter: '{c}次',
				},
				legend: {
					left: '220px',
					top: '-2px',
					icon: 'circle',
					data: ['告警类型', '告警类型2'],
				},
				xAxis: [
					{
						type: 'category',
						data: categoryData,
						axisLabel: {
							show: true, // 显示 x 轴标签
							interval: 0, // 强制显示所有标签
							rotate: 0, // 不旋转标签
						},
						// axisPointer: {
						// 	type: 'shadow',
						// },
					},
				],
				yAxis: [
					{
						type: 'value',
						name: '单位 (次)',
						min: 0,
						max: 20,
					},
				],
				dataZoom: [
					{
						show: false,
						height: 8,
						bottom: 0,
						startValue: 0, // 起始值
						endValue: 5, // 结束值
						showDetail: false,
						fillerColor: 'rgba(1, 132, 213, 0.4)', // 滚动条颜色
						borderColor: 'rgba(17, 100, 210, 0.12)',
						backgroundColor: 'rgba(221, 220, 107, .1)', // 两边未选中的滑动条区域的颜色
						handleSize: 0, // 两边手柄尺寸
						showDetail: false, // 拖拽时是否展示滚动条两侧的文字
						zoomLock: true, // 是否只平移不缩放
						moveOnMouseMove: false, // 鼠标移动能触发数据窗口平移
						// minValueSpan: 5,  // 放大到最少几个
						// maxValueSpan: 5,  //  缩小到最多几个
					},
					{
						type: 'inside', // 支持内部鼠标滚动平移
						start: 0,
						// end: 20,
						startValue: 0, // 从头开始。
						endValue: 5, // 最多5个
						zoomOnMouseWheel: false, // 关闭滚轮缩放
						moveOnMouseWheel: true, // 开启滚轮平移
						moveOnMouseMove: true, // 鼠标移动能触发数据窗口平移
					},
				],
				series: [
					{
						name: '告警类型',
						type: 'bar',
						tooltip: {},
						data: [7, 15, 6, 18, 15, 7, 7, 7, 15, 6, 18, 15],
						barGap: '20%', // 设置不同系列之间的间距
						barCategoryGap: '100%', // 设置同一系列中不同柱状图之间的间距
						barMinWidth: 15,
						color: {
							type: 'linear',
							x: 0, // 右
							y: 0, // 下
							x2: 0, // 左
							y2: 1, // 上
							colorStops: [
								{
									offset: 0,
									color: '#A0D4F9', // 0% 处的颜色
								},
								{
									offset: 1,
									color: '#5A93FF', // 100% 处的颜色
								},
							],
						},
					},
					{
						name: '告警类型2',
						type: 'bar',
						tooltip: {},
						data: [12, 7, 10, 6, 14, 6, 6, 12, 7, 10, 6, 14],
						barGap: '20%', // 设置不同系列之间的间距
						barCategoryGap: '100%', // 设置同一系列中不同柱状图之间的间距
						barMinWidth: 15,
						color: {
							type: 'linear',
							x: 0, // 右
							y: 0, // 下
							x2: 0, // 左
							y2: 1, // 上
							colorStops: [
								{
									offset: 0,
									color: '#ABF1DA', // 0% 处的颜色
								},
								{
									offset: 1,
									color: '#73DEB3', // 100% 处的颜色
								},
							],
						},
					},
				],
			},

			// 告警信息
			infoList: [
				{
					title: '告警中心(当天)',
					icon: 'wran',
					list: [
						{
							title: '告警次数',
							num: 10,
						},
					],
				},
				{
					title: '数据共享情况(当天)',
					icon: 'data',
					list: [
						{
							title: '数据转发API调用失败',
							num: 10,
						},
						{
							title: '数据转发API调用失败',
							num: 10,
						},
					],
				},
				{
					title: '只能远控统计(当天)',
					icon: 'data',
					list: [
						{
							title: '远程维护失败',
							num: 10,
						},
						{
							title: '远程维护失败',
							num: 10,
						},
					],
				},
			],

			// 最近七天告警数量变化情况
			warnChart: '',
			// 告警option
			warnOption: {
				color: ['#7B89FF', '#4EFEAC'],
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow',
					},
					backgroundColor: 'rgba(13, 64, 71, 0.50)',
					borderColor: 'rgba(143, 225, 252, 0.60)',
					padding: 8,
					textStyle: {
						color: '#fff',
					},
				},
				legend: {
					data: ['告警类型1', '告警类型2'],
					// icon: 'triangle',
					itemWidth: 14,
					itemHeight: 14,
					top: 0,
					left: '40%',
					textStyle: {
						fontSize: 14,
						color: '#737A85',
					},
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					top: '30%',
					containLabel: true,
				},
				xAxis: {
					type: 'category',
					axisLine: {
						// 轴线设置
						show: false, // 显示轴线
					},
					axisLabel: {
						textStyle: {
							color: '#737A85', // 更改坐标轴文字颜色
							fontSize: 12, // 更改坐标轴文字大小
						},
					},
					data: [
						'2022.01',
						'2022.02',
						'2022.03',
						'2022.04',
						'2022.05',
						'2022.06',
						'2022.07',
					],
				},
				yAxis: {
					splitLine: {
						show: true,
					},
					axisLabel: {
						textStyle: {
							color: '#737A85', // 更改坐标轴文字颜色
							fontSize: 12, // 更改坐标轴文字大小
						},
					},
				},
				series: [
					{
						name: '告警类型1',
						type: 'line',
						// smooth: true,
						symbol: 'circle',
						symbolSize: 10,
						itemStyle: {
							shadowColor: '#fff',
							shadowBlur: 10,
						},
						label: {
							show: true,
							// position: 'right',
							color: '#333',
						},
						areaStyle: {
							opacity: 0.8,
							color: {
								type: 'linear',
								x: 0, // 右
								y: 0, // 下
								x2: 0, // 左
								y2: 1, // 上
								colorStops: [
									{
										offset: 0,
										color: '#7B89FF', // 0% 处的颜色
									},
									{
										offset: 1,
										color: '#fff', // 100% 处的颜色
									},
								],
							},
						},
						emphasis: {
							focus: 'series',
						},
						data: [300, 332, 322, 434, 390, 485, 501],
					},
					{
						name: '告警类型2',
						type: 'line',
						// smooth: true,
						symbol: 'circle',
						symbolSize: 10,
						itemStyle: {
							shadowColor: '#fff',
							shadowBlur: 10,
						},
						label: {
							show: true,
							// position: 'right',
							color: '#333',
						},
						areaStyle: {
							opacity: 0.8,
							// color: 'RGBA(48, 209, 136, 0.6)',
							color: {
								type: 'linear',
								x: 0, // 右
								y: 0, // 下
								x2: 0, // 左
								y2: 1, // 上
								colorStops: [
									{
										offset: 0,
										color: '#4EFEAC', // 0% 处的颜色
									},
									{
										offset: 1,
										color: '#fff', // 100% 处的颜色
									},
								],
							},
						},
						emphasis: {
							focus: 'series',
						},
						data: [80, 162, 91, 134, 144, 130, 210],
					},
				],
			},
		}
	},
	mounted() {
		this.setPropertyChart()
		this.setOnlineChart()
		this.setFaultChart()
		this.setWranChart()
		setWaterMarkAlone('水印', 'content1')
	},
	methods: {
		// 设置设备资产
		setPropertyChart() {
			const inChart = document.getElementById('property')
			this.propertyChart = $echarts.init(inChart)
			this.propertyChart.setOption(this.propertyOption)
		},
		// 设置在线率
		setOnlineChart() {
			const inChart = document.getElementById('online')
			this.onlineChart = $echarts.init(inChart)
			this.onlineChart.setOption(this.onlineOption)
		},
		// 设置设备故障统计
		setFaultChart() {
			const inChart = document.getElementById('fault')
			this.faultChart = $echarts.init(inChart)
			this.faultChart.setOption(this.faultOption)
		},
		// 设置最近七天告警情况
		setWranChart() {
			const inChart = document.getElementById('warn')
			this.warnChart = $echarts.init(inChart)
			this.warnChart.setOption(this.warnOption)
		},
	},
}
</script>

<style scoped>
.content {
	display: flex;
	justify-content: space-between;
	font-size: 36px;
	font-family: PingFangSC-Semibold, PingFang SC;
	font-weight: 600;
	color: #ffffff;
}
.content1 {
	/* width: 394px; */
	height: 132px;
	border-radius: 8px;
	background-color: hsl(216, 100%, 79%, 0.5);
	/* background: linear-gradient(63deg, #4e94fe 0%, #92bdff 100%); */
}
.content2 {
	/* width: 394px; */
	height: 132px;
	border-radius: 8px;
	background-color: hsl(182, 68%, 66%, 0.5);
	/* background: linear-gradient(63deg, #3dbfc4 0%, #6de0e3 100%); */
}
.content3 {
	/* width: 394px; */
	height: 132px;
	border-radius: 8px;
	background-color: hsl(22, 100%, 82%, 0.5);
}
.content4 {
	/* width: 394px; */
	height: 132px;
	border-radius: 8px;
	background-color: hsl(231, 100%, 90%, 0.5);
}
.equipTitle {
	margin-bottom: 10px;
	font-size: 24px;
}

.product {
	display: flex;
	justify-content: space-between;
	font-size: 14px;
	color: #333333;
	line-height: 20px;
}
.border {
	margin-bottom: 20px;
}
.product img {
	display: inline-block;
	vertical-align: middle;
}
.productNumber {
	margin-top: 20px;
	text-align: center;
}
.productNumber span {
	font-size: 12px;
	margin-top: 30px;
}
.alarmView {
	border: 1px solid #ffffff;
	background: #ffffff;
	border-radius: 2px;
	padding: 24px 10px 24px 10px;
}
.alarmCenter .el-card {
	background: #f7f7f7;
	color: #606266;
	margin-top: 20px;
}
.text {
	font-size: 14px;
	color: #606266;
	line-height: 20px;
	display: flex;
	justify-content: space-between;
	margin-bottom: 10px;
}
.span-dot {
	width: 8px;
	height: 8px;
	background: #979797;
	border: 1px solid #979797;
	border-radius: 50%;
}
.statistics {
	border: 1px solid #ffffff;
	background: #ffffff;
	border-radius: 2px;
	padding: 8px 10px 0px 10px;
	height: 320px;
	width: 100%;
}
.platform {
	border: 1px solid #ffffff;
	background: #ffffff;
	border-radius: 2px;
	color: #000000;
	line-height: 17px;
	font-size: 12px;
	padding: 11px 13px 0px 13px;
	height: 320px;
}
.platform-title {
	font-size: 18px;
	line-height: 25px;
}
.platform-content {
	display: flex;
	justify-content: space-between;
	margin-top: 20px;
	font-size: 12px;
	line-height: 17px;
}
</style>

<style lang="scss" scoped>
/* 该样式将应用于所有的滚动条 */
::-webkit-scrollbar {
	width: 0;
	/* 宽度设置为 0，滚动条就会消失 */
}
/* 统计 */
.statisticsContent,
.bottom {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 20px;
	.box {
		border-radius: 10px;
		position: relative;
		background-color: #fff;
		padding: 20px;
		height: 256px;
		flex: 1;
		display: flex;
		flex-direction: column;
		.title {
			display: flex;
			align-items: center;
			margin-bottom: 9px;
			img {
				width: 24px;
				height: 14px;
				margin-right: 10px;
			}
			.unit {
				margin-left: auto;
			}
		}
		.line {
			display: flex;
			align-items: center;
			.lineLeft,
			.lineRight {
				width: 5px;
				height: 5px;
				border-radius: 3.2px;
				background: #5b6276;
				opacity: 0.34;
			}
			.lineStright {
				flex: 1;
				height: 1px;
				border-radius: 0.2px;
				background: #5b6276;
				opacity: 0.34;
				margin: 0 5px;
			}
		}
		.chartMain {
			margin: 10px 0;
			flex: 1;
		}
		.faultTop {
			width: 100%;
			position: absolute;
			top: 20px;
			.title {
				width: 100%;
			}
			.unit {
				position: absolute;
				right: 40px;
			}
			.line {
				width: calc(100% - 40px);
			}
		}
	}
}
.bottom {
	.infoBox {
		flex: none;
		margin-right: 20px;
		overflow: auto;
		height: 300px;
		.bottom-content {
			margin: 10px 0;
			background-color: #f6f9ff;
			border-radius: 8px;
			padding: 0 10px;
			.contentTitle,
			.wrap {
				display: flex;
				align-items: center;
				margin: 10px 0;
				img {
					width: 14px;
					height: 14px;
					margin-right: 10px;
				}
				.num {
					margin-left: auto;
				}
			}
			.contentTitle {
				font-size: 18px;
				img {
					width: 18px;
					height: 18px;
				}
			}
			.wrap {
				font-size: 16px;
				color: #666666;
			}
		}
	}
	.warnBox {
		flex: none;
		height: 300px;
	}
}
</style>
