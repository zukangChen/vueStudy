<template>
    <div class="cards">
        <div class="cards-top">
            <swiper
                :slides-per-view="perview"
                :space-between="0"
                :disable="true"
                :swiperOptions="swiperOptions"
                @swiper="onSwiper"
            >
                <swiper-slide class="card" v-for="(data,key) in cardData" :class="{'active':currCard === data}" :key="key" @click="selectCard(data,key)">
                    <div class="cardContainer">
                        <slot v-if="data.show =='template'" name="card"  :data="data"></slot>
                        <Card v-else :data="data" :perview="perview" :currCard="currCard"  @changeSelect="changeSelect"></Card>
                        <div class="shadow"></div>
                    </div>
                </swiper-slide>
            </swiper>
            <div class="swiper-button-prev" v-if="currActive>=perview-1&&cardData.length > perview" @click="nextPage(-perview)"><img src="@/assets/HumanResourcesGroup/iconright.png" class="nextPage" alt="" /></div><!--左箭头。如果放置在swiper外面，需要自定义样式。-->
            <div class="swiper-button-next" v-if="currActive<perview - 1 &&cardData.length > perview" @click="nextPage(perview)"><img src="@/assets/HumanResourcesGroup/iconright.png" class="nextPage" alt="" /></div><!--右箭头。如果放置在swiper外面，需要自定义样式。-->
        </div>
        <div class="cards-bottom" v-loading="!currCard">
            <keep-alive :include="keepAlive" :exclude="exclude">
                <component v-if="currCard&&!loading"  :key="currCard.id" :is="currCard.model" :data="currCard" :selectModel="selectModel[currCard.id]"></component>
            </keep-alive>
        </div>
    </div>
</template>
  
<script setup lang="ts">
    import {PropType,provide,onMounted,computed} from "vue"
    import { useRoute } from 'vue-router';
    import { Swiper, SwiperSlide} from 'swiper/vue';
    import { api_remark_info_nf } from '@/api/system'
    import 'swiper/css';
    import {CardData,Nullable} from "."
    import { reactive, shallowRef,nextTick} from 'vue'
    import Card from "./Card.vue"
    const currentRoute = useRoute(),pageCardTitle = currentRoute.query.card;
    const props = defineProps({
        data: {
            type: Array as PropType<CardData[]>,
            required: true
        },
        perview:{
            type: Number,
            default: () => 5
        },
        loading:{
            type: Boolean,
            default: () => false
        },
        tips:{
            type: Array as PropType<number[]>,
            default: () => []
        }
    })
    const keepAlive = computed(() => {
        const alive:string[] = [];
        props.data.forEach(a => {
            if(a.keepAlive){
                alive.push(a.model.__name);
            }
        })
        return alive.join(",");
    })
    const exclude  = computed(() => {
        const alive:string[] = [];
        props.data.forEach(a => {
            if(!a.keepAlive){
                alive.push(a.model.__name);
            }
        })
        return alive.join(",");
    })
    const selectModel = reactive({}),cardData = reactive(props.data),currCard = shallowRef<Nullable<CardData>>(null);
    const currActive = shallowRef(0);
    const swiperOptions:any = reactive({
        centeredSlides: true,// 居中的slide是否标记为active，默认是最左active,这样样式即可生效
        slideToClickedSlide: true,// 点击的slide会居中
        allowSlidePrev: false,
        allowSlideNext: false,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        centeredSlidesBounds: false,
    })
    let mySwiper:any = null;
    const selectCard = (data:any,key:number) => {
        if(props.loading||!currCard.value)return;
        const perview = props.perview;
        currCard.value = null;
        nextTick(() => {
            currCard.value = data;
            if((key+1) % (perview - 1) === 0){
                mySwiper.slideTo(key+2-perview );
                currActive.value = key+2 - perview;
            }else if(key > perview||key == perview - 1&&perview < props.data.length){
                mySwiper.slideTo(key);
                currActive.value = key;
            }
        })
        
    }
    const nextPage = (index:number) => {
        currActive.value = index;
        mySwiper.slideTo(index);
    }
    const initMarks = async () => {
        if(props.tips){
            const tips = (await api_remark_info_nf({
                params: {
                    dp_type_id:String(props.tips[0]),
                    plate_id:String(props.tips[1]),
                    tab_id:String(props.tips[2]),
                }
            })).data.content;
            if(tips){
                cardData.forEach((a,index) => {
                    cardData[index].tip =  tips.find((b:any)=>b.target_id == a.id)!.remark_info
                    cardData[index].tips =  tips;
                })
            }
        }
        if(pageCardTitle){
            currCard.value =  cardData.find(a => a.title == pageCardTitle);
        }else{
            currCard.value = cardData.find(a => a.active) || cardData[0];
        }
    }
    const onSwiper = (swiper:any) => {
        mySwiper = swiper;
        mySwiper.detachEvents();
        mySwiper.slideTo(currActive.value);
    };
    const changeSelect = (data:any) => {
        selectModel[data.id] = data.value;
    }
    provide("cardData",cardData)
    onMounted(() => {
        initMarks();
        cardData.forEach(card => {
            if(card.select){
                selectModel[card.id] = card.select[0].value || card.select[0].label;
            }
        })
    })
