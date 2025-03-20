<template>
	<!-- 经营情况 -->
	<div class="business">
		<!-- 卡片 -->
		<div class="DomesticProduction">

			<!-- 图表 -->
			<div class="DomesticProduction-left">
				<CardView :CardData="{...chartCardName, tip:remark[currModel.title+ '趋势']?.remark_info}" @refreshBox="refresh">
					<template v-slot:main>
						<chart-bar-line v-if="businessChartData.names.length" class="chart" :data="businessChartData"></chart-bar-line>
						<div v-else class="noContentData"><img :src="noData"><span class="noDataText">暂无数据</span></div>
					</template>
				</CardView>
			</div>
			<!-- 表格 -->
			<div class="DomesticProduction-right">
				<CardView :CardData="{...tableCardName, tip:remark[currModel.title+ '明细']?.remark_info}">
					<template v-slot:main>

						<CommonTable :table="table" :headerStyle="{'padding':'5px','border':'none','height':'40px','line-height':'0' }">
							<template v-slot:name="{value}">
								<span class="company_name" style="color:#4B67F8;font-size: 22*$base;font-weight: 600; text-align:center;cursor:pointer" @click="handleCompany(value)">{{value}}</span>
							</template>

							<template #sum_fact="{value, row}">
								<div v-if="['收入利润率'].includes(currModel.title)" :style="{ color: (value>100 ? '#47D192' : value<0 ? '#FF6565' : '#0B0F5A') }">
									{{ value?`${value.toFixed(2)}%`:'--' }}</div>
								<div v-else :style="{color:value < 0 ?'#FF6565':''}" v-html="value? ['自由现金流', 'CAPEX', '回款'].includes(currModel.title)?`${value.toFixed(2)}${row?.unit}`:getValueUnit(Number(value),2):'--'"></div>
							</template>
							<template #sum_plan="{value, row}">
								<div v-if="['收入利润率'].includes(currModel.title)" :style="{ color: (value>100 ? '#47D192' : value<0 ? '#FF6565' : '#0B0F5A') }">
									{{ value?`${value.toFixed(2)}%`:'--' }}</div>
								<div v-else :style="{color:value < 0 ?'#FF6565':''}" v-html="value? ['自由现金流', 'CAPEX', '回款'].includes(currModel.title)?`${value.toFixed(2)}${row?.unit}`:getValueUnit(Number(value),2):'--'"></div>
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
import { getValueUnit } from '@/utils'
import DepartmentCard from '@/components/DepartmentCard/index.vue'
import CommonTable from '@/components/CommonTable/index.vue'
import { businessChartData } from './config'
import noData from '@/assets/header/noData.png'

import { api_dp_abroad_fin_operation_nf } from '@/api/InternationalFinancialBudget.ts'
import { api_remark_info_nf } from '@/api/Project/group'
import {
	computed,
	ref,
	reactive,
	watch,
	onMounted,
	getCurrentInstance,
	ComponentInternalInstance,
} from 'vue'
import useUserStore from '@/store/project'
import { fontSizeWidth, fontSize } from '@/utils/rem'
import { fliter_finance_img } from '@/utils/img-enum.ts'
const store = useUserStore()
import router from '@/router'

// 卡片数据
const ItemData = reactive(
	router['tabs']([
		{
			title: '归母净利润',
			// sonTitle: '归母净利润情况',
			custom: true,
			des: '',
			icon: fliter_finance_img('归母净利润'),
			id: '1',
		},
	])
)
const currModel = ref(ItemData[0])

const changeOperation = (val: string) => {}

