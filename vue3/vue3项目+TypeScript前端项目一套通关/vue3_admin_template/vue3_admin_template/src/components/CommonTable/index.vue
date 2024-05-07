<template>
	<div class='common-table'>
		<el-table ref="Commontable" v-loading="table.loading" :row-style="rowStyle" :cell-style="cellStyle" :cell-class-name="handleCellClassName" :header-cell-style="headerStyle" :header-cell-class-name="headerCellClassName" :show-summary="table.hasShowSummary" :summary-method="getSummaries" :span-method="table.getSpanMethod" :show-header="table.showHeader" :data="table.data" :height="table.tableHeight" tooltip-effect="dark myTooltips" :border="table.border" :style="table.style" :stripe="table.stripe" :tree-props="table.treeProps ? table.treeProps : {children: 'children', hasChildren: 'hasChildren'}" :row-key="table.rowKey ? table.rowKey : 'id'" lazy :fit="true" :load="table.load?table.load:null" :row-class-name="tableRowClassName" header-row-class-name="thClassName" @selection-change="handleSelectionChange" @select="select" @cell-mouse-enter="MouseEnter" @cell-mouse-leave="MouseOut" @sort-change="sortChange" @row-click="rowClick" @select-all="selectAll" @header-click="handleHeaderClick">
			<el-table-column v-if="table.hasSelect" type="selection" width="55" :reserve-selection="true" :selectable="selectable"></el-table-column>

			<el-table-column v-if="table.hasIndex" type="index" width="55"></el-table-column>

			<template v-for="item in table.tr">
				<el-table-column v-if="item.show !== false && item.show === 'template'" :key="item.id+item.label" :show-overflow-tooltip="item.hiddenToolTip ? !item.hiddenToolTip : true" :label="item.label" :prop="item.prop" :align="item.align" :sortable="item.sortable" :class-name="item.className ? item.className : ''" :width="item.width ? item.width : ''" :min-width="item.minWidth ? item.minWidth : ''" :fixed="item.fixed || false ">
					<template #default="scope">
						<slot :name="item.prop" :value="scope.row[item.prop]" :row="scope.row"></slot>
					</template>
				</el-table-column>

				<el-table-column v-else-if="item.show !== false && item.show =='switch'" :key="item.id" show-overflow-tooltip :label="item.label" :prop="item.prop" :sortable="item.sortable" :class-name="item.className ? item.className : ''" :width="item.width ? item.width : ''" :min-width="item.minWidth ? item.minWidth : ''" :fixed="item.fixed || false ">
					<template #default="scope">
						<el-switch v-model="scope.row[item.prop]" active-color="#46c000" inactive-color="#d9d9d9" :disabled="item.disabled" :active-text="item.activeText ?item.activeText : null" :inactive-text="item.inactiveText ? item.inactiveText : null" :active-value="item.activeValue ? item.activeValue :'1'" :inactive-value="item.inactiveValue ? item.inactiveValue :'0'" @change="switchChange(scope.row)"></el-switch>
					</template>
				</el-table-column>

				<el-table-column v-else-if="item.show !== false && item.show =='radio'" :key=" item.id" show-overflow-tooltip :label="item.label" :prop="item.prop" :sortable="item.sortable" :class-name="item.className ? item.className : ''" :width="item.width ? item.width : ''" :min-width="item.minWidth ? item.minWidth : ''" :fixed="item.fixed || false ">
					<template #default="scope">
						<el-radio-group v-model="scope.row[item.prop]" :disabled="item.disabled" @input="radioChange(scope.row,item.prop,scope.$index)">
							<el-radio v-for="(i,index) in item.list" :key="index" :label="i.value">{{ i.label || '' }}</el-radio>
						</el-radio-group>
					</template>
				</el-table-column>

				<!-- 进度条 -->
				<el-table-column v-else-if="item.show !== false && item.show === 'process'" :key=" item.id" show-overflow-tooltip :label="item.label" :prop="item.prop" :sortable="item.sortable" :align="item.align ? item.align : 'center'" :class-name="item.className ? item.className : ''" :width="item.width ? item.width : ''" :min-width="item.minWidth ? item.minWidth : ''" :fixed="item.fixed || false ">
					<template #default="scope">
						<div class="bar-wrap">
							<span class="value">{{ scope.row[item.prop] >0  ? ('+'+ scope.row[item.prop] + '%'):'-' }}</span>
							<div class="process" v-if="scope.row[item.prop] > 0">
								<div class="per-bar" :style="{width: `20%`}"></div>
							</div>
						</div>
					</template>
				</el-table-column>

				<!-- 多表头 -->
				<el-table-column v-else-if="item.show !== false && item.show === 'isMultipleHeader'" :key="item.id + item.prop" :show-overflow-tooltip="item.showToolTip ? item.showToolTip : true" :label="item.label" :prop="item.prop" :sortable="item.sortable" :align="item.align ? item.align : 'center'" :class-name="item.className ? item.className : ''" :width="item.width ? item.width : ''" :min-width="item.minWidth ? item.minWidth : ''" :fixed="item.fixed || false ">
					<template v-for="(subItem) in item.child">
						<el-table-column v-if="subItem.show!=='template'" :key="subItem.id + subItem.prop" :show-overflow-tooltip="subItem.showToolTip ? subItem.showToolTip : true" :label="subItem. label" :prop="subItem.prop" :sortable="subItem.sortable" :align="subItem.align ? subItem.align : 'center'" height="80" :class-name="subItem.className ? subItem.className : ''" :width="subItem.width ? subItem.width : ''" :min-width="subItem.minWidth ? subItem.minWidth :  ''" :fixed="subItem.fixed || false ">
							<template #default="scope">
								<span :style="{'color': subItem.color ? subItem.color : ''}">{{ scope.row[subItem.prop] }} </span>
							</template>
						</el-table-column>
						<el-table-column v-else :key="subItem.id + subItem.prop" :show-overflow-tooltip="subItem.showToolTip ? subItem.showToolTip : true" :label="subItem.label" :prop="subItem.prop" :sortable="subItem.sortable" :align="subItem.align ? subItem.align : 'center'" height="80" :class-name="subItem.className ? subItem.className : ''" :width="subItem.width ? subItem.width : ''" :min-width="subItem.minWidth ? subItem.minWidth :  ''" :fixed="subItem.fixed || false ">
							<template #default="scope">
								<slot :name="subItem.prop" :value="scope.row[subItem.prop]"></slot>
							</template>
						</el-table-column>
					</template>
				</el-table-column>

				<el-table-column v-else-if="item.show !== false && item.show !== 'template' && item.show !== 'input' && item.show !=='switch' && item.show !=='radio'" :key="item.id + item.prop" :show-overflow-tooltip="item.showToolTip ? item.showToolTip : true" :label="item.label" :prop="item.prop" :sortable="item.sortable" :align="item.align" :class-name="item.className ? item.className : ''" :width="item.width ? item.width : ''" :min-width="item.minWidth ? item.minWidth : ''" :fixed="item.fixed || false ">
					<template #default="scope">
						<span :style="{'color': item.color ? item.color : ''}">{{ scope.row[item.prop] }}</span>
					</template>
				</el-table-column>

				<el-table-column v-else-if="item.show!== false && item.show === 'input'" :key="item.id + item.label" show-overflow-tooltip :label="item.label" :prop="item.prop" :sortable="item.sortable" :class-name="item.className ? item.className : ''" :width="item.width ? item.width : ''" :min-width="item.minWidth ? item.minWidth : ''" :fixed="item.fixed || false ">
					<template #default="scope">
						<el-input v-model="scope.row[item.prop]" class="edit-input" size="small" @change="itemChange(scope.row,item.prop,scope.$index)" />
					</template>
				</el-table-column>
			</template>

			<el-table-column v-if="table.hasOperation" align="center" fixed="right" column-key="operation" :label="table.operation.label" :width="table.operation.width ? table.operation.width : ''" :min-width="table.operation.minWidth ? table.operation.minWidth : ''" :class-name="table.operation.className">
				<template #default="scope">
					<template v-for="item in table.operation.data.slice(0,3)">

						<!-- 统一配置操作按钮 -->
						<el-tooltip v-if="table.hiddenOpeation ? table.hiddenOpeation(scope.row.requireStatus).indexOf((item.Fun)) > -1 : true" :key="item.id" effect="dark" :content="item.label" placement="top" :open-delay="500">
							<el-button plain :class="item.classname ? item.classname : 'button-style'" :type="item.type" :size="item.size" :icon="item.icon" :disabled="item.disabled" circle @click.stop="handleOperation(item.Fun, scope.$index, scope.row, item.id)"></el-button>
						</el-tooltip>
					</template>
					<el-dropdown v-if="table.operation.data.length>3" szie="mini" @command="handleCommand">
						<i class="iconfont icon-24gf-ellipsisVertical font" style="font-size: 18px; margin-left: 10px;" />
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item v-for="moreItem in table.operation.data.slice(3)" :key="moreItem.id" :command="{row:scope.row,Fun:moreItem.Fun,index:scope.$index,id:moreItem.id}">
									{{ moreItem.label }}
								</el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>
				</template>
			</el-table-column>

			<el-table-column v-if="table.hasEmptyCell"></el-table-column>

			<template v-slot:empty>
				<div style="margin: 0 auto; width: 200px; text-align: center; margin-top: 30px;">
				</div>
				<p style="margin-top: 23px;">
				<div class="noData"><img src="@/assets/header/noData.png"><span class="noDataText">{{table.emptyText || '暂无数据'}}</span></div>
				</p>
			</template>
			<slot name="extra"></slot>
		</el-table>

		<div v-if="table.hasPagination" class="pagination_row">
			<!-- 分页组件 -->
			<el-pagination class="el-pagination-style" :total="table.totalCount" :page-sizes="table.pageSizes" :page-size="table.pageSize" :layout="table.layout ? table.layout : 'total, prev, pager, next, sizes, jumper'" :current-page="table.page" @size-change="handleSizeChange" @current-change="handleCurrentChange"></el-pagination>
		</div>
	</div>
