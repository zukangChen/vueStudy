<template>
	<div class="luckySheet">
		<div id="luckysheet" style="height: 500px;"></div>
		<el-button class="submitBtn" type="primary" @click="getSourceData">保存</el-button>
	</div>
</template>

<script setup>
import { reactive, onMounted, nextTick } from 'vue'
import Decimal from 'decimal.js'
// import Luckysheet from 'luckysheet'
import { columnMap } from './detail.js'
let startIndex = 2 // 表头的行数
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
		console.log('header', props.spreadObj.rowHeader)
		sourceCopyData = JSON.parse(JSON.stringify(props.spreadObj.tableData))
		props.spreadObj.rowHeader.forEach((header, index) => {
			if (!header.child) {
				headerArr.push({
					r: 0,
					c: index,
					v: header.label,
					horizontalAlignment: 'center',
					backgroundColor: '#FFFF00',
					ht: 0,
				})
				mergeObj[`0_${index}`] = { r: 0, c: index, rs: 2, cs: 1 } // 合并成 2列一行
			} else {
				headerArr.push({ r: 0, c: index, v: header.label, vt: 0, ht: 0 })
				mergeObj[`0_${index}`] = {
					r: 0,
					c: index,
					rs: 1,
					cs: header.child.length,
					ht: 0,
				} // 合并成 2列一行
				header.child.forEach((child, subIndex) => {
					headerArr.push({ r: 1, c: index + subIndex, v: child.label })
				})
			}
		})
		console.log('arr', headerArr)

		initLucky()
		updateLuckySheet(sourceCopyData)
		setAutoFillColumnWidth()
		headerArr.forEach((item) => {
			// 给表头设置内容居中
			luckysheet.setCellFormat(item.r, item.c, 'ht', 0)
			// 给表头设置内容换行展示
			luckysheet.setCellFormat(item.r, item.c, 'tb', 2)
		})
		// 调用自动合并函数
		const mergeObj2 = autoMergeCells()
		let currentMerge = {}
		switch (props.tabName) {
			case '电量填报':
				dbSpan()
				// 获取当前的 merge 配置
				currentMerge = luckysheet.getLuckysheetfile()[0].config.merge
				// 添加新的合并设置
				Object.assign(currentMerge, mergeObj, mergeObj2, {
					'1_10': {
						// 合并有功电量表头
						c: 1,
						r: 10,
						rs: 1,
						cs: 2,
					},
				})
				break
			case '生产运营用电':
				scSpan()
				// 获取当前的 merge 配置
				currentMerge = luckysheet.getLuckysheetfile()[0].config.merge
				// 添加新的合并设置
				Object.assign(currentMerge, mergeObj, mergeObj2, {
					'1_13': {
						// 合并合计表头
						c: 1,
						r: 13,
						rs: 1,
						cs: 2,
					},
				})
				break
			case '非生产运营用电':
				fscSpan()
				// 获取当前的 merge 配置
				currentMerge = luckysheet.getLuckysheetfile()[0].config.merge
				// 添加新的合并设置
				Object.assign(currentMerge, mergeObj, mergeObj2)
				break
			case '尖峰用电':
				jfSpan()
				// 获取当前的 merge 配置
				currentMerge = luckysheet.getLuckysheetfile()[0].config.merge
				// 添加新的合并设置
				Object.assign(currentMerge, mergeObj, mergeObj2)
				break
			case '力调电费':
				ltSpan()
				currentMerge = luckysheet.getLuckysheetfile()[0].config.merge
				Object.assign(currentMerge, mergeObj, mergeObj2)
				break
			case '其他电费':
				qtSpan()
				currentMerge = luckysheet.getLuckysheetfile()[0].config.merge
				Object.assign(currentMerge, mergeObj, mergeObj2)
				break
			case '基本电费':
				jbSpan()
				currentMerge = luckysheet.getLuckysheetfile()[0].config.merge
				Object.assign(currentMerge, mergeObj, mergeObj2)
				break
			case '收缴情况':
				sjSpan()
				currentMerge = luckysheet.getLuckysheetfile()[0].config.merge
				Object.assign(currentMerge, mergeObj, mergeObj2)
				break
		}
		luckysheet.refreshFormula() // 强制刷新公式
		console.log('mm', mergeObj)
	})
})

