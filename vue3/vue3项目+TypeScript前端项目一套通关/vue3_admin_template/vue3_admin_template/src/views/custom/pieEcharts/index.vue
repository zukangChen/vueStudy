<template>
	<div class="pieEcharts">
		<el-tabs :tab-position="curTab" style="height: 200px" class="demo-tabs">
			<el-tab-pane v-for="(item, index) in tabs" :key="index" :label="item.name">
				<div class="box" v-if="item.name === '图表一'">
					<div class="content">
						<CardView :CardData="{title: '饼图1'}">
							<template v-slot:headerRight>
								<div class="Cardright">单位：个</div>
							</template>
							<template v-slot:main>
								<div class="CardCont CardContheader">
									<test v-if="chartData1.data.length > 0" class="chart chart-pie-hum" :data="chartData1"></test>
									<div v-else class="noContentData"><img :src="noData"><span class="noDataText">暂无数据</span></div>
								</div>
							</template>
						</CardView>
					</div>
					<div class="content">
						<CardView :CardData="{title: '饼图2'}">
							<template v-slot:headerRight>
								<div class="Cardright">单位：个</div>
							</template>
							<template v-slot:main>
								<div class="CardCont CardContheader">
									<chart-pie v-if="chartData2.data.length > 0" class="chart chart-pie-hum" :data="chartData2"></chart-pie>
									<div v-else class="noContentData"><img :src="noData"><span class="noDataText">暂无数据</span></div>
								</div>
							</template>
						</CardView>
					</div>
				</div>
				<template v-else>
					{{item.name}}
				</template>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import test from '@/components/Echarts/test.vue'
// import chartPie from '@/components/Echarts/pie.vue'
import CardView from './components/cardView.vue'
import { chartData1, chartData2 } from './config.ts'
import noData from '@/assets/header/noData.png'

const curTab = ref('图表一')
const tabs = reactive([
	{
		name: '图表一',
	},
	{
		name: '图表二',
	},
])
</script>
<style>
.demo-tabs > .el-tabs__content {
	padding: 32px;
	color: #6b778c;
	font-size: 32px;
	font-weight: 600;
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
	height: 100%;
}
</style>

<style lang="scss" scoped>
.chart {
	width: 100%;
	height: 240 * $base;
}
.education {
	width: 100%;
	height: 460 * $base;
	background: #ffffff;
	margin-bottom: 20 * $base;
}
.pieEcharts {
	width: 100%;
	height: 100%;
	.box {
		display: flex;
		.content {
			flex: 1;
		}
	}
}
</style>
