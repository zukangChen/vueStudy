<template>
	<!-- 利润因素分析 -->
	<div class="profit">
		<!-- 卡片 -->
		<DepartmentCard ref="DepartmentCardRef" :CardData="ItemData" :currModel="currModel" @changeOperation="changeOperation" @currModelChange="currModelChange"></DepartmentCard>
		<!-- <shareholders v-if="currModel.id === '1'"></shareholders> -->
		<div class="DomesticProduction">

			<!-- 图表 -->
			<div class="DomesticProduction-left">
				<CardView :CardData="chartCardName">
					<template v-slot:headerRight>
						<el-select v-model="curSelectName" popper-class="mySelect" @change="currentSelectNameChange">
							<el-option v-for="item in selectOptions" :key="item" :label="item" :value="item"></el-option>
						</el-select>
					</template>
					<template v-slot:main>
						<chart-bar v-if="profitChartData.data[0]?.data?.length && profitChartData.names.length" class="chart" :data="profitChartData"></chart-bar>
						<div v-else class="noContentData"><img :src="noData"><span class="noDataText">暂无数据</span></div>
					</template>
				</CardView>
			</div>
			<!-- 表格 -->
			<div class="DomesticProduction-right">
				<CardView :CardData="tableCardName">
					<template v-slot:headerRight>
						单位：万美元
					</template>
					<template v-slot:main>

						<CommonTable v-if="table.data.length" :table="table" :headerStyle="{'padding':'5px','border':'none','height':'40px','line-height':'0' }">
							<template v-slot:name="{value}">
								<span class="company_name" style="color:#4B67F8;font-size: 22*$base;font-weight: 600; text-align:center;cursor:pointer" @click="handleCompany(value)">{{value}}</span>
							</template>
							<template #sum_yoy="{ value }">
								<div :style="{ color: (value>100 ? '#47D192' : value<0 ? '#FF6565' : '#0B0F5A') }">
									{{ value?`${value.toFixed(2)}%`:'--' }}</div>
							</template>
						</CommonTable>
					</template>
				</CardView>
			</div>
		</div>

	</div>
</template>

<script lang='ts' setup>
import DepartmentCard from '@/components/DepartmentCard/index.vue'
import CommonTable from '@/components/CommonTable/index.vue'
import { profitChartData } from './config'
// import { api_dp_abroad_fin_profit_analysis_nf } from '@/api/InternationalFinancialBudget.ts'
import noData from '@/assets/header/noData.png'
import {
	ref,
	reactive,
	watch,
	onMounted,
	getCurrentInstance,
	ComponentInternalInstance,
} from 'vue'
// import useUserStore from '@/store/project'
import { fontSize } from '@/utils/rem'
import { fliter_finance_img } from '@/utils/img-enum.ts'
// import triangle from '@/components/Triangle/index.vue'
import router from '@/router'
// import shareholders from './shareholders.vue'
// const store = useUserStore()
// 卡片数据
const ItemData = reactive([
	{
		title: '归母净利润',
		// sonTitle: '归母净利润情况',
		custom: true,
		des: '',
		icon: fliter_finance_img('归母净利润'),
		id: '1',
	},
	{
		title: '利润因素分析',
		// sonTitle: '吨矿综合付现成本情况',
		custom: true,
		des: '',
		icon: fliter_finance_img('利润因素分析'),
		id: '2',
	},
])
const currModel = ref(ItemData[0])
const curSelectName = ref('全部')
const selectOptions = ref(['全部'])
function currentSelectNameChange(val) {
	console.log('val', val)
	curSelectName.value = val
	curCompany.value = val
	chartCardName.title =
		val !== '全部' ? val + '趋势' : currModel.value.title + '趋势'
	// getChart()
}

const changeOperation = (val: string) => {}

// 图表数据
const chartCardName = reactive({
	title: `${ItemData[0].title}趋势`,
	tip: '',
})

// 表格数据
const tableCardName = reactive({
	title: `${ItemData[0].title}情况`,
	tip: '',
})
// 当前表格选中的企业名称
const curCompany = ref('')
const { proxy } = getCurrentInstance() as ComponentInternalInstance

