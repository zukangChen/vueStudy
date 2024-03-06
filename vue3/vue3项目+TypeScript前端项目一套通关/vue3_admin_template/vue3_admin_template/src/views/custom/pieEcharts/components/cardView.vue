<template>
	<div class="CardView">
		<div class="col-3">
			<div class="top">
				<div class="ranking">
					<div class="carHeaderBox" v-if="carHeader">
						<slot name="HeadOptions"></slot>
						<div class="carHeader">
							<div class="col-3-title">{{ props.CardData.title }}
								<el-tooltip class="box-item" effect="dark" :content="props.CardData.descriptionCon" v-if="props.CardData.descriptionCon" raw-content placement="top-start">
									<img v-if="props.CardData.descriptionCon" src="@/assets/HumanResourcesGroup/cardTitle.png" alt="">
								</el-tooltip>
								<Tip v-if="CardData.tip" :tip="CardData.tip"></Tip>
								<el-tooltip class="box-item" effect="dark" content="刷新" v-if="props.CardData.refresh" placement="top-start">
									<el-icon v-if="props.CardData.refresh" @click="refresh">
										<RefreshLeft />
									</el-icon>
								</el-tooltip>
								<!-- 集团卡片弹窗图标 -->
								<slot name="dialogIcon"></slot>
							</div>
							<div class="btn-box">
								<slot name="headerRight"></slot>
							</div>

						</div>
						<div class="bottom-color" v-if="divider">
							<span class="left"></span>
							<span class="border"></span>
							<span class="right"></span>
						</div>
					</div>
					<div id="bottomRight">
						<slot name="main"></slot>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Tip from '@/components/Cards/Tip.vue'
import { fontSizeWidth } from '@/utils/rem'
import { onMounted } from 'vue'
const props = defineProps({
	CardData: {
		type: Object,
		default: {
			title: '',
		},
	},
	divider: {
		type: Boolean,
		require: false,
		default: true,
	},
	carHeader: {
		type: Boolean,
		require: false,
		default: true,
	},
})

const emits = defineEmits(['refreshBox'])

const refresh = () => {
	emits('refreshBox')
}

onMounted(() => {})
</script>
<style lang="scss" scoped>
.CardView {
	width: 100%;
	height: 100%;
	.col-3 {
		width: 100%;
		height: 100%;
	}
	.top {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		.ranking {
			width: 100%;
			height: 100%;
			background: #ffffffc2;
			border-radius: 6 * $base;
			margin-bottom: 24 * $base;
			overflow: hidden;
			position: relative;
			.carHeaderBox {
				width: 100%;
				position: relative;
			}
			.carHeader {
				display: flex;
				justify-content: space-between;
				align-items: center;
				img {
					width: 28 * $base;
					height: 28 * $base;
					margin-left: 10 * $base;
					cursor: pointer;
				}
			}

			.col-3-title {
				font-family: 'Acens';
				font-size: 24 * $base;
				color: #0b0f5a;
				text-shadow: 0 2 * $base 8 * $base #0b0f5a29;
				margin: 17 * $base 0 17 * $base 27 * $base;
				display: flex;
				align-items: center;
				// width: 250*$base;
				// text-overflow: ellipsis;
				// overflow: hidden;

				.help {
					width: 26 * $base;
					height: 26 * $base;
					border-radius: 50%;
					border: 1 * $base solid #b5b4fe;
					box-sizing: border-box;
					background-color: #e4e7ff;
					color: #564eb0;
					margin-left: 8 * $base;
				}

				.el-icon {
					margin-left: 10 * $base;
					&:hover {
						cursor: pointer;
						transform: scale(1.1);
					}
				}
			}

			.btn-box {
				margin: 23 * $base 17 * $base 10 * $base 0;
				font-weight: 400;
				font-size: 16 * $base;
				color: #5b6276;
			}

			.bottom-color {
				display: flex;
				width: calc(100% - 45 * $base);
				justify-content: space-between;
				align-items: center;
				position: absolute;
				left: 30 * $base;
				bottom: 0 * $base;

				.left,
				.right {
					display: inline-block;
					width: 5 * $base;
					height: 5 * $base;
					opacity: 0.34;
					background: #5b6276;
					border-radius: 0.2 * $base;
				}

				.border {
					height: 1 * $base;
					display: inline-block;
					border-bottom: 1 * $base solid rgb(91, 98, 118, 0.34);
					width: 100%;
					margin: 0 3 * $base;
				}
			}
		}
	}
}
</style>