function initLucky() {
	const rowCount = props.spreadObj.tableData.length + 2
	options = {
		container: 'luckysheet', //luckysheet为容器id
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
				defaultRowHeight: 67, //自定义行高
				// defaultColWidth: 73, //自定义列宽
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
				// config: {
				//   row: 20, // 总行数
				//   column: 10, // 总列数
				//   defaultColWidth: 100, // 列宽
				//   defaultRowHeight: 25, // 行高
				// }
				config: {
					merge: mergeObj,
					autoSize: true, // 启用自动调整列宽
				},
			},
		],
	}

	// 初始化 Luckysheet
	luckysheet.create(options)
	luckysheet.setCellFormat(0, 0, 'ht', 0)
}

// 电量填报合并
function dbSpan() {
	// 合并有功电量1
	sourceCopyData.forEach((item, index) => {
		if (isEvenOrZero(index)) {
			//偶数
			mergeObj[`${index + startIndex}_10`] = {
				r: index + startIndex,
				c: 10,
				rs: 2,
				cs: 1,
			} // 合并成 2列一行
			luckysheet.setCellFormat(index + startIndex, 10, 'ht', 0)
			// 设置公式(如果依赖性不符合公式则取当前单元格的值，符合公式则当前单元格等于依赖单元格计算公式算出的值)
			luckysheet.setCellValue(
				index + startIndex,
				10,
				`=IFERROR(IF(AND(ISNUMBER(F${index + 2 + startIndex}), ISNUMBER(F${
					index + 1 + startIndex
				})),SUM(( F${index + 2 + startIndex} - F${
					index + 1 + startIndex
				})*17600), '/'), ${
					luckysheet.getCellValue(index + startIndex, 10) || '/'
				})`,
			)
		}
	})
	let countMap = countItemsByIdWithStartPosition(sourceCopyData, 'place')
	let i = 0

	while (i < sourceCopyData.length) {
		// 合并有功电量2
		mergeObj[`${i + startIndex}_11`] = {
			r: i + startIndex,
			c: 11,
			rs: countMap[sourceCopyData[i].place].count,
			cs: 1,
		} // 合并成 2列一行
		let arr = []
		let increaArr = []
		let subArr = []
		for (
			let idx = i;
			idx < countMap[sourceCopyData[i].place].count + i;
			idx++
		) {
			if (idx % 2 !== 0) {
				arr.push(`k${idx + startIndex}`)
				increaArr.push(`j${idx + 1 + startIndex}`)
			} else {
				subArr.push(`j${idx + 1 + startIndex}`)
			}
		}
		// 设置公式
		let transArr = arr.map((item) => {
			return `ISNUMBER(${item})`
		})
		luckysheet.setCellValue(
			i + startIndex,
			11,
			`=IFERROR(IF(AND(${transArr.join(',')}), ${arr.join('+')},'/'),${
				luckysheet.getCellValue(i + startIndex, 11) || '/'
			})`,
		)
		// sheet.setFormula(i, 11, `=SUM(${arr.join('+')})`)
		// 合并总无功电量
		mergeObj[`${i + startIndex}_12`] = {
			r: i + startIndex,
			c: 12,
			rs: countMap[sourceCopyData[i].place].count,
			cs: 1,
		}
		let transIncreaArr = [...increaArr, ...subArr].map((item) => {
			return `ISNUMBER(${item})`
		})
		luckysheet.setCellValue(
			i + startIndex,
			12,
			`=IFERROR(IF(AND(${transIncreaArr.join(',')}), SUM((${increaArr.join(
				'+',
			)}-${subArr.join('-')})*17600), '/'), ${
				luckysheet.getCellValue(i + startIndex, 12) || '/'
			})`,
		)
		// sheet.setFormula(
		// 	i,
		// 	12,
		// 	`=SUM((${increaArr.join('+')}-${subArr.join('-')})*17600)`
		// )
		i = i + countMap[sourceCopyData[i].place].count
	}
}

