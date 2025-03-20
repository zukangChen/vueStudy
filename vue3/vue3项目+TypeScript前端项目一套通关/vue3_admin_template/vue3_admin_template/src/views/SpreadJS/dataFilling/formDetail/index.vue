<!-- 表单明细 -->
<template>
	<div class="formDetail">
		<el-radio-group v-model="tabName" size="large" style="margin-bottom: 20px" @change="tabChange">
			<el-radio-button value="完整报表">完整报表</el-radio-button>
			<el-radio-button value="电量填报">电量填报</el-radio-button>
			<el-radio-button value="生产运营用电">生产运营用电</el-radio-button>
			<el-radio-button value="非生产运营用电">非生产运营用电</el-radio-button>
			<el-radio-button value="尖峰用电">尖峰用电</el-radio-button>
			<el-radio-button value="力调电费">力调电费</el-radio-button>
			<el-radio-button value="其他电费">其他电费</el-radio-button>
			<el-radio-button value="收缴情况">收缴情况</el-radio-button>
		</el-radio-group>
		<div class="spreadBox">
			<SpreadSheet v-if="tabName === '完整报表'" :spreadObj="spreadObj" />
			<!-- <TestTable v-if="tabName === '完整报表'" :spreadObj="spreadObj" /> -->
			<component v-else :is="SpreadSheetEdit" :spreadObj="spreadObj" :key="tabName"></component>
			<!-- <SpreadSheetEdit v-else :spreadObj="spreadObj"></SpreadSheetEdit> -->
			<!-- <SpreadSheetEdit v-else-if="tabName === '电量填报'" :spreadObj="spreadObj"></SpreadSheetEdit>
			<SpreadSheetEdit v-else-if="tabName === '生产运营用电'" :spreadObj="spreadObj"></SpreadSheetEdit> -->

		</div>
	</div>

</template>
 
<script setup>
import TestTable from '@/views/power/components/testTable'
import SpreadSheet from '../../components/SpreadSheet.vue'
import SpreadSheetEdit from '@/views/power/components/SpreadSheetEdit'
import { computed, onMounted, ref, reactive } from 'vue'
import { headMap, tableDataMap } from './detail'

const tabName = ref('完整报表') // 当前tab名称
const spreadObj = ref({
	rowHeader: [],
	tableData: [
		[
			'2024',
			'1号线',
			'创新大道主所',
			'游乐变',
			'上旬',
			'12',
			'1',
			'2',
			'3',
			'5',
			'6',
			'7',
			'8',
		],
		[
			'2014',
			'1号线',
			'创新大道主所',
			'科学城变',
			'下旬',
			'12',
			'1',
			'2',
			'3',
			'5',
			'6',
			'7',
			'8',
		],
		[
			'2014',
			'1号线',
			'大东门开闭所',
			'游乐变',
			'上旬',
			'12',
			'1',
			'2',
			'3',
			'5',
			'6',
			'7',
			'8',
		],
		[
			'2014',
			'1号线',
			'大东门开闭所',
			'科学城变',
			'下旬',
			'12',
			'1',
			'2',
			'3',
			'5',
			'6',
			'7',
			'8',
		],
	],
	columnCount: 13, // 列数
})
onMounted(() => {
	tabChange('完整报表')
})
const tabChange = (tabVal) => {
	console.log('tabval', tabVal)
	spreadObj.value.rowHeader = headMap[tabVal]
	spreadObj.value.columnCount = getColumnCount(headMap[tabVal])
	spreadObj.value.tableData = tableDataMap[tabVal]
	getTableData(tabVal)
}
const getTableData = (tabVal) => {
	console.log('根据不同tab获取不同的表格数据', tabVal)
}
const getColumnCount = (heards) => {
	let arr = []
	heards.forEach((item) => {
		item.child ? arr.push(...item.child) : arr.push(item)
	})
	return arr.length
}
</script>

<style lang="scss" scoped>
.formDetail {
	width: 100%;
	height: 100%;
	padding: 20px;
}

.spreadBox {
	// border-left: 1px solid black;
}
</style>