</template>

<script  lang='ts'>
import { fontSizeWidth } from '@/utils/rem'
import { defineComponent, reactive, ref, toRefs } from 'vue'
// import noData from "@/assets/header/noData.png"
export default defineComponent({
	name: 'CommonTable',
	props: {
		table: {
			type: Object,
			default() {
				return {
					showHeader: true, // 是否显示表头
					totalCount: Number, // 表格数据总数
					pageSizes: Array, // 决定每页显示的条数[10,15,20,25]
					currentPage: Number, // 当前页
					layout: String, // 分页组件的组件
					hasEmptyCell: false, // 表格结尾是否要空白单元格 填补页面空白
					loading: false, // 加载中动画
					tableHeight: 0, // 表头的高度
					hasShowSummary: false, // 是否显示表位合计行
					emptyText: '暂无数据', // 空数据时候的备注
					border: false, // 是否带有纵向边框，默认为false
					hasSelect: false, // 有无选中功能
					hasOperation: false, // 有无操作功能
					multipleChoice: false, // 是否开启单选模式
					treeProps: { children: 'children', hasChildren: 'hasChildren' }, // 树形数据处理
					expandAll: false, // 是否默认展开
					rowKey: 'pkid', // 配套树形数据id
					places: 2, // 小数点保留位数 --- 合计相关
					ignoreSum: [], //需要被忽略的合计项 --- 合计相关
					unit: '', // 单位 --- 合计相关
					getSpanMethod: Function,
					tr: [
						{
							id: '1',
							label: 'label',
							prop: 'prop',
							className: 'classname',
							minWidth: '80',
							sortable: false, // 是否排序
							show: true, // false隐藏当前列，true常规表格列
						},
					],
				}
			},
		},
		rowStyle: {
			type: Object,
			default() {
				return {
					// 'height':'54px',
					'font-weight': '600',
					'font-family': 'PingFangSC-SNaNpxibold',
					'font-size': fontSizeWidth(20),
					color: '#0B0F5A',
				}
			},
		},
		cellStyle: {
			type: Object,
			default() {
				return { padding: '7px 0px' }
			},
		},
		headerStyle: {
			type: Object,
			default() {
				return {
					// width: '36px',
					'font-family': 'PingFangSC-Regular',
					'font-weight': '400',
					'font-size': fontSizeWidth(18),
					color: '#5B6276',
				}
			},
		},
	},
	setup(props, { emit }) {
		const Commontable = ref<any>(null)

		const state = reactive({})

		const handleCellClassName = ({ columnIndex }) => {
			if (columnIndex == props.table.heightLight) {
				return 'height_light'
			}
		}

		// 单选模式下的全选按钮禁用
		const headerCellClassName = ({ columnIndex }) => {
			if (columnIndex === 0 && props.table.multipleChoice) {
				return 'seltAllbtnDis'
			}
		}
		const isKey = (obj: object, str: string) => {
			return obj.hasOwnProperty(str)
		}
		// 自定义的合计计算方法
		const getSummaries = ({ columns, data }) => {
			const sums = [] as Array<string>
			if (props.table.needUnit) {
				columns.forEach((column, index) => {
					if (index === 0) {
						sums[index] = '合计'
						return
					}
					const values = data.map((item) => Number(item[column.property]))
					const tr = props.table.tr.find(
						(item) => item.prop === column.property
					)
					const unit = tr.perUnit ? tr.perUnit : ''
					if (!values.every((value) => Number.isNaN(value))) {
						sums[index] = `${values.reduce((prev, curr) => {
							const value = Number(curr)
							if (!Number.isNaN(value)) {
								return prev + curr
							} else {
								return prev
							}
						}, 0)}`
						sums[index] = unit
							? Number(sums[index]).toFixed(2) + unit
							: sums[index]
					} else {
						sums[index] = ''
					}
				})
			} else if (props.table.aggregatedData) {
				columns.forEach((column: any, index: number) => {
					// console.log("===",column)
					if (index === 0) {
						sums[index] = '合计'
						return
					} else if (isKey(props.table.aggregatedData, column.property)) {
						sums[index] = props.table.aggregatedData[column.property]
					} else {
						sums[index] = ''
					}
				})
			} else {
				columns.forEach((column: any, index: number) => {
					if (index === 0) {
						sums[index] = '合计'
						return
					}

					let values = []
					if (props.table.ignoreSum) {
						values = data
							.filter(
								(i) => props.table.ignoreSum.indexOf(column.property) === -1
							)
							.map((item: any) => Number(item[column.property]))
					} else {
						values = data.map((item: any) => Number(item[column.property]))
					}

					if (!values.every((value: any) => isNaN(value))) {
						const total = values.reduce((prev: any, curr: any) => {
							const value = Number(curr)
							if (!isNaN(value)) {
								return prev + curr
							} else {
								return prev
							}
						}, 0)
						sums[index] = props.table.places
							? total.toFixed(props.table.places)
							: total.toFixed(2)
						sums[index] = props.table.unit
							? sums[index] + props.table.unit
							: sums[index]
					} else {
						// try{
						//   sums[index] = data[index][column.property]
						// }catch{
						sums[index] = ''
						// }
					}
				})
			}
			return sums
		}
		// 选项发生变化
		const handleSelectionChange = (val) => {
			emit('onHandleSelectionChange', val)
		}

		// 用户勾选数据行时触发
		const select = (selection, row) => {
			// 单选模式下清除历史选中项
			if (props.table.multipleChoice && selection.length > 1) {
				Commontable.value.toggleRowSelection(selection.shift(), false)
			}
			emit('select', selection, row)
		}

		const selectAll = () => {
			emit('selectAll')
		}

		const MouseEnter = (row, column, cell, event) => {
			emit('MouseEnter', {
				row: row,
				column: column,
				cell: cell,
				event: event,
			})
		}

		const MouseOut = (row, column, cell, event) => {
			emit('MouseOut', {
				row: row,
				column: column,
				cell: cell,
				event: event,
			})
		}

		// 排序
		const sortChange = (data) => {
			emit('onSortChange', data)
		}

		// 点击行事件
		const rowClick = (Row, Event, Column) => {
			const invalidClick =
				!Column ||
				Column.type === 'selection' ||
				Column.columnKey === 'operation' ||
				Column.type === 'expand'
			if (invalidClick) return
			const data = {
				row: Row,
				event: Event,
				column: Column,
			}
			emit('onRowClick', data)
		}

		// 点击列事件
		const handleHeaderClick = (Column, event) => {
			const invalidClick =
				!Column ||
				Column.type === 'selection' ||
				Column.columnKey === 'operation' ||
				Column.type === 'expand'
			if (invalidClick) return
			const data = {
				event: event,
				column: Column,
			}
			emit('onColumnClick', data)
		}

		// 禁用行选择功能
		const selectable = (row) => {
			return !row.disabled
		}

		const switchChange = (val) => {
			emit('switchChange', val)
		}

		const radioChange = (val, prop, index) => {
			emit('radioChange', val, prop, index)
		}

		// 表单Input框change事件
		const itemChange = (row, prop, index) => {
			emit('itemChange', row, prop, index)
		}

		// 点击操作按钮触发
		const handleOperation = (methods, index, row, id) => {
			const data = props.table.operation.data
			for (let i = 0; i < data.length; i++) {
				if (id === data[i].id) {
					emit('handleButton', {
						methods: methods,
						row: row,
						index: index,
						id: id,
					})
				}
			}
		}

		// 点击操作按钮触发
		const handleCommand = (command) => {
			const { row, Fun, index, id } = command
			emit('handleButton', {
				methods: Fun,
				row: row,
				index: index,
				id: id,
			})
		}

		const handleSizeChange = (size) => {
			emit('pageSizeChange', size)
		}

		const handleCurrentChange = (currentPage) => {
			emit('currentPageChange', currentPage)
		}
		const tableRowClassName = ({
			row,
			rowIndex,
		}: {
			row: User
			rowIndex: number
		}) => {
			if (rowIndex % 2 !== 0) {
				return 'warning-row-odd-row' // 奇数行的类名
			}
			return '' // 偶数行的类名为空
		}

		return {
			...toRefs(state),
			headerCellClassName,
			tableRowClassName,
			getSummaries,
			handleSelectionChange,
			select,
			selectAll,
			MouseEnter,
			MouseOut,
			sortChange,
			rowClick,
			handleHeaderClick,
			selectable,
			switchChange,
			radioChange,
			itemChange,
			handleOperation,
			handleCommand,
			handleSizeChange,
			handleCurrentChange,
			handleCellClassName,
		}
	},
})
</script>

