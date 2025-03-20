<template>
	<div class="DepartmentItemCard project">
		<div class="SwiperBoxDepartmentCard project-swiper">
			<swiper ref="swiper" :navigation="navigation" :slidesPerView="CardData.length < 5 ? CardData.length : 5" :space-between="0" :swiperOptions="swiperOptions" :class="{ isLess: CardData.length < 5 }" :allowTouchMove="false" class="mySwiper" @slideChange="onSlideChange" @swiper="onSwiper">
				<swiper-slide class="bg-color-black item" v-for="(item, index) in newData" @click="instFun(index, item)" :class="{ isItem: currentIndex === index }" :key="index" :virtualIndex="index">
					<div class="mySwiperCard" :class="{ isReserve : item.name == '资源增储量'}">
						<div v-show="item.group">
							<div class="group-top">
								{{ item.des }}
							</div>
							<div class="group-main">
								<div class="left-main">
									<div class="title">
										{{ item.sonTitle }}
										<!-- <img class="explain-icon" src="@/assets/header/explainIcon.png" alt="" /> -->
									</div>
									<div class="count">
										{{ item.groupValue }}
										<div class="unit">{{ item.des.slice(3, 5) }}</div>
									</div>
								</div>
								<div class="right-main">
									<img class="initimg" :src="item.icon" alt="" />
								</div>
							</div>
							<div class="group-buttom">
								<div class="year-area">年</div>
								<div class="date-area">统计日期：{{ item.groupDate }}</div>
							</div>
						</div>

						<div v-show="item.custom">
							<span class="init-transparent">{{
								item.title ? item.title : ''
							}}
								<el-tooltip class="box-item" effect="dark" :content="item.tips" raw-content placement="top">
									<!-- <img class="explain-icon" v-if="item.tips" src="@/assets/header/explainIcon.png" alt="" /> -->
								</el-tooltip></span>
							<span class="init-current">{{ item.sonTitle }}</span>

							<img class="initimg" :src="item.icon" alt="" />
							<div class="selectOptionBox" v-if="item.selectOption">
								<span class="selectOptionSpan">{{
									item.selectOption.name
								}}</span>
								<el-select class="select" popper-class="manpower-select" :teleported="true" filterable allow-create clearable v-model="item.selectOption.value" @change="(val) => chageValue(val)" size="Select">
									<el-option v-for="v in item.selectOption.option" :key="v.value" :label="v.name" :value="v.value">
									</el-option>
								</el-select>
							</div>
						</div>

						<div v-show="!item.custom && !item.group">
							<div class="topcol-1">
								<span class="Acens">
									<img class="imagesName" :src="item.icon" alt="" />
									{{ item.sonTitle }}
									<span>{{ item.title ? item.title : '' }}</span>
									<el-tooltip class="box-item" effect="dark" :content="item.tips" raw-content placement="top">
										<!-- <img class="explain-icon" v-if="item.tips" src="@/assets/header/explainIcon.png" alt="" /> -->
									</el-tooltip>

								</span>
								<span class="topcol-1-2">
									{{ item.des }}
								</span>
							</div>
							<div class="bottom-color">
								<span class="left"></span>
								<span class="border"></span>
								<span class="right"></span>
							</div>
							<!-- 地勘的资源增储量卡片下面数据先隐藏 -->
							<div class="imgBox-bottom" v-if="item.name !== '资源增储量'">
								<span class="yearOrmanth" v-if="item.operName">
									<span class="name">{{ item.operName }}</span>
									<b class="maaber-cont">
										<b class="number-left">{{ item.operValue }}</b>
										<b class="qfx" v-if="item.comValue">/</b>
										<b v-if="item.comValue" class="number-righr" :class="{
											'isRed': item?.comValueWarning
										}">
											{{ item.comValue }}
											<span class="line">%</span>
										</b>
									</b>
								</span>
								<span class="yearOrmanth" v-if="item.annual">
									<span class="name">{{ item.annual }}</span>
									<b class="maaber-cont">
										<b class="number-left">{{ item.annualValue }}</b>
										<b class="qfx" v-if="item.comannualValue">/</b>
										<b class="number-righr" :class="{
											'isRed': item?.comannualValueWarning
										}" v-if="item.comannualValue">{{ item.comannualValue }}
											<span class="line">%</span>
										</b>
									</b>
								</span>
								<!-- 国际财务驾驶舱卡片 -->
								<span v-else-if="item.financial_title" class="yearOrmanth">
									<span class="name">{{ item.financial_title }} </span>
									<b class="maaber-cont">
										<b class="number-left">{{ item.financial_val }}</b>
									</b>
								</span>
								<span v-if="item.financial_name" class="yearOrmanth">
									<span class="name">{{ item.financial_name }} </span>
									<b class="maaber-cont">
										<b class="number-left" :class="[item.financial_yoy >= 0 ? 'number-righr-green' : 'number-righr-red']">{{ item.financial_yoy ? item.financial_yoy + '%' : '--' }}</b>
										<b class="number-left">
											<img v-if="item.financial_yoy >= 0" class="number-right-images rotateX" src="@/assets/header/up.png" alt="" />
											<img v-if="item.financial_yoy<0 " class="number-right-images rotateX" src="@/assets/header/down.png" alt="" />
										</b>
										<b class="qfx" v-if="item.financial_mom">/</b>
										<b class="number-righr" :class="[item.financial_mom >= 0 ? 'number-righr-green' : 'number-righr-red']">{{ item.financial_mom ? item.financial_mom + '%' : '--' }}
										</b>
										<b class="number-left">
											<img v-if="item.financial_mom >= 0" class="number-right-images rotateX" src="@/assets/header/up.png" alt="" />
											<img v-if="item.financial_mom<0 " class="number-right-images rotateX" src="@/assets/header/down.png" alt="" />
										</b>
									</b>
								</span>
								<!-- 地勘特殊逻辑 -->
								<span v-else-if="item.geological" class="yearOrmanth">
									<span class="name">{{ item.QOQName }} </span>
									<b class="maaber-cont">
										<b class="number-left">{{ item.QOQNameLeftValue }}</b>
										<b class="qfx" v-if="item.comannualValue">/</b>
										<b class="number-righr">{{ item.QOQNameValue || 0 }}
											<span class="line">%</span>
										</b>
									</b>
								</span>

								<span v-else class="proportion">
									<span class="name">{{ item.QOQName }}</span>
									<b class="maaber-cont" v-if="item?.yearClor">
										<b class="number-left">
											<img v-if="item.QOQNameValue >= 0" class="number-left-images rotateX" src="@/assets/HumanResourcesGroup/up.png" alt="" />
											<img v-if="item.QOQNameValue<0 " class="number-left-images rotateX" src="@/assets/header/yellowjt.png" alt="" />
										</b>
										<b :class="item.QOQNameValue >= 0? 'number-righr-red': 'number-right-yellow'
											" class="number-righr">{{ item.QOQNameValue >= 0 ? '+' : ''}}{{ item.QOQNameValue || 0 }}
											<span class="line">%</span>
										</b>
									</b>
									<b class="maaber-cont" v-else>
										<b class="number-left">
											<img v-if="item.QOQNameValue < 0" class="number-left-images" src="@/assets/HumanResourcesGroup/up.png" alt="" />
											<img v-if="item.QOQNameValue >= 0 && !item.QOQNameValueColor" class="number-left-images" src="@/assets/header/yellowjt.png" alt="" />
										</b>
										<b :class="item.QOQNameValue >= 0 && !item.QOQNameValueColor
												? 'number-right-yellow'
												: item.QOQNameValue >= 0 && item.QOQNameValueColor
													? 'number-righr-yellow'
													: 'number-righr-red'
											" class="number-righr">{{ item.QOQNameValue >= 0  ? '+' : ''}}{{ item.QOQNameValue || 0 }}
											<span class="line">%</span>
										</b>
									</b>
								</span>
							</div>

							<div class="imgBox-bottom hasSelect" v-if="item.name == '资源增储量'">
								<!-- <span>当前金属:</span> -->
								<el-select v-if="item.list && item.list.length>0" class="select" v-model="organizationKey" :disabled="currModel !== item" popper-class="departmentCardSelectStyle" :teleported="true" filterable placeholder="请选择金属" @change="chageValue">
									<el-option v-for="i in item.list" :key="i ? i.label : 0" :label="i ? i.label : ''" :value="i ? i.label : ''"></el-option>
								</el-select>
							</div>
						</div>
					</div>
				</swiper-slide>
				<div class="button-on" v-if="transitionIndex > 0" @click="addPage(-1)">
					<img src="@/assets/HumanResourcesGroup/iconright.png" alt="" />
				</div>
				<div class="button-next" v-if="transitionIndex < CardData.length - 5" @click="addPage(1)">
					<img src="@/assets/HumanResourcesGroup/iconright.png" alt="" />
				</div>
			</swiper>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { PropType, computed, reactive, ref, shallowRef, watch } from 'vue'

