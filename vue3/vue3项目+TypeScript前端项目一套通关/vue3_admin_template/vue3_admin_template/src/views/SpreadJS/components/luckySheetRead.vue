<template>
	<div class="luckySheet">
		<div id="luckysheet" style="height: 560px;"></div>
		<el-button class="submitBtn" type="primary" @click="getSourceData">刷新</el-button>
	</div>
</template>

<script setup>
import { reactive, onMounted, nextTick } from 'vue'
// import Luckysheet from 'luckysheet'
import { columnMap } from './detail.js'
let startIndex = 3 // 表头的行数
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
				default: 13,
			}, //列数
		}),
	},
	tabName: {
		type: String,
		default: '',
	},
})
let options = {}
let sourceCopyData = null
let headerArr = []
let mergeObj = {}
onMounted(() => {
	nextTick(() => {
		reFresh()
	})
})

function reFresh() {
	console.log('header', props.spreadObj.rowHeader)
	sourceCopyData = JSON.parse(JSON.stringify(props.spreadObj.tableData))
	let num = 0
	headerArr.push({
		r: 0,
		c: 0,
		v: '2025年',
	})
	mergeObj[`0_0`] = { r: 0, c: 0, rs: 1, cs: props.spreadObj.columnCount } // 合并成 2列一行
	props.spreadObj.rowHeader.forEach((header, index) => {
		if (!header.child) {
			headerArr.push({
				r: 1,
				c: index,
				v: header.label,
				horizontalAlignment: 'center',
				backgroundColor: '#FFFF00',
				ht: 0,
			})
			num++
			mergeObj[`1_${index}`] = { r: 1, c: index, rs: 2, cs: 1 } // 合并成 2列一行
		} else {
			headerArr.push({ r: 1, c: num, v: header.label })
			mergeObj[`1_${num}`] = {
				r: 1,
				c: num,
				rs: 1,
				cs: header.child.length,
			} // 合并成 2列一行
			header.child.forEach((child, subIndex) => {
				headerArr.push({ r: 2, c: num, v: child.label })
				num++
			})
		}
	})
	console.log('arr', headerArr)

	initLucky()
	updateLuckySheet(sourceCopyData)
	wzSpan()
	setAutoFillColumnWidth()
	headerArr.forEach((item) => {
		// 给表头设置内容居中
		luckysheet.setCellFormat(item.r, item.c, 'ht', 0)
		// 给表头设置内容换行展示
		luckysheet.setCellFormat(item.r, item.c, 'tb', 2)
		if (item.r === 0 && item.c === 0) {
			luckysheet.setCellFormat(item.r, item.c, 'ht', 1)
		}
	})
	// 调用自动合并函数
	const mergeObj2 = autoMergeCells()
	let currentMerge = {}
	// 获取当前的 merge 配置
	currentMerge = luckysheet.getLuckysheetfile()[0].config.merge
	// 添加新的合并设置
	Object.assign(currentMerge, mergeObj, mergeObj2, {
		'2_10': {
			// 合并有功电量表头
			c: 2,
			r: 10,
			rs: 1,
			cs: 2,
		},
		'2_21': {
			// 合并合计表头
			c: 2,
			r: 21,
			rs: 1,
			cs: 2,
		},
	})
	luckysheet.refreshFormula() // 强制刷新公式
	console.log('mm', mergeObj)
}

