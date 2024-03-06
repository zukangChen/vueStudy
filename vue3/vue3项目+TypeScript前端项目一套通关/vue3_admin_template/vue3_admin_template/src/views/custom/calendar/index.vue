<template>
	<!-- 日历组件 -->
	<div class="calendar-container">
		<div class="custom-calendar">
			<div class="query">
				<el-select class="query-year" @change="dateChange" v-model="queryForm.year" placeholder="请选择年份">
					<el-option v-for="item in yearOptions" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
				<el-select class="query-month" @change="dateChange" v-model="queryForm.month" placeholder="请选择月份">
					<el-option v-for="item in monthOptions" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
			</div> -->
			<div class="date">{{getCurrentDate().year}} {{getCurrentDate().month}} {{getCurrentDate().day}} 星期：{{getDayOfWeek(getCurrentDate().year,getCurrentDate().month,getCurrentDate().day)}}</div>
			<!-- 头部 -->
			<div class="header">
				<div class="left">
					<div class="arrow" @click="changeTwoWeeks('up')">
						《
					</div>
					<div class="arrow" @click="changeTwoWeeks('down')">
						》
					</div>
				</div>
				<div class="right">
					<div>星期一</div>
					<div>星期二</div>
					<div>星期三</div>
					<div>星期四</div>
					<div>星期五</div>
					<div>星期六</div>
					<div>星期日</div>
				</div>
			</div>
			<!-- 内容 -->
			<div class="calendar-wrap">
				<!-- 事件 -->
				<div class="left">
					<div class="line"></div>
					<div class="left-main" style="flex:1">
						<div class="box">
							<div class="circle circle-blue"></div>
							<div class="label">假日活动</div>
						</div>
						<div class="box">
							<div class="circle circle-green"></div>
							<div class="label">政治会议</div>
						</div>
						<div class="box">
							<div class="circle circle-red"></div>
							<div class="label">极端天气</div>
						</div>
					</div>
				</div>
				<!-- 日期 -->
				<div class="content">
					<div class="day-box" v-for="(item, index) in oneWeeks" :key="'one'+index">
						<div class="num">{{item.day}}</div>
						<div class="info flexBox">
							<!-- 日期标识id -->
							<!-- <span>{{item.id}}</span> -->
							<div class="info-box flexBox circle-blue">8</div>
							<div class="info-box flexBox circle-green">12</div>
							<div class="info-box flexBox circle-red">9</div>
						</div>
					</div>
				</div>
			</div>
			<div class="calendar-wrap">
				<!-- 事件 -->
				<div class="left">
					<div class="line"></div>
					<div class="left-main" style="flex:1">
						<div class="box">
							<div class="circle circle-blue"></div>
							<div class="label">假日活动</div>
						</div>
						<div class="box">
							<div class="circle circle-green"></div>
							<div class="label">政治会议</div>
						</div>
						<div class="box">
							<div class="circle circle-red"></div>
							<div class="label">极端天气</div>
						</div>
					</div>
				</div>
				<!-- 日期 -->
				<div class="content">
					<div class="day-box" v-for="(item, index) in twoWeeks" :key="'two'+index">
						<div class="num">{{item.day}}</div>
						<div class="info flexBox">
							<!-- 日期标识id -->
							<!-- <span>{{item.id}}</span> -->
							<div class="info-box flexBox circle-blue">88</div>
							<div class="info-box flexBox circle-green"></div>
							<div class="info-box flexBox circle-red"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup name="Construction">
import { ref, reactive, watch } from 'vue'
const emit = defineEmits(['updateQueryForm'])

const yearOptions = reactive([]) // 年份options
const currentYear = new Date().getFullYear()
for (let year = currentYear; year >= currentYear - 100; year--) {
	yearOptions.push({
		value: year.toString(),
		label: year.toString(),
	})
}
const monthOptions = reactive([]) // 月份options
const currentMonth = new Date().getMonth() + 1
for (let month = currentMonth; month > 1; month--) {
	monthOptions.push({
		value: month.toString(),
		label: month.toString(),
	})
}

// 日历查询表单
let queryForm = reactive({
	year: currentYear,
	month: currentMonth,
})

// 日期变化更新日历信息
function dateChange() {
	getWeeks({
		year: queryForm.year,
		month: queryForm.month,
		day: '01',
	})
}