import 'swiper/css'
// 引入swiper样式（按需导入）
// import 'swiper/css/pagination' // 轮播图底面的小圆点
import 'swiper/css/navigation' // 轮播图两边的左右箭头
// import 'swiper/css/scrollbar'  // 轮播图的滚动条， 轮播图里一般不怎么会使用到滚动条，如果有用到的话import导入就行
// 引入swiper核心和所需模块
// ====

const props = defineProps({
	CardData: {
		type: Array as PropType<CardDataItem[]>,
		default: () => {
			return []
		},
		required: true,
	},
	currModel: {
		type: Object,
		default: () => {
			return {}
		},
		required: true,
	},
	bWidth: {
		type: String, // 传参类型
		default: () => {
			return '348*$base'
		}, // 传参默认值
	},
})
const currActive = shallowRef(0)
const totalPage = ref<number>(props.CardData.length)
const pageSize = ref<number>(5) // 每页显示数量
const page = ref<number>(1) // 当前页码
let useSwiper: any = null // swiper实例

const organizationKey = ref()

// =====
const navigation = ref({
	nextEl: '.button-next',
})
// 初始化swiper
const onSwiper = (swiper: any) => {
	useSwiper = swiper
}
// 滑动事件记录分页
const onSlideChange = () => {
	page.value = useSwiper.activeIndex / pageSize.value + 1
}
// 分页
const transitionIndex = ref(0)
const newData = computed(() => {
	if (props.CardData && Array.isArray(props.CardData)) {
		return props.CardData.length > 5
			? props.CardData.slice(transitionIndex.value, transitionIndex.value + 5)
			: props.CardData
	} else {
		return []
	}
})