// 图表数据
const chartCardName = reactive({
	title: `${ItemData[0].title}趋势`,
	tip: '',
	refresh: true,
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
		// {
		// 	name: 'xxxx公司xx公司xx公司xx公司xx公司公司',
		// 	sum_fact: '11',
		// 	sum_plan: '22',
		// 	sum_yoy: 150.22222222,
		// },
	],

	tr: [
		{
			id: '1',
			label: '公司名称',
			prop: 'name',
			show: 'template',
			sortable: true,
			align: 'left',
			// width: fontSizeWidth(350),
		},
		{
			id: '2',
			label: '月累计',
			prop: 'sum_fact',
			align: 'right',
			sortable: true,
			// show: true,
			show: 'template',
		},
		{
			id: '3',
			label: '月计划',
			prop: 'sum_plan',
			align: 'right',
			sortable: true,
			show: 'template',
		},
		{
			id: '4',
			label: '月同比',
			prop: 'sum_yoy',
			align: 'right',
			show: 'template',
			perUnit: '%',
			sortable: true,
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

const refresh = () => {
	chartCardName.title = currModel.value.title + '趋势'
	curCompany.value = ''
	getChart()
}

// 获取左侧图表
const getChart = () => {
	businessChartData.names = []
	businessChartData.data.forEach((item) => {
		item.data = []
	})
	businessChartData.customYAxis[0].name = ''
	const params = {
		params: {
			index_type: '趋势', //指标类型
			company_name: curCompany.value || '1', //传1取合计趋势，传企业名取企业趋势
			index_name: currModel.value.title, //指标名称
			biz_date: store.frameworkDate.replace(/-/g, ''), //日期
		},
	}
	api_dp_abroad_fin_operation_nf(params).then((res) => {
		console.log('res', res)
		const data = res?.data?.content
		if (!data) return
		data.forEach((item) => {
			businessChartData.names.push(
				`${item.biz_date.slice(2, 4)}/${item.biz_date.slice(-2)}`
			)
			businessChartData.data[0].data.push(item.value_mon)
			businessChartData.data[0].unit = item.unit || ''
			businessChartData.data[1].unit = item.unit || ''
			if (item.unit) {
				businessChartData.customYAxis[0].name = `单位：${item.unit}`
			}

			businessChartData.data[1].data.push(item.plan_mon)
			businessChartData.data[2].data.push(item.value_mon_yoy)
		})
	})
}

// 获取右侧表格
const getTable = () => {
	table.data = []
	table.tr[1].sortable = !['自由现金流', 'CAPEX'].includes(
		currModel.value.title
	) // '自由现金流', 'CAPEX'的月累计和月计划不做排序
	table.tr[2].sortable = !['自由现金流', 'CAPEX'].includes(
		currModel.value.title
	)
	const params = {
		params: {
			index_type: '明细', //指标类型
			index_name: currModel.value.title, //指标名称
			biz_date: store.frameworkDate.replace(/-/g, ''), //日期
		},
	}
	api_dp_abroad_fin_operation_nf(params).then((res) => {
		console.log('res', res)

		const data = res?.data?.content
		if (!data) return
		table.data = data.map((item) => {
			return {
				name: item.company_name,
				sum_fact: item.value_mon, //月累计
				sum_plan: item.plan_mon, // 月计划
				sum_yoy: item.value_mon_yoy, // 月同比
				unit: item.unit,
			}
		})
	})
}
// 点击表格企业名称
const handleCompany = (value) => {
	curCompany.value = value
	chartCardName.title = value + '趋势'
	getChart()
}
const init = () => {
	getChart()
	getTable()
}
// 监听右上角日期
watch(
	() => store.frameworkDate,
	(val) => {
		curCompany.value = '' // 当前选中的企业名称
		chartCardName.title = currModel.value.title + '趋势'
		init()
	}
)

// 卡片备注
const remark = ref({})
// 获取卡片备注信息
function getMark() {
	const params = {
		params: {
			dp_type_id: '3', // 第一个传参 1是集团页 2：部门页 3：国际页
			plate_id: '4', // 第二个传参是集团页tab 建设是10
			tab_id: '3', // 第三个传参是部门页tab
		},
	}
	api_remark_info_nf(params).then((res) => {
		remark.value = {}
		if (!res.data.content) return
		res.data.content.forEach((item) => {
			remark.value[item.target_name] = item
		})
		ItemData.forEach((item, index) => {
			item.tips = remark.value[item.title + 'tab']?.remark_info
		})
	})
}
onMounted(() => {
	init()
	getMark()
})
</script>

<style lang='scss' scoped>
:deep(.init-transparent) {
	display: flex !important;
	align-items: center !important;
}
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
.business {
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
		width: 50%;
		height: 630 * $base;
		background: #ffffff;
		border-radius: 6 * $base;
		margin-right: 24 * $base;

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
