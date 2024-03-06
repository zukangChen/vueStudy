<template>
    <div class="container">
        <div class="cardData1"  v-if="!data.type">
            <div class="title">
                <div class="title-title">{{data.title}}</div><Tip :tip="data.tip"></Tip></div>
            <div class="card-unit" v-if="data.unit">{{data.unit}}</div>
            <div class="des" style="color:#fff" v-if="data.desc">{{data.desc}}</div>
            <div  class="des" v-else-if="data.value1 != undefined">
                <span class="total" v-if="data.value1 != undefined">{{data.value1}}人</span>
                <span class="tongqi" v-if="data.value2  != undefined" :class="{success:data.value2>0,error:data.value2<0}">
                    <i class="up" v-if="data.value2 > 0"></i>
                    <i class="down" v-if="data.value2 < 0"></i>
                {{data.value2}}人</span>
            </div>
            <img class="img" v-if="data.icon" :src="data.icon">
            <el-select class="select" v-if="data.select" v-model="cardSelectModel" @change="selectChange" :disabled="currCard !== data" popper-class="cards-select" :teleported="true">
                <el-option  v-for="item in data.select" :key="item.label" :label="item.label" :value="item.value||item.label"></el-option>
            </el-select>
        </div>
        <div class="cardData2"  v-if="data.type == 2">
            <div class="card-top" >
                <div class="card-top-left">
                    <img v-if="data.icon" :src="data.icon"/>
                    <div class="title"><div class="title-title">{{data.title}}</div><Tip :tip="data.tip"></Tip></div>
                </div>
                <div class="card-top-right">{{data.titleUnit}}</div>
            </div>
            <div class="card-split" ></div>
            <div class="card-bottom">
                <div class="card-bottom-list" v-for="(item,index) in data.list" :key="index">
                    <div class="card-bottom-name">{{item.name}}</div>
                    <div class="card-bottom-value">
                    <template v-if="item.split">
                        <span >{{Number(item.value1).toFixed(1)}}</span>
                        <span style="padding:0 2px;">{{item.split}}</span>
                        <i class="up" v-if="item.value2<0"></i>
                        <i class="down" v-if="item.value2>0"></i>
                        <span :class="{'error':item.value2>0,'success':item.value2<0}">{{Math.abs(Number(item.value2)).toFixed(1)}}</span>
                    </template>
                    <span v-else :class="{'error':item.value>0,'success':item.value < 0}">{{item.value.toFixed(1)}}</span>
                    <span class="unit">{{item.unit}}</span></div>
                </div>
            </div>
        </div>
        <div class="cardData3"  v-if="data.type == 3">
            <div class="card-top">
                <div class="card-top-left">
                    <div class="title"><div class="title-title">{{data.title}}</div><Tip :tip="data.tip"></Tip></div>
                    <div class="subTitle" v-if="data.subTitle">{{data.subTitle}}</div>
                    <img class="prevImg" v-if="data.prevImg" :src="data.prevImg"/>
                </div>
                <img class="image" v-if="data.image" :src="data.image"/>
            </div>
        </div>
        <div class="cardData2"  v-if="data.type == 4">
            <div class="card-top" >
                <div class="card-top-left">
                    <img v-if="data.icon" :src="data.icon"/>
                    <div class="title"><div class="title-title">{{data.title}}</div><Tip :tip="data.tip"></Tip></div>
                </div>
                <div class="card-top-right">{{data.titleUnit}}</div>
            </div>
            <div class="card-split"></div>
            <div class="card-bottom">
                <div class="card-bottom-list" v-for="(item,index) in data.list" :key="index">
                    <div class="card-bottom-name">{{item.name}}</div>
                    <div class="card-bottom-value">
                    <template v-if="item.split">
                        <span :class="{'error':item.value1> 0&&item.name == '总资产'}">{{item.value1 == 0?"-":item.value1.toFixed(2)}}</span>
                        <span class="unit" v-if="item.unit">{{item.unit}}</span>
                        <span style="padding:0 5px;" v-if="item.value1 != 0">{{item.split}}</span>
                        <span :class="{'error':item.value2>0&&item.name == '总资产'}">{{item.value2 == 0?"-":item.value2.toFixed(2)}}</span>
                    </template>
                    <template v-else>
                        <i class="up" v-if="item.value<0&&item.name=='负债率'"></i>
                        <span  :class="{'error':item.value<0&&item.name=='负债率'}">{{item.value == 0?"-":item.name=='负债率'?Math.abs(item.value.toFixed(2)):item.value.toFixed(2)}}</span>
                    </template>
                    <span class="unit" v-if="item.unit">{{item.unit}}</span></div>
                </div>
            </div>
        </div>
        <div class="cardData5"  v-if="data.type == 5">
            <div class="card-left">
                <div class="title"><div class="title-title">{{data.title}}</div><Tip :tip="data.tip"></Tip></div>
                <div class="desc">{{data.desc}}</div>
            </div>
            <img class="image" :src="data.icon">
        </div>
    </div>
    