const oneWeeks = ref([]) // 第一周
const twoWeeks = ref([]) // 第二周
let weeks = ref([]) // 当前两周
// 星期数组
const days = [
	'星期日',
	'星期一',
	'星期二',
	'星期三',
	'星期四',
	'星期五',
	'星期六',
]
const daysMap = {
	星期一: 0,
	星期二: 1,
	星期三: 2,
	星期四: 3,
	星期五: 4,
	星期六: 5,
	星期日: 6,
}

// 获取当前日期
function getCurrentDate() {
	// 创建一个Date对象来获取当前日期
	const currentDate = new Date()

	// 获取年份
	const year = currentDate.getFullYear()

	// 获取月份（注意，月份是从0开始的，所以我们需要加1）
	const month = currentDate.getMonth() + 1

	// 获取日期
	const day = currentDate.getDate()
	return {
		year: year,
		month: month.toString().padStart(2, '0'),
		day: day.toString().padStart(2, '0'),
	}
}
function getDayOfWeek(year, month, day) {
	// 创建一个Date对象，设置年、月、日
	const date = new Date(year, month - 1, day)

	// 获取该日期对应的星期几（0表示星期日，1表示星期一，以此类推）
	const dayOfWeek = date.getDay()
	// 返回对应的星期几
	return {
		week: days[dayOfWeek],
		index: daysMap[days[dayOfWeek]],
	}
}
console.log('星期几:', getDayOfWeek(2023, 9, 7))

// 获取某日期之前的日期
const getBeforeDate = (now, n = 0) => {
	// if (now) {
	// 	now = new Date(now)
	// } else {
	// 	now = new Date()
	// }
	// 减去n天
	now.setDate(now.getDate() - n)
	// 获取年月日
	let year = now.getFullYear()
	let month = now.getMonth() + 1 // 注意，月份是从0开始的，所以我们需要加1
	let day = now.getDate()
	return {
		year: year,
		month: month.toString().padStart(2, '0'),
		day: day.toString().padStart(2, '0'),
	}
}

// 获取具体某一天中的2周日期 date:{year: 2023, month: '09', day: '07'}
function getWeeks(date) {
	let currentDate = date ? date : getCurrentDate()
	console.log('cur', currentDate)
	let daysOfWeek = getDayOfWeek(
		currentDate.year,
		currentDate.month,
		currentDate.day,
	)
	let currentIndex = daysOfWeek.index
	weeks.value = []
	// 获取当前日期左边的日期
	for (let i = 0; i < currentIndex; i++) {
		let dateStr =
			currentDate.year + '-' + currentDate.month + '-' + currentDate.day
		let date = new Date(dateStr)
		let day = getBeforeDate(date, currentIndex - i)
		// console.log('day', day)
		weeks.value.push(transObj(day))
	}
	// 获取当前日期右边的日期
	for (let i = currentIndex; i < 14; i++) {
		let dateStr =
			currentDate.year + '-' + currentDate.month + '-' + currentDate.day
		let date = new Date(dateStr)
		let day = getBeforeDate(date, currentIndex - i)
		weeks.value.push(transObj(day))
	}
	oneWeeks.value = weeks.value.slice(0, 7) // 更新第一周日期
	twoWeeks.value = weeks.value.slice(7) // 更新第二周日期
}

// 日期对象转换函数
function transObj(obj) {
	return {
		year: obj.year,
		month: obj.month,
		day: obj.day,
		id: obj.year + obj.month + obj.day,
	}
}
getWeeks()
// oneWeeks.value = weeks.value.slice(0, 7)
// twoWeeks.value = weeks.value.slice(7)
console.log('Weeks', weeks.value)
console.log('one', oneWeeks.value)
console.log('two', twoWeeks.value)