const table = reactive({
	unit: '亿元',
	...proxy?.$CommonTableConfig(false, false, false, false),
	tableHeight: fontSize(550),
	// hasShowSummary: true,
	data: [
		{
			name: 'xxxx公司xx公司xx公司xx公司xx公司公司',
			price: '11',
			sales: 150.22222222,
			grade: '11',
			cost: '22',
			period: 150.22222222,
			taxes: 150.22222222,
			profit: 150.22222222,
		},
	],
	tr: [
		{
			id: '1',
			label: '企业',
			prop: 'name',
			show: 'template',
			align: 'left',
			// width: fontSizeWidth(350),
		},
		{
			id: '2',
			label: '价格变动',
			prop: 'price',
			align: 'right',
			sortable: true,
			show: true,
		},
		{
			id: '3',
			label: '销量变动',
			prop: 'sales',
			align: 'right',
			sortable: true,
			// show: 'template',
		},
		// {
		// 	id: '4',
		// 	label: '品位变动',
		// 	prop: 'grade',
		// 	align: 'right',
		// 	// show: 'template',
		// 	sortable: true,
		// },
		{
			id: '5',
			label: '单位金属销售成本变动',
			prop: 'cost',
			align: 'right',
			sortable: true,
			show: true,
		},
		{
			id: '6',
			label: '期间费用变动',
			prop: 'period',
			align: 'right',
			sortable: true,
			show: true,
		},
		{
			id: '7',
			label: '税金变动',
			prop: 'taxes',
			align: 'right',
			sortable: true,
			show: true,
		},
		{
			id: '8',
			label: '利润合计',
			prop: 'profit',
			align: 'right',
			sortable: true,
			show: true,
		},
	],
	// needUnit: true,
})

const currModelChange = (val: any) => {
	currModel.value = val
	curCompany.value = '' // 当前选中的企业名称
	chartCardName.title = `${val.title}趋势`
	tableCardName.title = `${val.title}情况`
	getChart()
	getTable()
}

// 获取左侧图表
// const getChart = () => {
// 	profitChartData.data.forEach((item) => {
// 		item.data = []
// 	})
// 	const params = {
// 		params: {
// 			index_type: '趋势', //指标类型
// 			company_name: curCompany.value || '1', //传1取合计趋势，传企业名取企业趋势
// 			index_name: currModel.value.title, //指标名称
// 			biz_date: store.frameworkDate.replace(/-/g, ''), //日期
// 		},
// 	}
// 	api_dp_abroad_fin_profit_analysis_nf(params).then((res) => {
// 		// console.log('res2', res)

// 		const item = res?.data?.content?.[0]
// 		if (!item) return
// 		let xNames = [
// 			// 'plan_lr',
// 			'value_dj',
// 			'value_xl',
// 			// 'value_pw',
// 			'value_cb',
// 			'value_sj',
// 			'value_qjfy',
// 			// 'value_lr',
// 		]
// 		let arr = xNames.map((name) => item[name])
// 		profitChartData.data[5].data = [
// 			// 汇总值
// 			item.plan_lr,
// 			'-',
// 			'-',
// 			// '-',
// 			'-',
// 			'-',
// 			'-',
// 			item.value_lr,
// 		] // 汇总值
// 		let sum = item.plan_lr // 总量数据
// 		let updata = [] // 增加
// 		let downdata = [] // 减少
// 		let auxdata = [] //总量辅助，存放每个堆子的总数
// 		let auxdataDown = [] // 减少的辅助数据，当堆子跨y轴的正负区域的时候做的辅助
// 		let auxdataUp = [] // 增加的辅助数据，当堆子跨y轴的正负区域的时候做的辅助
// 		arr.forEach((item, index) => {
// 			let sign = sum + item
// 			if (sign > 0) {
// 				if (item > 0) {
// 					if (sum < 0) {
// 						//这种情况的时候柱子要从负数跨到正数，增加的时候会出现的情况，所以是增加辅助存放sum，其余辅助存放0
// 						updata.push(sign)
// 						auxdataUp.push(sum)
// 						auxdataDown.push(0)
// 						auxdata.push(0)
// 					} else {
// 						auxdata.push(sum)
// 						updata.push(item)
// 						auxdataUp.push(0)
// 						auxdataDown.push(0)
// 					}
// 					downdata.push('-')
// 				} else {
// 					auxdata.push(sign)
// 					updata.push('-')
// 					downdata.push(Math.abs(item))
// 					auxdataDown.push(0)
// 					auxdataUp.push(0)
// 				}
// 			} else {
// 				if (item > 0) {
// 					auxdata.push(sign)
// 					updata.push(-item)
// 					downdata.push('-')
// 					auxdataDown.push(0)
// 					auxdataUp.push(0)
// 				} else {
// 					updata.push('-')
// 					if (sum > 0) {
// 						//这种情况的时候柱子要从正数跨到负数，支出数据的情况，所以这时候是支出辅助存放sum，其余辅助存放0
// 						downdata.push(sign)
// 						auxdataDown.push(sum)
// 						auxdataUp.push(0)
// 						auxdata.push(0)
// 					} else {
// 						downdata.push(item)
// 						auxdataDown.push(0)
// 						auxdataUp.push(0)
// 						auxdata.push(sum)
// 					}
// 				}
// 			}
// 			sum = sum + item
// 		})

