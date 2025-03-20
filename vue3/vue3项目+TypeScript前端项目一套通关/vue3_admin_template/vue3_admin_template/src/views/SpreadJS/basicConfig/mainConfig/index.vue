<!-- 主所配置 -->
<template>
	<div class="basciContainer">
		<!-- 查询头部 -->
		<el-card shadow="never" body-class="pb-0" class="mb-10">
			<el-form :model="query" ref="queryForm" :inline="true" label-width="40px">
				<el-form-item label="线路">
					<el-select v-model="query.lineName" placeholder="请选择" clearable style="width: 150px">
						<el-option v-for="dict in lineOptions" :key="dict.id" :label="dict.name" :value="dict.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="所别">
					<el-input v-model="query.palceName" placeholder="请输入所别名称" />
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="Search" @click="search(query)">搜索</el-button>
					<el-button type="primary" @click="addForm"><img style="margin-right:6px" alt="" src="@/assets/icons/plus-square.png">新增</el-button>
				</el-form-item>
			</el-form>
		</el-card>
		<div class="main-box">
			<!-- 表格 -->
			<CommonTable class="main-table" :columns="columns" :handles="handles" :tableData="myTableData" :paginationData="pagination" @handleSizeChange="(value) => handleSizeChange(value)" @handleCurrentChange="(value) => handleCurrentChange(value)" @handleClickBtn="handleClickBtn"></CommonTable>
		</div>
		<!-- 详情表单弹窗 -->
		<CustomDialog v-if="formType === 'view'" class="form-dialog" v-model:dialogVisible="dialogVisible" title="仓库详情" :alignCenter="false" width="700" top="100px" @dialogSubmit="dialogSubmit" @resetForm="resetForm">
			<!-- 查询头部 -->
			<template #default>
				<!-- <Detail ref="addFormRef" :formType="formType" :formData="formData" :formDetailArr="columns"></Detail> -->
			</template>
		</CustomDialog>
		<!-- 新增编辑表单弹窗 -->
		<CustomDialog v-else class="form-dialog" v-model:dialogVisible="dialogVisible" :title="formType === 'add' ? '新增主所' : '编辑主所'" :alignCenter="false" width="900" top="100px" @dialogSubmit="dialogSubmit" @resetForm="resetForm">
			<!-- 查询头部 -->
			<template #default>
				<AddForm v-if="dialogVisible" ref="addFormRef" :formType="formType" :formData="formData" :lineOptions="lineOptions"></AddForm>
			</template>
		</CustomDialog>
	</div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { onMounted, reactive, ref } from 'vue'
import AddForm from './addForm.vue'
// import Detail from '@/components/commonForm/formDetail.vue'
import {
	getApi,
	addApi,
	updateApi,
	delApi,
	getOneApi,
} from '@/api/warehouse.js'

// 查询条件
const query = ref({
	keyWord: '', // 关键字
	lineName: '',
	palceName: '',
})
let lineOptions = [
	{
		id: '1',
		name: '1号线',
	},
	{
		id: '2',
		name: '2号线',
	},
]

import { useTable } from '@/components/CommonTable/useTable'
const addFormRef = ref('') // 新增表单实例
const {
	handleCurrentChange,
	handleSizeChange,
	tableData: totalTableData,
	searchParam,
	pagination,
	search,
	dialogVisible,
	formType,
	formData,
	handleClickBtn,
	resetForm,
	dialogSubmit,
	addForm,
} = useTable(
	{
		// getApi,
		// addApi,
		// updateApi,
		// delApi,
		// getOneApi,
	},
	{
		addFormRef: addFormRef,
		manual: true,
		// dimension: totalEnergtForm.dimension,
		// energyType: totalEnergtForm.energy
	}
)

const columns = ref([
	{ prop: 'number', title: '编号' },
	{ prop: 'lineName', title: '线路' },
	{ prop: 'palceName', title: '所别名称' },
	{ prop: 'notes', title: '备注' },
	{ prop: 'handles', title: '操作', fixed: 'right', width: '160px' },
])
const myTableData = ref([
	{
		number: 1,
		lineName: '1号线',
		palceName: 's',
		notes: '备注',
	},
])
const handles = reactive([
	{
		type: 'edit',
		label: '修改',
		isShow: true,
	},
	{
		type: 'view',
		label: '详情',
		isShow: true,
	},
	{
		type: 'delete',
		label: '删除',
		isShow: true,
	},
])

const formDetailData = ref([]) // 表单详情回显数组
// const formData = ref({}) // 表单编辑回显数据
// const addFormRef = ref('') // 新增表单实例
// 重置表单
// const resetForm = () => {
// 	addFormRef.value.resetForm()
// }
// 弹窗确认
// const dialogSubmit = () => {
// 	addFormRef.value.submitForm()
// }
// 新增表单
// const addForm = () => {
// 	formType.value = 'add'
// 	dialogVisible.value = true
// }
onMounted(() => {})
</script>

<style lang="scss" scoped>
.basciContainer {
	padding: 20px;
	width: 100%;
	height: 100%;
}
.main-box {
	// height: calc(100% - 104px);
	height: 600px;
	display: flex;
	.main-table {
		padding: 20px;
	}
}
</style>