<style lang='scss' scoped>
.common-table {
	width: 99.9%;
}

.el-table {
	background-color: transparent;
	border: none;
	--el-table-border-color: transparent !important;

	.cell {
		background-color: transparent;
	}

	.el-table__inner-wrapper::before {
		height: 0;
	}

	::v-deep .height_light {
		color: #4b67f8;
		font-size: 22px;
		font-weight: 600;
	}

	::v-deep .el-table__body-wrapper {
		order: 0;
	}

	::v-deep .warning-row-odd-row {
		background: rgba($color: #ebeafc, $alpha: 0.3);
		// --el-table-tr-bg-color: var(--el-fill-color-lighter);
	}
	::v-deep .el-table__footer-wrapper .el-table__footer td {
		background-color: #fff;
		text-align: center;
		font-family: DIN-Bold;
		font-weight: 600;
		font-size: 20 * $base;
		color: #0b0f5a;
		border: none;
	}
}
.el-table {
	width: 100%;

	--el-table-border-color: transparent !important;
	--el-table-row-hover-bg-color: transparent !important;
	--el-table-bg-color: transparent !important;
	--el-table-header-bg-color: transparent !important;
	--el-table-tr-bg-color: transparent !important;

	::v-deep .el-table__header {
		.cell {
			font-family: PingFangSC-Regular;
			font-weight: 400;
			font-size: 18 * $base;
			color: #5b6276;

			// padding: 0 36*$base 0 0; 建议从外层覆盖
		}
	}

	::v-deep .el-table__body-wrapper {
		order: 0; // 合计行位置
	}

	::v-deep .el-table__body {
		.cell {
			font-family: DIN-Bold;
			font-weight: 700;
			font-size: 20 * $base;
			color: #0b0f5a;
			// padding: 0 36*$base 0 0; 建议从外层覆盖
		}
	}
}
.noData {
	margin-top: -30 * $base;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	img {
		width: 70 * $base;
		height: 70 * $base;
	}
	.noDataText {
		line-height: 50 * $base;
		padding-left: 10 * $base;
		font-size: 16 * $base;
	}
}
.el-table {
	width: 100%;

	--el-table-border-color: transparent !important;
	--el-table-row-hover-bg-color: transparent !important;
	--el-table-bg-color: transparent !important;
	--el-table-header-bg-color: transparent !important;
	--el-table-tr-bg-color: transparent !important;

	::v-deep .el-table__header {
		.cell {
			font-family: PingFangSC-Regular;
			font-weight: 400;
			// font-size: 18*$base;
			color: #5b6276;

			// padding: 0 36*$base 0 0; 建议从外层覆盖
		}
	}

	::v-deep .el-table__body-wrapper {
		order: 0; // 合计行位置
	}

	::v-deep .el-table__body {
		.cell {
			font-family: DIN-Bold;
			font-weight: 700;
			font-size: 20 * $base;
			color: #0b0f5a;
			// padding: 0 36*$base 0 0; 建议从外层覆盖
		}
	}
	::v-ddep .el-scrollbar__view {
		height: 100%;
	}
}
.noData {
	margin-top: -30 * $base;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	img {
		width: 70 * $base;
		height: 70 * $base;
	}
	.noDataText {
		line-height: 50 * $base;
		padding-left: 10 * $base;
		font-size: 16 * $base;
	}
}
.seltAllbtnDis .cell {
	visibility: hidden;
}

.el-dropdown-menu.el-popper div.drop {
	padding: 10px;
	min-width: 166px;

	.checkAll {
		margin-top: 5px;
		display: block;
	}

	.line {
		width: 75%;
		margin: 5px auto;
	}

	.el-checkbox-group div.checkboxLists {
		max-height: 260px;
		padding-right: 10px;
		overflow-y: scroll;
	}
}
</style>
<style lang="scss">
.el-tooltip__popper {
	max-width: 50%;
}
</style>
<style lang="scss" scoped>
.bar-wrap {
	width: 100%;
	display: flex;
	align-items: center;
	.value {
		text-align: center;
		margin-right: 10 * $base;
		min-width: 80 * $base;
		color: #4b67f8;
		font-weight: 700;
		font-size: 22 * $base;
	}
	.process {
		width: 100%;
		display: flex;
		align-items: center;
		height: 12 * $base;
		width: 156 * $base !important;
		background: #b6c2ff;
		border-radius: 4 * $base;
		.per-bar {
			height: 12 * $base;
			background: #4b67f8;
			border-radius: 4 * $base;
		}
	}
}
</style>