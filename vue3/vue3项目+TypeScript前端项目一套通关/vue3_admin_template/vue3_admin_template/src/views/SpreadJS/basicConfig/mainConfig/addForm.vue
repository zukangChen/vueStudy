<!-- 新增/编辑基础配置 -->
<template>
	<div class="addForm">
		<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm" status-icon>

			<div class="form-flex">
				<el-form-item label="线路" prop="lineName" style="width:400px">
					<el-select v-model="ruleForm.lineName" placeholder="请选择所在线路">
						<el-option v-for="dict in lineOptions" :key="dict.id" :label="dict.name" :value="dict.id"></el-option>
					</el-select>
				</el-form-item>
			</div>
			<div class="form-flex">
				<el-form-item label="所别名称" prop="palceName" style="width:400px">
					<el-input v-model="ruleForm.palceName" placeholder="请输入所别名称" />
				</el-form-item>
			</div>
			<div class="form-flex">
				<el-form-item label="备注" prop="notes">
					<el-input v-model="ruleForm.notes" placeholder="请输入备注" type="textarea" style="width:800px" :autosize="{ minRows: 3, maxRows: 3 }" />
				</el-form-item>
			</div>

			<div class="custom-table-container">
				<el-button type="primary" style="margin-bottom:6px" @click="addRow"><img style="margin-right:6px" alt="" src="@/assets/icons/plus-square.png">新增</el-button>
				<el-table :data="ruleForm.tableData" style="width: 100%">
					<el-table-column type="index" label="计量点编号" width="100" :index="(index) => `J${index+1}`" />
					<el-table-column prop="col1" label="计量点名称" width="180">
						<template #default="scope">
							<el-input v-model="scope.row.col1"></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="col2" label="生产运营用电占比" width="180">
						<template #default="scope">
							<el-input v-model="scope.row.col2"></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="col3" label="非生产运营用电占比" width="180">
						<template #default="scope">
							<el-input v-model="scope.row.col3"></el-input>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="120">
						<template #default="scope">
							<el-button type="danger" @click="removeRow(scope.$index)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</el-form>

	</div>
</template>

<script setup name="addForm" lang="ts">
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import {
	validatePhone,
	validateMail,
	validNumber,
} from '@/components/commonForm/validate/index.js'
const { proxy } = getCurrentInstance()
import { getToken } from '@/utils/auth'
const uploadUrl = ref(import.meta.env.VITE_APP_BASE_API + '/common/upload') // 上传的图片服务器地址
const headers = ref({
	Authorization: 'Bearer ' + getToken(),
})
const props = defineProps({
	formType: {
		// 表单类型： 新增、编辑
		type: String,
		default: 'add',
	},
	formData: {
		type: Object,
		default: () => ({}),
	},
	lineOptions: {
		// 线路下拉
		type: Array,
		default: () => [],
	},
})

// 查询条件
const ruleForm = ref({
	lineName: '',
	palceName: '',
	notes: '', // 备注
	tableData: [{ col1: '', col2: '', col3: '' }],
})

// 表单规则
const rules = reactive({})

const addRow = () => {
	event.preventDefault() // 避免误触表单的提交方法
	ruleForm.value.tableData.push({ col1: '', col2: '', col3: '' })
}

const removeRow = (index) => {
	ruleForm.value.tableData.splice(index, 1)
}

const ruleFormRef = ref<FormInstance>() // 表单实例
// 保存
const submitForm = (formEl = ruleFormRef.value) => {
	if (!formEl) return
	return new Promise((resolve) => {
		formEl.validate((valid) => {
			if (valid) {
				const obj = {
					ruleForm: ruleForm.value,
					formType: props.formType,
					id: props.formType === 'edit' ? props.formData.id : '',
				}
				resolve(obj)
			} else {
				console.log('error submit!')
			}
		})
	})
}
// 重置表单
const resetForm = (formEl = ruleFormRef.value) => {
	if (!formEl) return
	formEl.resetFields()
}

onMounted(() => {
	if (props.formType === 'edit') {
		// 如果是编辑表单 ...
		const formData = props.formData
		ruleForm.value = {
			lineName: formData.lineName,
			palceName: formData.palceName,
			notes: formData.notes, // 备注
		}
	}
})

defineExpose({
	submitForm,
	resetForm,
})
</script>

<style lang="scss" scoped>
</style>