const addPage = (num: number) => {
	if (num > 0) {
		transitionIndex.value++
		currentIndex.value--
		useSwiper.slideNext()
	} else if (num < 0) {
		useSwiper.slidePrev()
		transitionIndex.value--
		currentIndex.value++
	}
}
// end
// 在modules加入要使用的模块
const emits = defineEmits(['currModelChange', 'changeOperation'])

interface CardDataItem {
	sonTitle: string
	title: string
	des: string
	icon: string
	operName: string
	operValue: string
	comValue: string
	annual: string
	annualValue: string
	comannualValue: string
	QOQName: string
	QOQNameValue: number
	custom: boolean
	QOQNameValueColor: boolean
	selectOption: object
	group: boolean
	groupDate: string
	groupValue: string
	yearClor: false
	hiddenSymbol: boolean
	geological?: boolean
	QOQNameLeftValue?: string
	list?: Array<any>
}
const dataNav = reactive({
	model: '',
})
const chageValue = (value: string) => {
	if (value) {
		emits('changeOperation', value)
	}
}

const currentIndex = ref(0)

const instFun = (index: number, item: any) => {
	currentIndex.value = index
	emits('currModelChange', item)
}
const swiperOptions = reactive({
	speed: 400,
	// 第一张和最后一张贴合边缘
	centeredSlidesBounds: false,
})
function iniCard() {
	currentIndex.value = 0
}
function emptyCard() {}
defineExpose({
	iniCard,
	emptyCard,
})

