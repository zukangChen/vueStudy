<!-- src/components/SpreadSheet.vue -->
<template>
	<div class="spreadSheet">
		<div class="spreadContainer" ref="spreadContainer"></div>
		<el-button class="submitBtn" type="primary" @click="getSourceData">保存</el-button>
	</div>

</template>

<script setup>
// 根据主题选择对应的 CSS 文件（示例为 Excel 2016 主题）
import '@grapecity/spread-sheets/styles/gc.spread.sheets.excel2016colorful.css'
import { onMounted, ref, watch } from 'vue'
import '@grapecity/spread-sheets-resources-zh'
GC.Spread.Common.CultureManager.culture('zh-cn')
// 假设你已经通过CDN或其他方式引入了SpreadJS的JavaScript和CSS文件
// 如果你使用的是npm包，那么你需要按照SpreadJS的文档来导入它
import * as GC from '@grapecity/spread-sheets'
const props = defineProps({
	spreadObj: {
		type: Object,
		default: () => ({
			rowHeader: [], // 表头
			tableData: [], // 表格数据
			rowCount: {
				type: Number,
			}, //行数
			columnCount: {
				type: Number,
				default: 6,
			}, //列数
		}),
	},
})
const spreadContainer = ref(null)
let workbook = null
let sheet = null
let sourceCopyData = null
watch(
	() => props.spreadObj,
	() => {
		sourceCopyData = JSON.parse(JSON.stringify(props.spreadObj.tableData)) // 复制一份数据源，避免添加行时反复触发watch造成死循环
		initSpread2()
		// document.getElementById('vp_vp').style.border = '1px solid'
	},
	{
		// immediate: true,
		deep: true,
	},
)

