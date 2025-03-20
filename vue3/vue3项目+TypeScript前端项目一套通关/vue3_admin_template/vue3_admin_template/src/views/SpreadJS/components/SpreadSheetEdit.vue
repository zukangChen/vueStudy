<!-- src/components/SpreadSheetEdit.vue -->
<template>
	<div ref="spreadContainer" style="width: 100%; height: 600px;"></div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import '@grapecity/spread-sheets-resources-zh'
GC.Spread.Common.CultureManager.culture('zh-cn')
// 假设你已经通过CDN或其他方式引入了SpreadJS的JavaScript和CSS文件
// 如果你使用的是npm包，那么你需要按照SpreadJS的文档来导入它
import * as GC from '@grapecity/spread-sheets'

const spreadContainer = ref(null)
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
let workbook = null // spread实例
let sheet = null // sheet实例
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
	}
)

onMounted(() => {})

function initSpread() {
	console.log('tt', GC)

	if (!workbook) {
		workbook = new GC.Spread.Sheets.Workbook(spreadContainer.value)
	}
	sheet = workbook.getActiveSheet()
	console.log('sheet', sheet)
	const style = new GC.Spread.Sheets.Style()
	style.padding = 20
	style.vAlign = 1
	style.hAlign = 1
	sheet.setStyle(-1, -1, style, GC.Spread.Sheets.SheetArea.viewport)

	// 设置单元格少部分可以编辑
	sheet.options.isProtected = true // 打开表单保护
	let range = sheet.getRange(2, 5, 100, 100)
	// range.backColor('#f0f0f0')
	range.locked(false) // 可编辑的单元格区域

	// 设置表格的行列数
	// sheet.setRowCount(12)
	sheet.setColumnCount(props.spreadObj.columnCount)
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
	// 设置列宽
	sheet.defaults.rowHeight = 50
	sheet.defaults.colWidth = 120

	// ... 为其他列设置宽度

	// sheet.addSpan(0, 0, 1, 100)
	// sheet.setValue(0, 0, '2024年12月上半月电量电费统计（2号线）')
	// let startRowIndex = 1 // 行开始填充数据的位置(表头)
	let startRowIndex = 0 // 行开始填充数据的位置(表头)
	let rowHeaderCols = []
	props.spreadObj.rowHeader.forEach((header, index) => {
		if (!header.child) {
			sheet.addSpan(startRowIndex, index, 2, 1)
			sheet.setValue(startRowIndex, index, header.label)
			sheet.setColumnWidth(index, '1*') // 动态列宽
			// rowHeaderCols.push({
			// 	name: header.prop,
			// 	displayName: header.label,
			// 	size: header.size || 100,
			// })
			// sheet.autoFitColumn(index) // 自适应宽度
		} else {
			sheet.addSpan(startRowIndex, index, 1, header.child.length)
			sheet.setValue(startRowIndex, index, header.label)
			header.child.forEach((child, subIndex) => {
				sheet.setValue(startRowIndex + 1, index + subIndex, child.label)
				sheet.setColumnWidth(index + subIndex, '1*') // 动态列宽
				// rowHeaderCols.push({
				// 	name: header.prop,
				// 	displayName: header.label,
				// 	size: header.size || 100,
				// })
				// sheet.autoFitColumn(index + subIndex)
			})
		}
		// 设置 A1 单元格为不可编辑
		// style.locked = true
		// style.backColor = 'red'
		// sheet.setStyle(1, 1, style, GC.Spread.Sheets.SheetArea.viewport)
		// style.locked = true
	})
	// 填充数据
	sheet.setArray(2, 0, props.spreadObj.tableData)
	// 设置自动合并（优先在列方向上然后在行方向上应用自动合并）
	let mergeRange = sheet.getRange(-1, -1, -1, -1) // 自动合并区域
	sheet.autoMerge(
		mergeRange,
		GC.Spread.Sheets.AutoMerge.AutoMergeDirection.rowColumn
	)

	// 内容超出自动换行展示
	let wordWrapRange = sheet.getRange(0, 0, 100, 100)
	wordWrapRange.wordWrap(true)

	// 监听单元格值变化事件
	workbook.bind(GC.Spread.Sheets.Events.ValueChanged, function (e, args) {
		// 检查是否是A1(0,0)、A2(0,1)、A3(0,2)的单元格变化
		if ([5, 6, 7, 8, 9].includes(args.col)) {
			// 获取当前行 a1|a2|a3的值
			let a1 = sheet.getValue(args.row, 5)
			let a2 = sheet.getValue(args.row, 6)
			let a3 = sheet.getValue(args.row, 7)

			// 判断是否全部不等于'/'
			let allValid = a1 !== '/' && a2 !== '/' && a3 !== '/'

			// 操作A4单元格（第3行，0列）
			if (allValid) {
				// 设置A4的公式为求和
				sheet.setFormula(
					args.row,
					10,
					`=SUM(F${args.row + 1}:H${args.row + 1})`
				)
				// sheet.setValue(args.row, 10, a1 + a2 + a3)
				// 可选：锁定单元格防止用户修改（根据需求）
				sheet.getCell(args.row, 10).locked(true)
			} else {
				// 获取当前A4的值（如果是公式结果则保留）
				var currentValue = sheet.getValue(args.row, 10)
				// 清除公式
				sheet.setFormula(args.row, 10, null)
				// 恢复用户之前输入的值或保持当前值
				sheet.setValue(3, 0, currentValue)
				// 可选：解锁单元格允许输入
				sheet.getCell(args.row, 10).locked(false)
			}
		}
	})
}
function initSpread2() {
	console.log('tt', GC)

	if (!workbook) {
		workbook = new GC.Spread.Sheets.Workbook(spreadContainer.value)
	}
	sheet = workbook.getActiveSheet()
	console.log('sheet', sheet)
	const style = new GC.Spread.Sheets.Style()
	style.padding = 20
	style.vAlign = 1
	style.hAlign = 1
	sheet.setStyle(-1, -1, style, GC.Spread.Sheets.SheetArea.viewport)

	// 设置单元格少部分可以编辑
	sheet.options.isProtected = true // 打开表单保护
	let range = sheet.getRange(0, 5, 100, 100)
	// range.backColor('#f0f0f0')
	range.locked(false) // 可编辑的单元格区域

	// 设置表格的行列数
	// sheet.setRowCount(12)
	sheet.setColumnCount(props.spreadObj.columnCount)
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

	// 设置表头行高
	sheet.setRowHeight(0, 30, GC.Spread.Sheets.SheetArea.colHeader)
	sheet.setRowHeight(1, 50, GC.Spread.Sheets.SheetArea.colHeader)
	// 设置列宽
	sheet.defaults.rowHeight = 50
	sheet.defaults.colWidth = 120

	// ... 为其他列设置宽度

	sheet.setRowCount(2, GC.Spread.Sheets.SheetArea.colHeader) // 设置表头为2行

	let startRowIndex = 0 // 行开始填充数据的位置(表头)
	let rowHeaderCols = []
	props.spreadObj.rowHeader.forEach((header, index) => {
		if (!header.child) {
			sheet.addSpan(
				startRowIndex,
				index,
				2,
				1,
				GC.Spread.Sheets.SheetArea.colHeader
			)
			sheet.setValue(
				startRowIndex,
				index,
				header.label,
				GC.Spread.Sheets.SheetArea.colHeader
			)
			rowHeaderCols.push({
				name: header.prop,
				displayName: header.label,
				size: header.size || 100,
			})
			// sheet.autoFitColumn(index) // 自适应宽度
		} else {
			sheet.addSpan(
				startRowIndex,
				index,
				1,
				header.child.length,
				GC.Spread.Sheets.SheetArea.colHeader
			)
			sheet.setValue(
				startRowIndex,
				index,
				header.label,
				GC.Spread.Sheets.SheetArea.colHeader
			)
			header.child.forEach((child, subIndex) => {
				sheet.setValue(
					startRowIndex + 1,
					index + subIndex,
					child.label,
					GC.Spread.Sheets.SheetArea.colHeader
				)
				console.log('label', child.label)
				rowHeaderCols.push({
					name: child.prop,
					displayName: child.label,
					size: child.size || 100,
				})
				// sheet.autoFitColumn(index + subIndex)
			})
		}
	})
	// 填充数据
	// sheet.setArray(2, 0, props.spreadObj.tableData)
	// 设置自动合并（优先在列方向上然后在行方向上应用自动合并）
	let mergeRange = sheet.getRange(-1, -1, -1, -1) // 自动合并区域
	sheet.autoMerge(
		mergeRange,
		GC.Spread.Sheets.AutoMerge.AutoMergeDirection.rowColumn
	)
	// 表头自动合并
	sheet.autoMerge(
		mergeRange,
		GC.Spread.Sheets.AutoMerge.AutoMergeDirection.row,
		GC.Spread.Sheets.AutoMerge.AutoMergeMode.free,
		GC.Spread.Sheets.SheetArea.colHeader
	)
	// 绑定表单数据源

	sheet.autoGenerateColumns = false // 在绑定数据上下文时是否自动生成列
	sheet.bindColumns(rowHeaderCols)

	sheet.setDataSource(sourceCopyData)
	sheet.setRowCount(props.spreadObj.tableData.length + 3 + 4)

	// 内容超出自动换行展示
	let wordWrapRange = sheet.getRange(0, 0, 100, 100)
	wordWrapRange.wordWrap(true)
	sheet
		.getRange(0, 0, 3, 100, GC.Spread.Sheets.SheetArea.colHeader)
		.wordWrap(true)
	// 设置动态列宽
	for (let i = 0; i < props.spreadObj.columnCount; i++) {
		if (i > 4) {
			sheet.setColumnWidth(i, '1*', GC.Spread.Sheets.SheetArea.viewport)
		}
	}
	// sheet.setColumnWidth(1, '1*', GC.Spread.Sheets.SheetArea.viewport)
	// 监听单元格值变化事件
	workbook.bind(GC.Spread.Sheets.Events.ValueChanged, function (e, args) {
		// 检查是否是A1(0,0)、A2(0,1)、A3(0,2)的单元格变化
		if ([5, 6, 7, 8, 9].includes(args.col)) {
			// 获取当前行 a1|a2|a3的值
			let a1 = sheet.getValue(args.row, 5)
			let a2 = sheet.getValue(args.row, 6)
			let a3 = sheet.getValue(args.row, 7)

			// 判断是否全部不等于'/'
			let allValid = a1 !== '/' && a2 !== '/' && a3 !== '/'

			// 操作A4单元格（第3行，0列）
			if (allValid) {
				// 设置A4的公式为求和
				sheet.setFormula(
					args.row,
					10,
					`=SUM(F${args.row + 1}:H${args.row + 1})`
				)
				// sheet.setValue(args.row, 10, a1 + a2 + a3)
				// 可选：锁定单元格防止用户修改（根据需求）
				sheet.getCell(args.row, 10).locked(true)
			} else {
				// 获取当前A4的值（如果是公式结果则保留）
				var currentValue = sheet.getValue(args.row, 10)
				// 清除公式
				sheet.setFormula(args.row, 10, null)
				// 恢复用户之前输入的值或保持当前值
				sheet.setValue(3, 0, currentValue)
				// 可选：解锁单元格允许输入
				sheet.getCell(args.row, 10).locked(false)
			}
		}
	})
}
</script>

<style scoped>
/* 你可以在这里添加一些自定义样式，但是SpreadJS的主题通常已经包含了必要的样式 */
</style>