</script>
<style lang="scss" scoped>
.cards {
    ::v-deep(.swiper){
        margin-left:unset;
    }
    .cards-top{
        display:flex;
        justify-content: space-around;
        padding:0 10*$bs 0;
        position:relative;
        user-select:none;
        margin-left:0*$bs;
        .card{
            z-index:1;
            width:calc(1850 / v-bind( 'perview') * $bs)!important;
            height: 260 * $bs;
            display: flex;
            align-items: center;
            position:relative;
            cursor:pointer;
            transform: scale(0.95);
            
            margin:auto;
            @keyframes select {
                from {
                    transform: scale(0.95)
                }
        
                to {
                    transform: scale(1)
                }
            }
            &.active {
                ::v-deep(.shadow) {
                    position: absolute;
                    left: 0;
                    right: 0;
                    top:0;
                    bottom:0;
                    margin: auto;
                    pointer-events:none;
                    width:100%!important;
                    height: 260*$base;
                    background: transparent;
                    box-shadow: 0*$bs 2*$bs 15*$bs 2*$bs rgba(85, 101, 244, 0.2),0*$bs 6*$bs 5*$bs 3*$bs rgba(85, 101, 244, 0.6);
                    z-index: 0;
                    border-radius: 13.26*$bs;
                    animation: select 0.2s ease-in-out forwards;
                }
                ::v-deep(.cardContainer){
                    background: rgba(85, 101, 244, 0.9411764706);
			       
                }
                animation: select 0.2s ease-in-out forwards;
            }
            .cardContainer{
                width:calc(100% - 24*$bs);
                height:calc(100% - 39*$bs) ;
                padding: 20 * $base 18 * $base 0 * $base 18 * $base;
                border-radius: 13.26*$bs;
                background:#8997FF;
                position: relative;
            }
        }
        .swiper-button-prev, .swiper-button-next{
            width: 40*$bs;
            height: 40*$bs;
            background: #0b0d3285;
            border: 1*$bs solid #ffffff47;
            box-shadow: 0 5*$bs 8*$bs 2*$bs #646fc266;
            position:absolute;
            z-index: 999;
            border-radius: 50%;
            bottom: 0;
            display:flex;
            align-items:center;
            justify-content:center;
            top: 120*$bs;
            z-index: 999;
            left: 3*$bs;
            cursor:pointer;
            transform: rotate(180deg);
            transform-origin: center;
            &::after{
                content:"";
            }
            &:active{
                opacity:0.6;
            }
            img{
                width:20*$bs;
                height:20*$bs;

            }
        }
        .swiper-button-next{
            right:3*$bs;
            left:unset;
            transform: rotate(0);
            transform-origin: center;
        }
        .swiper{
            padding: 0 8*$bs 0 8*$bs;
        }
    }
    .cards-bottom{
        display:flex;
        justify-content: space-between;
        margin:12*$base 20*$base  20*$base; 
        min-height:655*$base;
        ::v-deep  .ranking{
            margin-bottom: 0;
        }
        ::v-deep(.el-table .cell){
            line-height: 23*$bs;
            padding: 0 12px;
        }
    }
}
</style>