// 地勘业务代码:默认储量与资源量当前金属为列表第一个
watch(
	() => props.CardData,
	(val) => {
		if (val) {
			const obj = val.find((i) => i.list)
			if (obj && obj.list && obj.list.length > 0) {
				!organizationKey.value && (organizationKey.value = obj.list[0]?.label)
				// emits('changeOperation', organizationKey.value)
			}
		}
	},
	{
		deep: true,
		immediate: true,
	},
)
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
.DepartmentItemCard {
	width: 100%;

	.SwiperBoxDepartmentCard {
		position: relative;
		width: 100%;
		box-sizing: border-box;
		cursor: pointer;
		display: flex;
		padding-top: 15 * $base;

		.bottom-color {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 10 * $base;

			.left,
			.right {
				display: inline-block;
				width: 5.57 * $base;
				height: 5.58 * $base;
				opacity: 0.34;
				background: #ffffff;
				border-radius: 0.22 * $base;
			}

			.border {
				height: 1 * $base;
				display: inline-block;
				border-bottom: 1 * $base solid rgba(255, 255, 255, 0.3);
				width: 100%;
				margin: 0 2.16 * $base;
			}
		}

		.init-transparent {
			font-family: 'Acens';
			font-size: 25 * $base;
			color: #ffffff;
			letter-spacing: 1.27 * $base;
			margin-bottom: 8 * $base;
			display: block;
		}

		.init-current {
			font-weight: 400;
			font-size: 16 * $base;
			color: #ffffff;
		}
		.financial-value {
			margin: 0 15 * $base 0 15 * $base;
			font-family: 'Acens';
			font-size: 25 * $base;
			color: #ffffff;
		}
		.financial-unit {
			color: #ffffff;
			font-size: 16 * $base;
		}

		.initimg {
			width: 153.69 * $base;
			height: 153.69 * $base;
			float: right;
		}

		.selectOptionBox {
			.selectOptionSpan {
				display: block;
				font-weight: 400;
				font-size: 19.89 * $base;
				color: #ffffff;
				padding-top: 30 * $base;
				padding-bottom: 17 * $base;
			}

			.select {
				padding-top: 10 * $base;
				width: 138 * $base;
				height: 36 * $base;
				box-shadow: 0 2 * $base 4 * $base 0 #7f89d752;
				border-radius: 2.21 * $base;
				border: none;

				::v-deep(.el-input__inner),
				::v-deep(.el-input__wrapper) {
					background: #e2e8ff;
					color: #6871e9;
					border: none;
				}
			}
		}

		.item {
			box-sizing: border-box;
			cursor: pointer;
			background: rgba(85, 101, 244, 0.72);
			border-radius: 12 * $base;
			height: 260 * $base;
			// width: 367 * $base !important;
			width: calc(20% - 10 * $base) !important;
			margin: 0 5 * $base;
			transform: scale(0.96);
			.mySwiperCard {
				padding: 20 * $base 18 * $base 0 * $base 18 * $base;
			}
			.isReserve {
				background: url('@/assets/HumanResourcesGroup/hp.png') center no-repeat;
				background-size: 140 * $base 140 * $base;
				background-position: 90% 110%;
			}

			.imagesName {
				width: 29.99 * $base;
				height: 32 * $base;
				margin-right: 14 * $base;
			}

			.explain-icon {
				cursor: pointer;
				width: 30.73 * $base;
				height: 30.73 * $base;
				margin-left: 13.75 * $base;
			}

			.topcol-1 {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 10 * $base;

				.Acens {
					font-family: 'Acens';
					display: flex;
					align-items: center;
					color: #ffffff;
					font-size: 24 * $base;
					line-height: 0;
					letter-spacing: 0.9 * $base;
					text-align: left;

					span {
						font-size: 24 * $base;
					}
				}

				.topcol-1-2 {
					opacity: 0.8;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					font-size: 18 * $base;
					color: #ffffff;
					text-align: right;
				}
			}

			.imgBox-bottom.hasSelect {
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				margin-top: 110 * $base;

				span {
					font-family: PingFangSC-Regular;
					display: inline-block;
					font-weight: 400;
					font-size: 18 * $base;
					color: #ffffff;
					margin-bottom: 10 * $base;
				}
			}

			.imgBox-bottom {
				.name {
					font-family: PingFangSC-Regular;
					display: inline-block;
					font-weight: 400;
					font-size: 20 * $base;
					color: #ffffff;
				}

				.line {
					opacity: 0.7;
					font-weight: 600;
					font-size: 20 * $base;
					// margin-top: 10 * $base;
					margin-left: 5 * $base;
				}

				.number-left {
					color: #ffffff;
					font-size: 25 * $base;
					font-family: DIN;
					font-weight: 700;
					line-height: 0;
					letter-spacing: 0;
					text-align: right;

					img {
						width: 18 * $base;
						height: 16 * $base;
					}
				}

				.qfx {
					margin: 0 5 * $base;
					font-size: 25 * $base;
				}

				.number-righr {
					font-size: 25 * $base;
					font-family: DIN;
					font-weight: 700;
					line-height: 0;
					letter-spacing: 0;
					text-align: right;
					display: flex;
					align-items: center;
				}

				.isRed {
					color: #ff6565;
				}

				.yearOrmanth {
					display: flex;
					justify-content: space-between;
					width: 100%;
					font-weight: 400;
					color: #ffffff;
					align-items: center;
					height: 54 * $base;
					margin-bottom: 6 * $base;
					font-family: PingFangSC-Regular;
				}

				.proportion {
					display: flex;
					justify-content: space-between;
					width: 100%;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: #ffffff;
					align-items: center;
					height: 54 * $base;
					// background: #ffffff1a;
					border-radius: 4 * $base;
				}

				.maaber-cont {
					display: flex;
					align-items: center;
				}

				.select {
					@include select_self_2_0_active;
				}
			}
		}

		.alone {
			width: 386 * $base !important;
		}

		.isItem {
			cursor: pointer;
			height: 268 * $base;
			border-radius: 13.38 * $base;
			background: rgba(85, 101, 244, 0.9411764706);
			box-shadow: 0 9 * $base 32 * $base 0 * $base #5565f4a8;
			width: calc(20% - 10 * $base) !important;
			// width: 380 * $base !important;
			transform: scale(0.99);

			.mySwiperCard {
				height: calc(260 * 100vh / 1080);
			}

			.isReserve {
				background: url('@/assets/HumanResourcesGroup/hp.png') center no-repeat;
				background-size: 150 * $base 150 * $base;
				background-position: 90% 70%;
			}

			.imagesName {
				width: 33.75 * $base;
				height: 36 * $base;
				margin-right: 15 * $base;
			}

			.topcol-1 {
				.Acens {
					font-family: 'Acens';
					display: flex;
					align-items: center;
					font-size: 26 * $base;

					span {
						font-size: 26 * $base;
					}
				}

				.topcol-1-2 {
					opacity: 0.8;
					// font-family: PingFangSC-Regular;
					font-weight: 400;
					font-size: 19 * $base;
					color: #ffffff;
					text-align: right;
					display: inline-block;
				}
			}

			.imgBox-bottom {
				.name {
					// font-family: PingFangSC-Regular;
					display: inline-block;
					font-weight: 400;
					font-size: 20 * $base;
					color: #ffffff;
					width: 112 * $base;
				}

				.number-left {
					font-size: 25 * $base;
					font-family: DIN;
					font-weight: 700;
					letter-spacing: 0;
					text-align: left;
				}

				.qfx {
					margin: 0 5 * $base;
					font-size: 25 * $base;
				}

				.number-righr {
					font-family: DIN-Bold;
					font-size: 25 * $base;
				}

				.yearOrmanth {
					display: flex;
					justify-content: space-between;
					width: 100%;
					font-weight: 400;
					color: #ffffff;
					align-items: center;
					height: 54 * $base;
					margin-bottom: 6 * $base;
				}

				.proportion {
					display: flex;
					justify-content: space-between;
					width: 100%;
					font-weight: 400;
					color: #ffffff;
					align-items: center;
					height: 60 * $base;
					border-radius: 4 * $base;
				}
			}
		}

		.number-right-red {
			color: rgba(255, 115, 115, 1) !important;
		}

		.number-righr-red {
			color: rgba(255, 115, 115, 1) !important;
		}
		.number-righr-yellow {
			color: #fff776 !important;
		}

		.number-righr-green {
			color: rgba(82, 225, 160, 1) !important;
		}

		.number-right-yellow {
			color: #faff75;
		}

		// .yearOrmanth:hover,
		// .proportion:hover {
		//     background: #ffffff1a;
		//     border-radius: 4*$base;
		// }

		.number-left-images {
			width: 18 * $base;
			height: 16 * $base;
			margin-right: 15 * $base;
			fill: #faff75;
		}

		.number-right-images {
			width: 18 * $base;
			height: 16 * $base;
			fill: #faff75;
			margin: 0 0 0 15 * $base;
		}
		.rotateX {
			transform: rotateX(180deg);
		}
	}
}
</style>
<style scoped lang="scss">
.project {
	width: 100%;

	&-swiper {
		position: relative;
		width: 100%;

		.swiper {
			width: 100%;
			margin-left: inherit;
			margin-right: inherit;
			position: relative;
			// list-style: none;
			overflow: visible !important;
			padding: 0;
			z-index: 1;
			display: block;

			swiper-slide {
				height: 100%;
				box-shadow: 0 3 * $base 6 * $base 1 * $base rgba(0, 0, 0, 0.16);
				border-radius: 4 * $base;
				border: 1 * $base solid #e4e5ea;
				background: #f9fafe;
			}
		}

		::v-deep .swiper-wrapper {
			display: flex;
			align-items: center;
		}

		.button-prev {
			position: absolute;
			top: 117 * $base;
			left: 0 * $base;
		}

		.button-next {
			position: absolute;
			top: 120 * $base;
			right: -10 * $base;
			z-index: 111;
			width: 40 * $base;
			height: 40 * $base;
			background: #0b0d3285;
			border: 1.6 * $base solid #ffffff47;
			box-shadow: 0 5 * $base 8 * $base 2 * $base #646fc266;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 50%;

			img {
				height: 17 * $base;
				width: 12 * $base;
			}
		}

		.button-on {
			position: absolute;
			top: 120 * $base;
			// left: 10*$base;
			left: -10 * $base;
			z-index: 111;
			width: 40 * $base;
			height: 40 * $base;
			background: #0b0d3285;
			border: 1.6 * $base solid #ffffff47;
			box-shadow: 0 5 * $base 8 * $base 2 * $base #646fc266;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 50%;

			img {
				height: 17 * $base;
				width: 12 * $base;
				transform: rotate(180deg);
			}
		}
	}
}