</template>
<script setup lang="ts">
    import {PropType,watch,onMounted} from "vue"
    import {CardData} from "."
    import {shallowRef } from "vue";
    import Tip from "./Tip.vue"
    const emit = defineEmits(['changeSelect'])
    const props = defineProps({
        data: {
            type:Object as PropType<CardData>,
            default: ()=> {
                return {}
            },
            required: true
        },
        currCard:{
            type: Object as PropType<CardData|null>,
            default: () => null,
        },
        modelValue:{
            type:String
        }
    })
    const cardSelectModel = shallowRef(props.data.select?props.data.select[0].value || props.data.select[0].label:"")
    watch(() => props.data.select, () => {
        cardSelectModel.value = props.data.select[0].label;
        emit('changeSelect', {
            id:props.data.id,
            value: cardSelectModel.value
        });
    })
   
    const selectChange = () => {
        emit('changeSelect', {
            id:props.currCard!.id,
            value: cardSelectModel.value
        });
    }

</script>
<style lang="scss" scoped>
    .container{
        width:100%;
        height: 100%;
        ::v-deep(.help){
            margin-top:7*$bs;
        }
        .cardData1{
            width:100%;
            height:100%;
            .title{
                height: 45*$base;
                font-family: HelloFont;
                font-weight: WenYiHei;
                font-size: 34*$base;
                color: #FFFFFF;
                letter-spacing: 1.4*$base;
                position:relative;
                display: flex;
                align-items: center;
                padding-bottom: 5*$base;
            }
            .img{
                position:absolute;
                top:45*$bs;
                right:14*$bs;
                width: 120*$bs;
                height: 120*$bs;
                padding-right:0*$bs;
            }
            .des{
                height: 30*$base;
                font-family: DIN-Bold;
                // font-size: 20*$bs;
                font-size: 20*$bs;
                
                color: #fff;
                padding-top:14*$bs;
                .tongqi{
                    padding-left:10*$bs;
                    &.success{
                        color:#47D192;
                    }
                    &.error{
                        color:#ff7373;
                    }
                }
                .total{
                    min-width:80*$bs;
                    display:inline-block;
                }
            }
            .card-unit{
                position:absolute;
                right:15*$bs;
                top:20*$bs;
                color:#fff;
            }
            .subDes{
                width: 79.95*$bs;
                height: 28*$base;
                opacity: 0.8;
                font-family: PingFangSC-Regular;
                font-weight: 400;
                font-size: 18*$bs;
                color: #FFFFFF;
                padding-top:26*$bs;
            }
            .select{
                padding-top:26*$bs;
                width: 200*$bs;
                height: 16*$base;
                box-shadow: 0 2*$bs 4*$bs 0 #7f89d752;
                border-radius: 2.21*$bs;
                border:none;
                outline: none;
                ::v-deep(.el-input__wrapper){
                    height: 35*$bs!important;
                    outline: none;
                }
                ::v-deep(.el-input__inner){
                    height: 30*$bs!important;
                }
                ::v-deep(.el-input__inner),::v-deep(.el-input__wrapper){
                    background: #E2E8FF;
                    color:#6871E9;
                    border:none;
                    font-size:14*$bs;
                }
            }
            .up{
                width: 20 * $bs;
                height: 20 * $bs;
                background: url('@/assets/Manpower/1.png') no-repeat;
                background-size: 100% 100%;
                display: inline-block;
                vertical-align: middle;
                padding-right:10*$bs;
            }
            .down{
                width: 20 * $bs;
                height: 20 * $bs;
                background: url('@/assets/Manpower/2.png') no-repeat;
                background-size: 100% 100%;
                display: inline-block;
                vertical-align: middle;
                padding-right:10*$bs;
            }
            .bottom{
                display: flex;
                align-items: center;
                flex-direction: column;
                height: 120*$bs;
                justify-content: space-around;
                .bottom-list{
                    display: flex;
                    justify-content: space-between;
                    height: 52*$base;
                    align-items: center;
                    position: relative;
                    padding-right: 24*$bs;
                    width:calc(100% - 24*$bs);
                    .bottom-name{
                        height: 28*$base;
                        font-family: PingFangSC-Regular;
                        font-weight: 400;
                        font-size: 20*$bs;
                        color: #FFFFFF;
                    }
                    .bottom-value{
                        color: #ffffff;
                        font-size: 24*$bs;
                        font-weight: 700;
                        line-height: 0;
                        letter-spacing: 0;
                        text-align: right;
                        .error{
                            color:#ff7373
                        }
                        .success{
                            color:#52E1A0;
                        }
                        .unit{
                            height: 32*$base;
                            opacity: 0.7;
                            font-family: PingFangSC-SNaNpxibold;
                            font-weight: 600;
                            font-size: 18*$bs;
                            padding-left:5*$bs;
                            color: #FFFFFF;
                            text-align: right;
                        }
                        .up,.down{
                            width: 20 * $bs;
                            height: 20 * $bs;
                            background: url('@/assets/CarbonManagement/down.png') no-repeat;
                            background-size: 100% 100%;
                            display: inline-block;
                            vertical-align: middle;
                            margin-right:5*$bs;
                            transform:rotateX(180deg);
                        }
                        .down{
                            background: url('@/assets/CarbonManagement/up.png') no-repeat;
                            background-size: 100% 100%;
                        }
                    }
                }
            }


            
            
        }
        .cardData2{
            position:relative;
            cursor:pointer;
            .card-split{
                display: flex;
                align-items: center;
                justify-items: center;
                width: calc(100% - 20*$bs);
                height: 1*$base;
                background-color:rgba(255,255,255,0.34);
                position: inherit;
                margin:8*$bs auto;
                &::before{
                    position: absolute;
                    left:-10*$bs;
                    content:"";
                    width: 5.57*$bs;
                    height: 5.58*$base;
                    opacity: 0.34;
                    background: #FFFFFF;
                    border-radius: 0.22*$bs;
                }
                &::after{
                    position: absolute;
                    right:-10*$bs;
                    content:"";
                    width: 5.57*$bs;
                    height: 5.58*$bs;
                    opacity: 0.34;
                    background: #FFFFFF;
                    border-radius: 0.22*$bs;
                }
            }
            .card-top{
                display: flex;
                align-items: baseline;
                justify-content: space-between;
                color:#fff;
                .card-top-left{
                    display: flex;
                    align-items: center;
                    img{
                        width: 25.5*$bs;
                        height: 27*$bs;
                    }
                    
                    .title{
                        padding-left:20*$bs;
                        font-family: HelloFont;
                        font-weight: WenYiHei;
                        font-size: 24*$bs;
                        letter-spacing: 1.4*$bs;
                        display: flex;

                    }
                    .subTitle{
                        padding-left:20*$bs;
                        font-family: HelloFont;
                        font-weight: WenYiHei;
                        font-size: 24*$bs;
                        letter-spacing: 1.4*$bs;
                    }
                }
                .image{
                    width: 140*$bs;
                    height: 140*$bs;
                }
                .card-top-right{
                    color:rgba(255,255,255,0.8);
                    font-size: 18*$bs;
                }
            }
            .card-bottom{
                display: flex;
                align-items: center;
                flex-direction: column;
                height: 145*$bs;
                justify-content: space-around;
                .card-bottom-list{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width:100%;
                    .card-bottom-name{
                       
                        height: 28*$base;
                        font-family: PingFangSC-Regular;
                        font-weight: 400;
                        font-size:20*$bs;
                        color: #FFFFFF;
                    }
                    .card-bottom-value{
                        color: #ffffff;
                        font-size: 24*$bs;
                        font-weight: 700;
                        line-height: 0;
                        letter-spacing: 0;
                        text-align: right;
                        .error{
                            color:#ff7373
                        }
                        .success{
                            color:#FFF927;
                        }
                        .unit{
                            height: 32*$base;
                            opacity: 0.7;
                            font-family: PingFangSC-SNaNpxibold;
                            font-weight: 600;
                            font-size: 18*$bs;
                            padding-left:2*$bs;
                            color: #FFFFFF;
                            text-align: right;
                        }
                    }
                    .up,.down{
                        width: 20 * $bs;
                        height: 20 * $bs;
                        background: url('@/assets/CarbonManagement/up.png') no-repeat;
                        background-size: 100% 100%;
                        display: inline-block;
                        vertical-align: middle;
                        margin-right:5*$bs;
                        transform:rotateX(180deg);
                    }
                    .down{
                        background: url('@/assets/CarbonManagement/down.png') no-repeat;
                        background-size: 100% 100%;
                    }

                }
            }
        }
        .cardData3{
            display: flex;
            color:#fff;
            height:200*$bs;
            box-sizing: border-box;
            width:100%;
            .card-top-left{
                padding-top:0*$bs;
                width:100%;
                height:100%;
                
                .title{
                    width: 250*$bs!important;
                    padding-left:24*$bs;
                    font-family: HelloFont;
                    font-weight: WenYiHei;
                    font-size: 24*$bs;
                    // white-space:pre;
                    z-index:1;
                    position: relative;
                    display: flex;
                    flex-wrap: wrap;
                    .title-title{
                        width: 225*$bs!important;
                    }
                }
                .subTitle{
                    padding-left:20*$bs;
                    font-size: 22*$bs;
                    width:180*$bs;
                    z-index:1;
                }
                .prevImg{
                    width:100%;
                    height:100%;
                    position:absolute;
                    top:0*$bs;
                    left:0;
                    z-index:0;
                }
            }
            .image{
                width: 120*$bs;
                height: 120*$bs;
                position:absolute;
                right:20*$bs;
                bottom:30*$bs;
            }
        }
        .cardData5{
            width: 100%;
            display: flex;
            cursor:pointer;
            .card-left{
                padding:10*$bs 0 0 10*$bs;
                font-family: HelloFont-WenYiHei;
                font-weight: WenYiHei;
                font-size: 36*$bs;
                color: #FFFFFF;
                letter-spacing: 1.4*$bs;
                .title{
                    display: flex;
                    align-items: center;
                    
                }
                .desc{
                    font-family: PingFangSC-Regular;
                    font-weight: 400;
                    font-size: 22*$bs;
                    color: #FFFFFF;
                    padding-top:15*$bs;
                }
            }
            .image{
                position:absolute;
                right:20*$bs;
                top:34*$bs;
                width: 148*$bs;
                height: 148*$bs;
            }
        }
    }
</style>