onMounted(() => {})
function initSpread(workbook) {
	console.log('tt', GC)

	if (!workbook) {
		workbook = new GC.Spread.Sheets.Workbook(spreadContainer.value)
	}
	const sheet = workbook.getActiveSheet()
	console.log('sheet', sheet)
	const style = new GC.Spread.Sheets.Style()

	// style.padding = 0
	// 内容居中展示
	style.vAlign = 1
	style.hAlign = 1
	sheet.setStyle(-1, -1, style, GC.Spread.Sheets.SheetArea.viewport)

	// 设置单元格少部分可以编辑
	sheet.options.isProtected = true // 打开表单保护
	// let range = sheet.getRange(3, 5, 100, 100)
	// range.backColor('#f0f0f0')
	// range.locked(false) // 可编辑的单元格区域

	// 设置表格的行列数
	sheet.setRowCount(props.spreadObj.tableData.length + 3 + 4)
	sheet.setColumnCount(props.spreadObj.columnCount || 32)
	// sheet.setColumnVisible(0, false, GC.Spread.Sheets.SheetArea.rowHeader) // 隐藏行号
	// sheet.setRowVisible(0, false, GC.Spread.Sheets.SheetArea.colHeader) // 隐藏列号

	// 设置 tabStripVisible 为 false 来隐藏标签栏
	workbook.options.tabStripVisible = false

	workbook.options.showRowHeader = false
	workbook.options.showColumnHeader = false

	// scrollbarMaxAlign: 滚动条是否对齐视图中表单的最后一行或一列。
	workbook.options.scrollbarMaxAlign = true
	// scrollbarShowMax: 是否基于表单全部的行列总数显示滚动条。
	workbook.options.scrollbarShowMax = true
	// workbook.options.showVerticalScrollbar = false // 隐藏垂直滚动条
	workbook.options.supportTouch = true // 关键：启用触控

	// 将scrollbarAppearance设置为mobile
	// workbook.options.scrollbarAppearance =
	// 	GC.Spread.Sheets.ScrollbarAppearance.mobile
	// 启用像素级滚动（更灵敏）
	// workbook.options.scrollByPixel = true
	// 设置列宽
	sheet.defaults.rowHeight = 50
	sheet.defaults.colWidth = 120

	// ... 为其他列设置宽度

	sheet.addSpan(0, 0, 1, 100)
	sheet.setValue(0, 0, '2024年12月上半月电量电费统计（2号线）')
	let startRowIndex = 1 // 行开始填充数据的位置
	let curColumnIndex = 0 // 当前列数位置
	props.spreadObj.rowHeader.forEach((header, index) => {
		if (!header.child) {
			sheet.addSpan(startRowIndex, curColumnIndex, 2, 1)
			sheet.setValue(startRowIndex, curColumnIndex, header.label)
			sheet.setColumnWidth(curColumnIndex, '1*') // 动态列宽
			curColumnIndex++
			// sheet.autoFitColumn(index) // 自适应宽度
		} else {
			sheet.addSpan(startRowIndex, curColumnIndex, 1, header.child.length)
			sheet.setValue(startRowIndex, curColumnIndex, header.label)
			console.log('column', curColumnIndex)
			header.child.forEach((child, subIndex) => {
				sheet.setValue(startRowIndex + 1, curColumnIndex, child.label)
				sheet.setColumnWidth(curColumnIndex + subIndex, '1*') // 动态列宽
				curColumnIndex++
				// sheet.autoFitColumn(index + subIndex)
			})
		}
	})
	// 填充数据

	sheet.setArray(3, 0, props.spreadObj.tableData)

	// 设置自动合并（优先在列方向上然后在行方向上应用自动合并）
	let mergeRange = sheet.getRange(-1, -1, -1, -1) // 自动合并区域
	sheet.autoMerge(
		mergeRange,
		GC.Spread.Sheets.AutoMerge.AutoMergeDirection.rowColumn,
	)
	// 内容超出自动换行展示
	let range = sheet.getRange(0, 0, 100, 100)
	range.wordWrap(true)

	// 添加表尾数据行
	sheet.addSpan(
		3 + props.spreadObj.tableData.length,
		0,
		3,
		props.spreadObj.columnCount,
	)
	sheet.setValue(
		3 + props.spreadObj.tableData.length,
		0,
		'注1：有功(含峰、平、谷电量)单位：MWh；无功单位MVar；有功电量kWh、无功电量kVarh',
	)
	sheet.addSpan(
		3 + props.spreadObj.tableData.length + 3,
		0,
		1,
		props.spreadObj.columnCount,
	)

	sheet.setValue(3 + props.spreadObj.tableData.length + 3, 0, '制表人:')
	let style2 = new GC.Spread.Sheets.Style({
		// 统一设置样式方式1
		hAlign: 0,
		cellPadding: '0 0 0 10',
	})
	// style2 = Object.assign(style2, { hAlign: 0, cellPadding: '0 0 0 10' }) // 统一设置样式方式2
	sheet
		.getRange(props.spreadObj.tableData.length + 3, 0, 4, 100)
		.setStyle(style2)
}
function initSpread2(workbook) {
	console.log('tt', GC)
	// let workbook = null
	if (!workbook) {
		workbook = new GC.Spread.Sheets.Workbook(spreadContainer.value)
	}
	sheet = workbook.getActiveSheet()
	console.log('sheet', sheet)
	const style = new GC.Spread.Sheets.Style()
	// style.padding = 0
	// 内容居中展示
	style.vAlign = 1
	style.hAlign = 1
	sheet.setStyle(-1, -1, style, GC.Spread.Sheets.SheetArea.viewport)

	// 设置单元格少部分可以编辑
	sheet.options.isProtected = true // 打开表单保护
	sheet.options.isProtected = true
	sheet.options.protectionOptions = {
		allowInsertRows: true, // 允许插入行
		allowDeleteRows: true, // 允许删除行
	}
	// let range = sheet.getRange(3, 5, 100, 100)
	// range.backColor('#f0f0f0')
	// range.locked(false) // 可编辑的单元格区域

	// 设置表格的行列数
	sheet.setRowCount(props.spreadObj.tableData.length + 3 + 4)

	sheet.setColumnCount(props.spreadObj.columnCount || 32)
	// sheet.setColumnVisible(0, false, GC.Spread.Sheets.SheetArea.rowHeader) // 隐藏行号
	// sheet.setRowVisible(0, false, GC.Spread.Sheets.SheetArea.colHeader) // 隐藏列号

	// 设置 tabStripVisible 为 false 来隐藏标签栏
	workbook.options.tabStripVisible = false

	workbook.options.showRowHeader = false
	workbook.options.showColumnHeader = false

	// scrollbarMaxAlign: 滚动条是否对齐视图中表单的最后一行或一列。
	workbook.options.scrollbarMaxAlign = true
	// scrollbarShowMax: 是否基于表单全部的行列总数显示滚动条。
	workbook.options.scrollbarShowMax = true
	// workbook.options.showVerticalScrollbar = false // 隐藏垂直滚动条
	workbook.options.supportTouch = true // 关键：启用触控

	// 设置表头行高
	sheet.setRowHeight(0, 30, GC.Spread.Sheets.SheetArea.colHeader)
	sheet.setRowHeight(1, 30, GC.Spread.Sheets.SheetArea.colHeader)
	sheet.setRowHeight(2, 50, GC.Spread.Sheets.SheetArea.colHeader)
	// 设置列宽
	sheet.defaults.rowHeight = 50
	sheet.defaults.colWidth = 120

	// ... 为其他列设置宽度
	sheet.setRowCount(3, GC.Spread.Sheets.SheetArea.colHeader)
	sheet.addSpan(0, 0, 1, 100, GC.Spread.Sheets.SheetArea.colHeader)
	sheet.setValue(
		0,
		0,
		'2024年12月上半月电量电费统计（2号线）',
		GC.Spread.Sheets.SheetArea.colHeader,
	)
	let startRowIndex = 1 // 行开始填充数据的位置
	let curColumnIndex = 0 // 当前列数位置

	let rowHeaderCols = []
	props.spreadObj.rowHeader.forEach((header, index) => {
		if (!header.child) {
			sheet.addSpan(
				startRowIndex,
				curColumnIndex,
				2,
				1,
				GC.Spread.Sheets.SheetArea.colHeader,
			)
			sheet.setValue(
				startRowIndex,
				curColumnIndex,
				header.label,
				GC.Spread.Sheets.SheetArea.colHeader,
			)
			rowHeaderCols.push({
				name: header.prop,
				displayName: header.label,
				size: header.size || 100,
			})
			sheet.setColumnWidth(curColumnIndex, '1*') // 动态列宽
			curColumnIndex++
			// sheet.autoFitColumn(index) // 自适应宽度
		} else {
			sheet.addSpan(
				startRowIndex,
				curColumnIndex,
				1,
				header.child.length,
				GC.Spread.Sheets.SheetArea.colHeader,
			)
			sheet.setValue(
				startRowIndex,
				curColumnIndex,
				header.label,
				GC.Spread.Sheets.SheetArea.colHeader,
			)
			console.log('column', curColumnIndex)
			header.child.forEach((child, subIndex) => {
				sheet.setValue(
					startRowIndex + 1,
					curColumnIndex,
					child.label,
					GC.Spread.Sheets.SheetArea.colHeader,
				)
				rowHeaderCols.push({
					name: child.prop,
					displayName: child.label,
					size: child.size || 100,
				})
				sheet.setColumnWidth(curColumnIndex + subIndex, '1*') // 动态列宽
				curColumnIndex++
				// sheet.autoFitColumn(index + subIndex)
			})
		}
	})

	// 设置自动合并（优先在列方向上然后在行方向上应用自动合并）
	let mergeRange = sheet.getRange(-1, -1, -1, -1) // 自动合并区域
	sheet.autoMerge(
		mergeRange,
		GC.Spread.Sheets.AutoMerge.AutoMergeDirection.rowColumn,
	)
	sheet.autoMerge(
		mergeRange,
		GC.Spread.Sheets.AutoMerge.AutoMergeDirection.row,
		GC.Spread.Sheets.AutoMerge.AutoMergeMode.free,
		GC.Spread.Sheets.SheetArea.colHeader,
	)

	// 禁用自动行和列生成
	sheet.autoGenerateColumns = false
	sheet.autoGenerateRows = false
	// 绑定表单数据源

	sheet.autoGenerateColumns = false // 在绑定数据上下文时是否自动生成列
	sheet.bindColumns(rowHeaderCols)
	sheet.setDataSource(sourceCopyData)

	// 内容超出自动换行展示
	let range = sheet.getRange(0, 0, 100, 100)
	range.wordWrap(true)
	sheet
		.getRange(0, 0, 3, 100, GC.Spread.Sheets.SheetArea.colHeader)
		.wordWrap(true)
	// 添加表尾数据行
	sheet.addRows(sourceCopyData.length, 4) // 添加与注释行数量相同的行
	sheet.addSpan(
		props.spreadObj.tableData.length,
		0,
		3,
		props.spreadObj.columnCount,
	)
	sheet.setValue(
		props.spreadObj.tableData.length,
		0,
		'注1：有功(含峰、平、谷电量)单位：MWh；无功单位MVar；有功电量kWh、无功电量kVarh',
	)
	sheet.addSpan(
		props.spreadObj.tableData.length + 3,
		0,
		1,
		props.spreadObj.columnCount,
	)

	sheet.setValue(props.spreadObj.tableData.length + 3, 0, '制表人:')
	let style2 = new GC.Spread.Sheets.Style({
		// 统一设置样式方式1
		hAlign: 0,
		cellPadding: '0 0 0 10',
	})
	sheet.getRange(props.spreadObj.tableData.length, 0, 4, 100).setStyle(style2)
}

function getSourceData() {
	console.log('hh', sheet.getDataSource())
}
</script>

<style scoped>
.spreadSheet {
	width: 100%;
	height: 100%;
	position: relative;
}
/* 你可以在这里添加一些自定义样式，但是SpreadJS的主题通常已经包含了必要的样式 */
.spreadContainer {
	width: 100%;
	height: 600px;
	padding: 0; /* 清除内边距 */
	/* overflow: scroll !important; 隐藏滚动条 */
	touch-action: auto; /* 允许浏览器处理触摸事件 */
	-webkit-overflow-scrolling: touch; /* iOS 平滑滚动 */
}
.submitBtn {
	position: absolute;
	bottom: -60px;
	right: 20px;
}
</style>

