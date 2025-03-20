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
				<el-form-item label="日期" prop="dateVal" style="width:400px">
					<el-date-picker v-model="ruleForm.dateVal" type="month" placeholder="请选择日期" format="YYYY-MM" value-format="YYYY-MM" />
				</el-form-item>
			</div>
			<div class="form-flex">
				<el-form-item label="范围" prop="ranage" style="width:400px">
					<el-select v-model="ruleForm.ranage" placeholder="请选择范围">
						<el-option v-for="dict in ranageOptions" :key="dict.id" :label="dict.name" :value="dict.id"></el-option>
					</el-select>
				</el-form-item>
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
	dateVal: '',
	ranage: '',
})
const ranageOptions = [
	{
		id: '上旬',
		name: '上旬',
	},
	{
		id: '下旬',
		name: '下旬',
	},
]
// 表单规则
const rules = reactive({
	lineName: [
		{
			required: true,
			message: '线路不能为空',
			trigger: 'change',
		},
	],
	dateVal: [
		{
			required: true,
			message: '日期不能为空',
			trigger: 'change',
		},
	],
	ranage: [
		{
			required: true,
			message: '范围不能为空',
			trigger: 'change',
		},
	],
})

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
:deep(.el-input) {
	width: 100%;
}
</style>
