<template>
	<!-- 核心指标 -->
	<div class="target">
		<i class="web-icon-addFile web-iconfont"></i>好好
		<!-- 卡片 -->
		<DepartmentCard ref="DepartmentCardRef" :CardData="ItemData" :currModel="currModel" @changeOperation="changeOperation" @currModelChange="currModelChange"></DepartmentCard>
		<div class="DomesticProduction">

			<!-- 图表 -->
			<div class="DomesticProduction-left">
				<CardView :CardData="chartCardName">
					<template v-slot:main>
						<chart-bar-line class="chart" :data="targetChartData"></chart-bar-line>
					</template>
				</CardView>
			</div>
			<!-- 表格 -->
			<div class="DomesticProduction-right">
				<CardView :CardData="tableCardName">
					<template v-slot:headerRight>
						<div class="CardView-header-tab">
							<span style="fontWeight: 500;color:#0b0f5a">（根据tr的名称来自定义插槽，并支持子组件像父组件用{value}传参来动态渲染)</span>
							单位：{{ table.unit }}
						</div>
					</template>
					<template v-slot:main>
						<div v-if="table?.data?.length">
							<CommonTable :table="table" :headerStyle="{'padding':'5px','border':'none','height':'40px','line-height':'0' }">

								<!-- 插槽 -->
								<template v-slot:name="{value}">
									<span class="company_name" style="color:#4B67F8;font-size: 22*$base;font-weight: 600; text-align:center;" @click="handleCompany(value)">{{value}}</span>
								</template>
								<template #sum_plan="{ value }">
									<div :style="{ color: (value>100 ? '#47D192' : value<0 ? '#FF6565' : '#0B0F5A') }">
										{{ value?`${value.toFixed(2)}%`:'--' }}</div>
								</template>
								<template #sum_yoy="{ value }">
									<div :style="{ color: (value>100 ? '#47D192' : value<0 ? '#FF6565' : '#0B0F5A') }">
										{{ value?`${value.toFixed(2)}%`:'--' }}</div>
								</template>
							</CommonTable>
						</div>

					</template>
				</CardView>
			</div>
		</div>

	</div>
</template>

<script lang='ts' setup>
import DepartmentCard from '@/components/DepartmentCard/index.vue'
import CommonTable from '@/components/CommonTable/index.vue'
import { targetChartData } from './config'
import {
	ref,
	reactive,
	watch,
	onMounted,
	getCurrentInstance,
	ComponentInternalInstance,
} from 'vue'
// import useUserStore from '@/store/project'
import { fontSizeWidth, fontSize } from '@/utils/rem'
import { fliter_finance_img } from '@/utils/img-enum.ts'
// const store = useUserStore()

// 卡片数据
const ItemData = reactive([
	{
		title: '总资产',
		custom: false,
		des: '亿元',
		icon: fliter_finance_img('碳排总量'),
		financial_title: '总资产',
		financial_val: '3539.66',
		financial_name: '同/环比',
		financial_yoy: 21, // 同比
		financial_mom: -12, // 环比
		tips: '',
	},
	{
		title: '资产负债率',
		custom: false,
		des: '',
		icon: fliter_finance_img('碳排总量'),
		financial_title: '负债率',
		financial_val: '3539.66',
		financial_name: '同/环比',
		financial_yoy: 21, // 同比
		financial_mom: -12, // 环比
		tips: '',
	},
])
const currModel = ref(ItemData[0])

const currModelChange = (val: any) => {
	currModel.value = val
	chartCardName.title = `${val.title}趋势`
	tableCardName.title = `${val.title}情况`
}

const { proxy } = getCurrentInstance() as ComponentInternalInstance
const table = reactive({
	unit: '亿元',
	...proxy?.$CommonTableConfig(false, false, false, false),
	tableHeight: 550,
	hasShowSummary: true,
	data: [
		{
			name: 'xxxx公司xx公司xx公司xx公司xx公司公司',
			sum_fact: '11',
			sum_plan: '22',
			sum_yoy: 150.22222222,
		},
		{
			name: 'xx公司',
			sum_fact: '11',
			sum_plan: '22',
			sum_yoy: -50,
		},
		{
			name: 'xx公司',
			sum_fact: '11',
			sum_plan: '22',
			sum_yoy: -20,
		},
		{
			name: 'xx公司',
			sum_fact: '11',
			sum_plan: '22',
			sum_yoy: 20,
		},
		{
			name: 'xx公司',
			sum_fact: '11',
			sum_plan: '22',
			sum_yoy: 2,
		},
	],

	tr: [
		{
			id: '1',
			label: '公司名称',
			prop: 'name',
			show: 'template',
			align: 'left',
			// width: fontSizeWidth(350),
		},
		{
			id: '2',
			label: '总资产',
			prop: 'sum_fact',
			align: 'right',
			sortable: true,
			show: true,
		},
		{
			id: '3',
			label: '同比',
			prop: 'sum_plan',
			align: 'right',
			sortable: true,
			perUnit: '%',
			// show: 'template',
		},
		{
			id: '4',
			label: '环比',
			prop: 'sum_yoy',
			align: 'right',
			show: 'template',
			perUnit: '%',
			sortable: true,
		},
	],
	needUnit: true,
})

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

onMounted(() => {})
</script>

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
.target {
	width: 100%;
	height: 100%;
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