// 		profitChartData.data[0].data = [0, ...auxdata, 0]
// 		profitChartData.data[1].data = ['-', ...updata, '-']
// 		profitChartData.data[2].data = ['0', ...auxdataUp, '-']
// 		profitChartData.data[3].data = ['-', ...downdata, '-']
// 		profitChartData.data[4].data = ['0', ...auxdataDown, '-']
// 		// console.log('总量柱子', profitChartData.data[0].data)
// 		// console.log('增加', profitChartData.data[1].data)
// 		// console.log('增加辅助', profitChartData.data[2].data)
// 		// console.log('减少', profitChartData.data[3].data)
// 		// console.log('减少辅助', profitChartData.data[4].data)
// 	})
// }

// 获取右侧表格
// const getTable = () => {
// 	table.data = []
// 	selectOptions.value = ['全部']
// 	const params = {
// 		params: {
// 			index_type: '明细', //指标类型
// 			index_name: currModel.value.title, //指标名称
// 			biz_date: store.frameworkDate.replace(/-/g, ''), //日期
// 		},
// 	}
// 	api_dp_abroad_fin_profit_analysis_nf(params).then((res) => {
// 		const data = res?.data?.content
// 		if (!data) return
// 		table.data = data.map((item) => {
// 			selectOptions.value.push(item.company_name)
// 			return {
// 				name: item.company_name,
// 				price: item.value_dj, //价格变动
// 				sales: item.value_xl, //销量变动
// 				grade: item.value_pw, //品味变动
// 				cost: item.value_cb, //成本变动
// 				period: item.value_qjfy, //期间费用变动
// 				taxes: item.value_sj, //税金变动
// 				profit: item.value_lr, //利润变动
// 				unit: item.unit, // 单位
// 			}
// 		})
// 	})
// }
// 点击表格企业名称
const handleCompany = (value) => {
	curCompany.value = value
	curSelectName.value = value
	chartCardName.title = value + '趋势'
	// getChart()
}
const init = () => {
	// getChart()
	// getTable()
}

// 监听右上角日期
// watch(
// 	() => store.frameworkDate,
// 	(val) => {
// 		curCompany.value = '' // 当前选中的企业名称
// 		curSelectName.value = '全部'
// 		chartCardName.title = currModel.value.title + '趋势'
// 		init()
// 	},
// )
onMounted(() => {
	// init()
	setTimeout(() => {
		table.data.push({
			name: 'xxxx公司xx公司xx公司xx公司xx公司公司',
			price: '11',
			sales: 150.22222222,
			grade: '11',
			cost: '22',
			period: 150.22222222,
			taxes: 150.22222222,
			profit: 150.22222222,
		})
	})
})
</script>
<style lang="scss">
@import '@/styles/mixin.scss';
.el-popper.is-light.mySelect {
	@include select_option;
}
</style>
<style lang='scss' scoped>
.CardView-header-tab {
	padding-top: 0 * $base;
	::v-deep .header {
		width: 100%;
		.header_tab {
			width: 100%;
			padding: 0;
			ul li:last-child {
				margin-right: 4 * $base;
			}
		}
	}
}
:deep(.el-table__footer-wrapper) {
	td {
		text-align: right !important;
	}
	td:first-child {
		text-align: left !important;
	}
}
.profit {
	width: 100%;
	height: 100%;
	.noContentData {
		height: 550 * $base;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		img {
			width: 60 * $bs;
			height: 60 * $bs;
		}
		.noDataText {
			line-height: 50 * $bs;
			padding-left: 10 * $bs;
			font-size: 16 * $bs;
		}
	}
}
.DomesticProduction {
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: 0 * $base;
	margin-top: 20 * $base;
	.DomesticProduction-left {
		position: relative;
		width: 50%;
		height: 630 * $base;
		background: #ffffff;
		border-radius: 6 * $base;
		margin-right: 24 * $base;
		.el-select {
			position: absolute;
			z-index: 999;
			right: 30 * $base;
			top: 15 * $base;
			border-radius: 2 * $base;
			::v-deep .el-input__wrapper {
				background-image: linear-gradient(180deg, #f3f5ff 0%, #d6deff 100%);
				border: 1 * $base solid #b9c0ffe6;
				width: 142 * $base;
				height: 36 * $base;
				border-radius: 2 * $base;
				font-family: PingFangSC-Medium;
				font-weight: 500;
				font-size: 18 * $base;
			}

			::v-deep .el-input__inner {
				color: #6871e9;
			}
		}
		.chart {
			width: 100%;
			height: 535 * $base;
		}

		.Cardright {
			width: 400 * $base;
			display: flex;
			justify-content: space-between;
			font-family: DIN-Bold;
			font-weight: 700;
			align-items: center;

			.value1 {
				color: #0b0f5a;
				font-size: 24 * $base;
				padding-left: 5 * $base;
			}

			.value2 {
				color: red;
				font-size: 24 * $base;
			}
		}
	}

	.DomesticProduction-right {
		width: 50%;
		height: 630 * $base;
		background: #ffffff;
		border-radius: 6 * $base;
		margin-right: 0 * $base;

		:deep #bottomRight {
			padding: 0 20 * $base;
		}
	}
}
</style>