.swiper-content {
	text-align: center;
	height: 94 * $base;
	margin: 40 * $base 0;
	border-right: 1 * $base solid #e4e5ea;

	&-text {
		margin: 11 * $base auto 0;
		width: 127 * $base;
		height: 25 * $base;
		font-size: 16 * $base;
		//font-family: Microsoft YaHei-Regular, Microsoft YaHei;
		font-weight: 400;
		color: #2f353b;
		line-height: 25 * $base;
		-webkit-background-clip: text;
		//-webkit-text-fill-color: transparent;
	}
}

.write {
	width: 4 * $base;
	background-color: #ffffff;
	height: 176 * $base;
	position: absolute;
	top: 0;
	right: 0;
	z-index: 99;
}

.group-top {
	font-family: HelloFont-WenYiHei;
	font-weight: 600;
	font-size: 20 * $base;
	color: #ffffff;
	letter-spacing: 0.69 * $base;
	text-shadow: 0 2 * $base 0 #6673d6cc;
	text-align: right;
}

.group-main {
	height: 150 * $base;
	width: 100%;
	display: flex;
	flex-direction: row;

	.left-main {
		width: 55%;
		height: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: space-around;
	}

	.right-main {
		width: 45%;
		height: 100%;
	}

	.title {
		color: #ffffff;
		font-family: HelloFont;
		font-weight: WenYiHei;
		font-size: 24 * $base;
		letter-spacing: 1.4 * $base;
		position: relative;

		.explain-icon {
			cursor: pointer;
			position: absolute;
			width: 24 * $base;
			height: 24 * $base;
			top: 50%;
			transform: translate(0, -50%);
		}
	}

	.count {
		font-family: DIN-Bold;
		font-weight: 700;
		font-size: 50 * $base;
		color: #ffffff;
		text-align: left;
		position: relative;
	}

	.unit {
		position: absolute;
		opacity: 0.7;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		font-size: 20 * $base;
		color: #ffffff;
		right: -25%;
		top: 30%;
	}
}

.group-buttom {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
}

.year-area {
	width: 40 * $base;
	height: 40 * $base;
	background: #ffffff5c;
	box-shadow: 0 2 * $base 0 0 #6673d6cc, inset 0 1 * $base 5 * $base 0 #ffffffbd;
	border-radius: 3.25 * $base;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: 500;
	font-size: 24 * $base;
	color: #4a55ac;
	letter-spacing: 1.08 * $base;
}

.date-area {
	opacity: 0.9;
	font-family: PingFangSC-Medium;
	font-weight: 500;
	font-size: 20 * $base;
	color: #ffffff;
	letter-spacing: 0.89 * $base;
}
</style>

<style lang="scss">
@import '@/styles/mixin.scss';
.el-popper.is-light.departmentCardSelectStyle {
	@include select_option;
	width: 169 * $base;
}
</style>