// 生产运营用电合并
function scSpan() {
	let xjArr = [] // 偶数小计数组
	let hjArr = [] // 合计1数组
	let i = 0
	let countMap = countItemsByIdWithStartPosition(sourceCopyData, 'place')

	sourceCopyData.forEach((item, index) => {
		if (isEvenOrZero(index)) {
			//偶数
			xjArr.push(`M${index + 2 + 1}`)
			// 合并本月生产运营用电量
			mergeObj[`${index + startIndex}_5`] = {
				r: index + startIndex,
				c: 5,
				rs: 2,
				cs: 1,
			} // 合并成 2行一列
			luckysheet.setCellFormat(index + startIndex, 5, 'ht', 0)
			// 设置公式(如果依赖性不符合公式则取当前单元格的值，符合公式则当前单元格等于依赖单元格计算公式算出的值)
			const totalElectricity_power =
				sourceCopyData[index].totalElectricity_power // 有功电量的值，有值则生成运营用电等于有功电量值，没值就去获取当前单元格是否有值

			let firstIndex = countMap[sourceCopyData[i].place].startPosition
			let val = sourceCopyData[firstIndex].porduct_account // 所别生产运营占比
			// debugger
			luckysheet.setCellValue(
				index + startIndex,
				5,
				`=IFERROR(IF(AND(ISNUMBER(${totalElectricity_power})),SUM( ${totalElectricity_power}*${val}), '/'), SUM(${
					luckysheet.getCellValue(index + startIndex, 5) * val || '/'
				}))`,
			)

			// 合并小计
			mergeObj[`${index + startIndex}_12`] = {
				r: index + startIndex,
				c: 12,
				rs: 2,
				cs: 1,
			} // 合并成 2行一列
			// 设置公式(如果依赖性不符合公式则取当前单元格的值，符合公式则当前单元格等于依赖单元格计算公式算出的值)
			let Gindex =
				index % 4 === 0 ? index + 4 + startIndex : index + 2 + startIndex
			luckysheet.setCellValue(
				index + startIndex,
				12,
				`=IFERROR(IF(AND(ISNUMBER(G${Gindex}), ISNUMBER(F${
					index + 1 + startIndex
				})),SUM(F${index + 1 + startIndex}*G${Gindex}), '/'), ${
					luckysheet.getCellValue(index + startIndex, 12) || '/'
				})`,
			)
		}
	})
	// let i = 0
	while (i < sourceCopyData.length) {
		// 合并每个所别的测算单价和测算电价值
		mergeObj[`${i + 1 + startIndex}_6`] = {
			// 2行6列
			r: i + 1 + startIndex,
			c: 6,
			rs: 2,
			cs: 6,
		}
		hjArr.push(`N${i + 1 + startIndex}`) // 合计1数组
		luckysheet.setCellValue(i + 1 + startIndex, 6, '测算电价')
		mergeObj[`${i + 1 + startIndex + 2}_6`] = {
			// 1行6列
			r: i + 1 + startIndex + 2,
			c: 6,
			rs: 1,
			cs: 6,
		}

		let first_caculate = countMap[sourceCopyData[i].place].startPosition
		let val_caculate = sourceCopyData[first_caculate].product_caculatePrice // 所别生产运营占比
		luckysheet.setCellValue(i + 1 + startIndex + 2, 6, val_caculate)

		// 合并合计
		let ygArr = [] //有功电量偶数数组
		for (
			let idx = i;
			idx < countMap[sourceCopyData[i].place].count + i;
			idx++
		) {
			if (idx % 2 !== 0) {
				ygArr.push(`M${idx + startIndex}`)
			}
		}
		mergeObj[`${i + startIndex}_13`] = {
			r: i + startIndex,
			c: 13,
			rs: countMap[sourceCopyData[i].place].count,
			cs: 1,
		}
		// 设置公式
		let transxjArr = ygArr.map((item) => {
			return `ISNUMBER(${item})`
		})
		luckysheet.setCellValue(
			i + startIndex,
			13,
			`=IFERROR(IF(AND(${transxjArr.join(',')}), SUM(${ygArr.join(',')}),'/'),${
				luckysheet.getCellValue(i + startIndex, 13) || '/'
			})`,
		)

		i = i + countMap[sourceCopyData[i].place].count
	}

	// 合并合计2
	mergeObj[`${startIndex}_14`] = {
		r: startIndex,
		c: 14,
		rs: sourceCopyData.length,
		cs: 1,
	}
	// 设置公式
	let transhjArr = hjArr.map((item) => {
		return `ISNUMBER(${item})`
	})
	luckysheet.setCellValue(
		startIndex,
		14,
		`=IFERROR(IF(AND(${transhjArr.join(',')}), SUM(${hjArr.join(',')}),'/'),${
			luckysheet.getCellValue(startIndex, 14) || '/'
		})`,
	)
}
// 非生产运营用电合并
function fscSpan() {
	// 合并非生产运营用电
	mergeObj[`${startIndex}_5`] = {
		r: startIndex,
		c: 5,
		rs: sourceCopyData.length,
		cs: 1,
	}
	// 设置公式(如果依赖性不符合公式则取当前单元格的值，符合公式则当前单元格等于依赖单元格计算公式算出的值)
	const totalElectricity_notPower = sourceCopyData[0].totalElectricity_notPower // 有功电量的值，有值则生成运营用电等于有功电量值，没值就去获取当前单元格是否有值

	let account = sourceCopyData[0].notPorduct_account // 所别非生产运营占比
	luckysheet.setCellValue(
		startIndex,
		5,
		totalElectricity_notPower && account
			? `=SUM(${totalElectricity_notPower * account})`
			: '/',
	)

	// 合并峰电量 平电量等
	for (let i = 0; i < 6; i++) {
		mergeObj[`${startIndex}_${i + 6}`] = {
			r: startIndex,
			c: i + 6,
			rs: 3,
			cs: 1,
		}
	}
	// 合并底部
	mergeObj[`5_6`] = {
		r: 5,
		c: 6,
		rs: 1,
		cs: 6,
	}
	const notPorduct_caculatePrice = sourceCopyData[0].notPorduct_caculatePrice
	luckysheet.setCellValue(5, 6, notPorduct_caculatePrice || '/')
	// 合并合计
	mergeObj[`${startIndex}_12`] = {
		r: startIndex,
		c: 12,
		rs: sourceCopyData.length,
		cs: 1,
	}
	// 设置公式
	luckysheet.setCellValue(
		startIndex,
		12,
		`=IFERROR(IF(AND(ISNUMBER(F3), ISNUMBER(G6)),SUM(F3*G6), '/'), ${
			luckysheet.getCellValue(startIndex, 12) || '/'
		})`,
	)
}
// 尖峰用电合并
function jfSpan() {
	let i = 0
	while (i < sourceCopyData.length) {
		// 尖峰电量合并
		mergeObj[`${startIndex + i}_5`] = {
			r: startIndex + i,
			c: 5,
			rs: 4,
			cs: 1,
		}
		// 尖峰电费合并
		mergeObj[`${startIndex + i}_7`] = {
			r: startIndex + i,
			c: 7,
			rs: 4,
			cs: 1,
		}
		// 设置公式
		luckysheet.setCellValue(
			i + startIndex,
			7,
			`=IFERROR(IF(AND(ISNUMBER(F${i + 3}),ISNUMBER(G3)),SUM((F${
				i + 3
			})*G3), '/'), ${luckysheet.getCellValue(i + startIndex, 7) || '/'})`,
		)
		i = i + 4
	}
	// 尖峰单价合并
	mergeObj[`${startIndex}_6`] = {
		r: startIndex,
		c: 6,
		rs: 4,
		cs: 1,
	}
}
// 力调电费合并
function ltSpan() {
	// 月累计因素合并 力调系数合并 力调电费合并
	spanFour([5, 6, 7])
}
// 其他电费合并
function qtSpan() {
	// 市场平衡费用及运营费用（元）合并 上网环节线损费用（元）合并
	spanFour([5, 6])
}
//基本电费合并
function jbSpan() {
	spanFour([5])
}
//收缴情况合并
function sjSpan() {
	spanFour([5, 6, 7, 8, 9, 10])
	// 生产运营用电费
	const isOk = [
		// 生产运营用电合计2 力调电费（元）市场平衡费用及运营费用（元）上网环节线损费用（元）
		sourceCopyData[0].porduct_sumTotal2,
		sourceCopyData[0].poweRegulation_monthSum,
		sourceCopyData[0].other_market,
		sourceCopyData[0].other_netWork,
	].every((element) => isNumericOrNumericString(element))
	if (isOk) {
		// 如果都满足是数字
		// 小数相加
		const sum = new Decimal(sourceCopyData[0].porduct_sumTotal2)
			.plus(sourceCopyData[0].poweRegulation_monthSum)
			.plus(sourceCopyData[0].other_market)
			.plus(sourceCopyData[0].other_netWork)
			.plus(-0.01)
		luckysheet.setCellValue(2, 5, sum.toNumber())
	} else {
		luckysheet.getCellValue(2, 5) || '/'
	}
	// 应收
	const isOk2 = [
		// 生产运营用电合计1 尖峰用电 力调电费（元）基本电费应收 市场平衡费用及运营费用（元）上网环节线损费用（元）
		sourceCopyData[0].porduct_sumTotal,
		sourceCopyData[0].spike_spikeSum,
		sourceCopyData[0].poweRegulation_monthSum,
		sourceCopyData[0].basic_receivable,
		sourceCopyData[0].other_market,
		sourceCopyData[0].other_netWork,
	].every((element) => isNumericOrNumericString(element))
	if (isOk2) {
		// 如果都满足是数字
		const sum = new Decimal(sourceCopyData[0].porduct_sumTotal)
			.plus(sourceCopyData[0].spike_spikeSum)
			.plus(sourceCopyData[0].poweRegulation_monthSum)
			.plus(sourceCopyData[0].basic_receivable)
			.plus(sourceCopyData[0].other_market)
			.plus(sourceCopyData[0].other_netWork)
		luckysheet.setCellValue(2, 8, sum.toNumber())
	} else {
		luckysheet.getCellValue(2, 8) || '/'
	}

	// 总计
	luckysheet.setCellValue(
		2,
		10,
		`=IFERROR(IF(ISNUMBER(J3),SUM(J3), ${
			luckysheet.getCellValue(2, 10) || '/'
		}), ${luckysheet.getCellValue(2, 10) || '/'})`,
	)
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
			luckysheet.setCellValue(r + 2, colIndex, {
				v: row[key] || '/',
			})
			luckysheet.setCellFormat(r + 2, colIndex, 'ht', 0)
			luckysheet.setCellFormat(r + 2, colIndex, 'tb', 2) // 给表格设置内容超出换行展示
		})
	})
}

// 合并前四列的数据
function autoMergeCells() {
	let data = luckysheet.getSheetData(0) // 获取第一个表格的数据
	let mergeObj = {} // 存放合并信息
	let rowCount = data.length
	let columnCount = data[0].length // 获取列数

	// 对前三列（0, 1, 2，4）进行合并
	for (let c = 0; c < 4; c++) {
		// 遍历前三列
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
	const containerWidth = document.getElementById('luckysheet').offsetWidth - 100 // 获取表格容器的宽度
	const columnCount = props.spreadObj.columnCount // 假设列数是18
	const autoWidth = Math.floor(containerWidth / columnCount) // 计算每列应占的宽度
	console.log('auto', autoWidth)
	let obj = {}
	for (let i = 0; i < columnCount; i++) {
		obj[i] = autoWidth
	}

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
	box-sizing: border-box;
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
