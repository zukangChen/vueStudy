<template>
	<!-- 自定义进度条 -->
	<div class="progress">
		<div class="progress_box">
			<!-- 车辆、通号等处置 -->
			<div class="configTime" v-for="(item, index) in progressObj.arr" :key="index">
				<div class="flexBox">
					<div class="emptyLine" :style="{ width: item.startRangestar + '%',}"></div>
					<div class="lineBox" :style="{ width: item.time + '%'}">
						<div class="label">
							<div>{{item.beginTime}}</div>
							<div>{{item.name}}</div>
							<div>{{item.endTime}}</div>
						</div>
						<div class="line"></div>
						<div class="time">{{item.time}}</div>
					</div>

				</div>
			</div>
			<!-- 事件预计处置时间 -->
			<div class="handlTime">
				<div class="label">事件预计处置时间</div>
				<div class="flexBox">
					<div class="lineBox" v-for="(item,index) in progressObj.handlTimeArr.length - 1" :key="item">
						<div class="line"></div>
						<div class="endLine">
							<span>{{progressObj.handlTimeArr[index]}}</span>
							<span style="text-align:right" v-if="index === progressObj.handlTimeArr.length - 2">{{progressObj.handlTimeArr[index+1]}}</span>
						</div>

					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup name="Progress">
import { reactive } from 'vue'
// 接受父组件传参
const props = defineProps({
	progressObj: {
		type: Object,
		default: () => ({
			handlTime: 80,
			handlTimeArr: [0, 20, 40, 60, 80],
			arr: [
				{
					name: '通号',
					beginTime: '9:20',
					endTime: '10:20',
					startRangestar: '20',
					time: '60',
				},
				{
					name: '车辆',
					beginTime: '9:00',
					endTime: '9:40',
					startRangestar: '0',
					time: '40',
				},
			],
		}),
	},
})
</script>

<style lang="scss" scoped>
.flexBox {
	display: flex;
}
.progress {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #cfcfcf;
	// width: 1500px;
	.progress_box {
		width: 500px;
		color: white;
		padding: 20px 10px;
		background-color: #aaa;
		border-radius: 20px;
		.handlTime {
			.label {
				text-align: center;
			}
			.lineBox {
				flex: 1;
				.line {
					height: 10px;
					background-color: #fff;
					margin: 5px 0;
				}
				.endLine {
					display: flex;
					justify-content: space-between;
				}
			}
		}
		.configTime {
			margin: 20px 0;
			.emptyLine,
			.line {
				height: 10px;
				background-color: #fff;
				margin: 5px 0;
			}
			.emptyLine {
				background-color: #cfcfcf;
			}
			.lineBox {
				position: relative;
				.label {
					text-align: center;
					position: absolute;
					bottom: 35px;
					left: 50%;
					transform: translate(-50%, 0%);
					display: flex;
					justify-content: space-between;
					width: 100%;
				}
				.time {
					text-align: center;
				}
			}
		}
	}
}
</style>