function initLucky() {
	const rowCount = props.spreadObj.tableData.length + 3
	options = {
		container: 'luckysheet', //luckysheet为容器id
		allowEdit: false, // 设置表格为只读
		title: '',
		lang: 'zh',
		showinfobar: false, // 是否显示顶部信息栏
		showtoolbar: false, //是否显示工具栏
		showtoolbarConfig: false,
		showinfobar: false, //是否显示顶部信息栏
		showsheetbar: false, // 是否显示底部sheet页按钮
		enableAddRow: false, // 允许添加行
		addRowCount: false, //默认添加行的数目
		enableAddBackTop: false, //允许回到顶部
		defaultFontSize: 14, // 初始化默认字体大小
		// 其他配置项...
		cellRightClickConfig: {
			copy: false, // 复制
			copyAs: false, // 复制为
			paste: false, // 粘贴
			insertRow: false, // 插入行
			insertColumn: false, // 插入列
			deleteRow: false, // 删除选中行
			deleteColumn: false, // 删除选中列
			deleteCell: false, // 删除单元格
			hideRow: false, // 隐藏选中行和显示选中行
			hideColumn: false, // 隐藏选中列和显示选中列
			rowHeight: false, // 行高
			columnWidth: false, // 列宽
			clear: false, // 清除内容
			matrix: false, // 矩阵操作选区
			sort: false, // 排序选区
			filter: false, // 筛选选区
			chart: false, // 图表生成
			image: false, // 插入图片
			link: false, // 插入链接
			data: false, // 数据验证
			cellFormat: false, // 设置单元格格式
		},
		sheetRightClickConfig: {
			delete: false, // 删除
			copy: false, // 复制
			rename: false, // 重命名
			color: false, // 更改颜色
			hide: false, // 隐藏，取消隐藏
			move: false, // 向左移，向右移
		},
		data: [
			{
				name: 'Cell', //工作表名称
				color: '', //工作表颜色
				index: 0, //工作表索引
				status: 1, //激活状态
				order: 0, //工作表的下标
				hide: 0, //是否隐藏
				row: rowCount, //行数
				column: props.spreadObj.columnCount, //列数
				defaultRowHeight: 65.5, //自定义行高
				// defaultColWidth: 73, //自定义列宽
				// scrollLeft: 300, //左右滚动条位置
				// scrollTop: 0, //上下滚动条位置
				celldata: headerArr || [
					// 第一级表头 (合并单元格)
					{
						r: 0,
						c: 0,
						v: '所别',
						fc: '#990000',
						m: 233,
						bl: 1,
						bg: '#f6b26b',
					},
					{ r: 0, c: 1, v: '线路' },
					{ r: 0, c: 2, v: '时段' },
					{ r: 0, c: 3, v: '总电量' }, // 主合并单元格

					// 第二级表头
					{ r: 1, c: 3, v: '总有功' },
					{ r: 1, c: 4, v: '峰电量' },
					{ r: 1, c: 5, v: '平电量' },
					{ r: 1, c: 6, v: '谷电量' },
					{ r: 1, c: 7, v: '总无功' },
					{ r: 1, c: 8, v: '有功电量' },
					{ r: 1, c: 9, v: '总无功电量' },

					// 数据行 (示例前两行)
					{
						r: 2,
						c: 0,
						v: '创新大道主所',
						bg: '#f6b26b',
						fc: '#990000',
						bl: 1,
						ht: 'center',
						vt: 'middle',
					},
					{ r: 3, c: 0, v: '创新大道主所' },
					{ r: 2, c: 1, v: '游乐变448' },
					{ r: 2, c: 2, v: '上月' },
					{ r: 3, c: 1, v: '木月' },
					{ r: 4, c: 1, v: '科学城变' },
					{ r: 4, c: 2, v: '上月' },
					{ r: 5, c: 1, v: '木月' },
				],
				config: {
					merge: mergeObj,
					autoSize: true, // 启用自动调整列宽
				},
			},
		],
	}
	console.log('rr', headerArr)
	// debugger
	// 初始化 Luckysheet
	luckysheet.create(options)
	luckysheet.setCellFormat(0, 0, 'ht', 0)
}

// 完整报表合并
function wzSpan() {
	spanTwo([10, 13, 20])
	spanFour([
		11, 12, 21, 22, 23, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43,
		44,
	])
	// 合并每个所别的测算单价和测算电价值
	const zdlCount = 7 // 总电量列数
	mergeObj[`4_${5 + zdlCount + 2}`] = {
		// 2行6列
		r: 4,
		c: 5 + zdlCount + 2,
		rs: 2,
		cs: 6,
	}
	luckysheet.setCellValue(4, 5 + zdlCount + 2, '测算电价')
	mergeObj[`6_${5 + zdlCount + 2}`] = {
		// 2行6列
		r: 6,
		c: 5 + zdlCount + 2,
		rs: 1,
		cs: 6,
	}

	// 合并非生产运营用电 的 峰电量 平电量等
	for (let i = 24; i < 30; i++) {
		mergeObj[`3_${i}`] = {
			r: 3,
			c: i,
			rs: 3,
			cs: 1,
		}
	}
	mergeObj[`6_24`] = {
		r: 6,
		c: 24,
		rs: 1,
		cs: 6,
	}
}
// 合并两行1列（主所）arr是要合并的列序号数组
function spanTwo(arr = []) {
	let i = 0
	while (i < sourceCopyData.length) {
		// 合并两行1列
		arr.forEach((item) => {
			mergeObj[`${startIndex + i}_${item}`] = {
				r: startIndex + i,
				c: item,
				rs: 2,
				cs: 1,
			}
		})
		i = i + 2
	}
}
// 合并4行1列（主所）arr是要合并的列序号数组
function spanFour(arr = []) {
	let i = 0
	while (i < sourceCopyData.length) {
		// 合并两行1列
		arr.forEach((item) => {
			mergeObj[`${startIndex + i}_${item}`] = {
				r: startIndex + i,
				c: item,
				rs: 4,
				cs: 1,
			}
		})
		i = i + 4
	}
}
// 判断奇数还是偶数
function isEvenOrZero(number) {
	return number % 2 === 0
}
/**
 * 判断一个变量是否是数字或者是可以转成数字的字符串
 * @param {any} variable - 要检查的变量
 * @returns {boolean} - 如果变量是数字或者是可以转成数字的字符串，则返回true；否则返回false
 */