// 变动两个礼拜的weeks
function changeTwoWeeks(mark) {
	let currentDate = mark === 'up' ? weeks.value[0] : weeks.value[13]
	weeks.value = []
	for (let i = 1; i <= 14; i++) {
		let dateStr =
			currentDate.year + '-' + currentDate.month + '-' + currentDate.day
		let date = new Date(dateStr)
		let day = getBeforeDate(date, mark === 'up' ? i : -i)
		if (mark === 'up') {
			weeks.value.unshift(transObj(day))
		} else {
			weeks.value.push(transObj(day))
		}
	}
	oneWeeks.value = weeks.value.slice(0, 7)
	twoWeeks.value = weeks.value.slice(7)
	updateQueryForm()
	console.log('upWeeks', weeks)
}
// 下两个礼拜的weeks
// function downTwoWeeks() {
// 	let currentDate = weeks.value[13]
// 	weeks.value = []
// 	for (let i = 1; i <= 14; i++) {
// 		let dateStr =
// 			currentDate.year + '-' + currentDate.month + '-' + currentDate.day
// 		let date = new Date(dateStr)
// 		let day = getBeforeDate(date, -i)
// 		weeks.value.push(transObj(day))
// 	}
// 	oneWeeks.value = weeks.value.slice(0, 7)
// 	twoWeeks.value = weeks.value.slice(7)
// 	updateQueryForm()
// 	console.log('downWeeks', weeks)
// }

// 更新queryForm的年月
function updateQueryForm() {
	let cur = oneWeeks.value[6] // 当前第一周的星期天是哪年哪月，当前queryForm就显示哪年哪月
	emit('updateQueryForm', cur)
	// queryForm.year = cur.year
	// queryForm.month = cur.month
}
defineExpose({
	getWeeks,
})
</script>

<style scoped lang="scss">
.calendar-container {
	width: calc(100% - 20px);
	height: calc(100% - 120px);
	display: flex;
	align-items: center;
	justify-content: center;
	color: #fff;
	font-size: 19.2px;
	background-color: #cfcfcf;
	.custom-calendar {
		width: 100%;
		height: 100%;
		border: 1px solid grey;
		.query {
			.query-year,
			.query-month {
				width: 100px;
			}
		}
		.header {
			height: 40.8px;
			border-bottom: 1px solid #cfcfcf;
			display: flex;
			align-items: center;
			.left {
				font-family: JDLANGZHENGTI--GB1-0;
				font-size: 19.2px;
				width: 130px;
				display: flex;
				justify-content: space-around;
				.arrow {
					width: 31.2px;
					height: 31.2px;
					background: #ffffff4d;
					border: 1.2px solid #ffffff;
					box-shadow: inset 0 0 3.6px 2.4px #ffffff80;
					border-radius: 50%;
					text-align: center;
					line-height: 31.2px;
					font-weight: bold;
					cursor: pointer;
				}
			}
			.right {
				flex: 1;
				display: flex;
				justify-content: space-around;
			}
		}
		.calendar-wrap {
			border-bottom: 1px solid #cfcfcf;
			display: flex;
			.left {
				font-family: JDLANGZHENGTI--GB1-0;
				font-size: 19.2px;
				width: 130px;
				height: 180px;
				display: flex;
				flex-direction: column;
				.line {
					height: 35px;
					border-bottom: 1px solid #cfcfcf;
				}
				.left-main {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					flex: 1;
					padding: 12px;
				}
				.box {
					display: flex;
					align-items: center;
					justify-content: center;
					.circle {
						width: 10px;
						height: 10px;
						border-radius: 50%;
						margin-right: 10px;
					}
				}
			}
			.content {
				flex: 1;
				display: flex;
				justify-content: space-around;
				overflow: hidden;
				.day-box {
					flex: 1;
					display: flex;
					flex-direction: column;
					.num {
						border-bottom: 1px solid #cfcfcf;
						text-align: center;
						font-family: PolenticalNeonRegular;
						font-size: 14.4px;
						height: 35px;
						line-height: 35px;
					}
					.info {
						flex: 1;
						text-align: center;
						font-size: 12px;
						border-left: 1px solid #cfcfcf;
						flex-direction: column;
						justify-content: space-around;
						.info-box {
							width: 38.2px;
							height: 38.2px;
							// background: #91a8ff66;
							// border: 1.2px solid #c0cdffcc;
							border-radius: 50%;
							font-family: PolenticalNeonRegular;
							font-size: 20px;
							color: #ffffff;
						}
					}
				}
			}
		}
	}
}
.flexBox {
	display: flex;
	align-items: center;
	justify-content: center;
}
.circle-blue {
	background-color: #4c567b;
	border: 1.2px solid #c0cdffcc;
}
.circle-green {
	background-color: #467674;
	border: 1.2px solid #89ffe3;
}
.circle-red {
	background-color: #754347;
	border: 1.2px solid #ff737e;
}
</style>