function isNumericOrNumericString(variable) {
	if (typeof variable === 'number') {
		// 如果是数字类型，直接返回true
		return true
	} else if (typeof variable === 'string') {
		// 如果是字符串类型，先去除两端的空格，再检查是否为空字符串
		let trimmedStr = variable.trim()
		if (trimmedStr === '') {
			// 空字符串不是有效的数字字符串
			return false
		} else {
			// 尝试转换为数字，并检查是否为NaN
			let num = Number(trimmedStr)
			return !isNaN(num)
		}
	} else {
		// 其他类型都不是数字也不是数字字符串
		return false
	}
}
/**
 * 统计数组对象中每个不同 id 下有多少条数据，并返回起始位置
 * @param {Array} array - 包含对象的数组
 * @param {string} idKey - 用于标识唯一 id 的键名
 * @returns {Object} - 每个 id 对应的数量和起始位置
 */
function countItemsByIdWithStartPosition(array, idKey) {
	const countMap = {}

	array.forEach((item, index) => {
		const id = item[idKey]
		if (!countMap[id]) {
			// 如果是首次遇到这个 id，记录数量和起始位置
			countMap[id] = { count: 1, startPosition: index }
		} else {
			// 如果不是首次，只增加数量
			countMap[id].count++
		}
	})

	return countMap
}

// 给表格赋值
function updateLuckySheet(tableData) {
	tableData.forEach((row, r) => {
		Object.keys(columnMap[props.tabName]).forEach((key) => {
			const colIndex = columnMap[props.tabName][key]
			luckysheet.setCellValue(r + 3, colIndex, {
				v: row[key] || '/',
			})
			luckysheet.setCellFormat(r + 3, colIndex, 'ht', 0)
			luckysheet.setCellFormat(r + 3, colIndex, 'tb', 2) // 给表格设置内容超出换行展示
		})
	})
}

// 合并前四列的数据
function autoMergeCells() {
	let data = luckysheet.getSheetData(0) // 获取第一个表格的数据
	let mergeObj = {} // 存放合并信息
	let rowCount = data.length
	let columnCount = data[0].length // 获取列数

	// 对前4列（0, 1, 2，3，4）进行合并
	for (let c = 0; c < 4; c++) {
		// 遍历前4列
		let r = 0
		while (r < rowCount) {
			let currentValue = data[r][c]?.v // 当前列的值
			let mergeStartRow = r

			// 查找相邻相同的单元格
			while (r + 1 < rowCount && data[r + 1][c]?.v === currentValue) {
				r++
			}

			// 如果有相邻的相同单元格，进行合并
			if (r > mergeStartRow) {
				mergeObj[`${mergeStartRow}_${c}`] = {
					r: mergeStartRow,
					c: c,
					rs: r - mergeStartRow + 1, // 行合并的数量
					cs: 1, // 列合并的数量，始终是 1
				}
			}

			r++ // 跳到下一个区块
		}
	}

	return mergeObj
}

// 设置所有列宽为自动占满
function setAutoFillColumnWidth() {
	// const containerWidth = document.getElementById('luckysheet').offsetWidth // 获取表格容器的宽度
	// const columnCount = props.spreadObj.columnCount // 假设列数是18
	// const autoWidth = containerWidth / columnCount // 计算每列应占的宽度
	let obj = {}
	for (let i = 0; i < 5; i++) {
		obj[i] = 120
	}
	for (let i = 5; i < props.spreadObj.columnCount; i++) {
		obj[i] = 150
	}
	;[13, 23, 32, 33, 34, 37, 38, 39, 40].forEach((item) => {
		obj[item] = 180
	})
	luckysheet.setColumnWidth(obj) // 设置所有列宽为自动占满
}

// 获取当前表格数据
function getSourceData() {
	const data = luckysheet.getSheetData(0)
	console.log('data', data)
}
</script>

<style>
.luckysheet-cell-sheettable {
	text-align: center !important;
	vertical-align: middle !important;
}
.luckysheet-cell {
	text-align: center !important;
	vertical-align: middle !important;
}
</style>
<style lang="scss" scoped>
.luckySheet {
	width: 100%;
	height: 100%;
	position: relative;
	.submitBtn {
		display: flex;
		margin-left: auto;
		margin-top: 20px;
		margin-right: 30px;
	}
}
</style>
