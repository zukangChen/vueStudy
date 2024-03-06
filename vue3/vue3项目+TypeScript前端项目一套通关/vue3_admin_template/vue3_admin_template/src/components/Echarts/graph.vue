<template>
    <div class="comm-chart" ref="chart"></div>
</template>
<script setup lang="ts">
    import {shallowRef,onMounted,watch,onUnmounted} from 'vue';
    import * as echarts from "echarts"
    import {fontSize,fontSizeWidth} from "@/utils/rem"
     import noData from "@/assets/header/noData.png"
    import {color,fontColor} from "./params"
    const chart = shallowRef(null);
    let myChart:any = null;
    const props = defineProps({
        data:{
            type:Object
        }
    })
    let opts:any = {
        color:color("linear"),
        fontColor:fontColor,
        data:[],
        ...props.data,
    };
    watch(props.data!,(_o,n:any) => {
        opts = {
            ...opts,
            ...n
        }
        init();
    })
    onMounted(() => {
        init();
    })
    let isStop = false;
    onUnmounted(() => {
        isStop = true;
        if(myChart){
           myChart.dispose();
        }
    })
    const init = () => {
       if (!opts.data.length&&!myChart){
            chart.value.innerHTML = `<div class="noData"><img src="${noData}"><span class="noDataText">暂无数据</span></div>`
            return
        } 
        if (myChart) {
            myChart.clear();
        }else{
            chart.value.innerHTML = "";
            myChart = echarts.init(chart.value)
            window.addEventListener('resize', () => {
                myChart.resize()
            },false)
        }
        if(opts.type === 2){
            // initChat2();
        }else if(opts.type === 3){
            // initChat3();
        }else if(opts.type === 4){
            // initChat4();
        }else{
            initChat();
        }
    }
    const initChat = () => {
        const options = opts.options || {
            color:opts.color,
            grid: [{ left: '0%', top: '0%', width: '99.5%', height: '99.5%' }],
            xAxis: [{axisTick:{show:false}, axisLine:{lineStyle:{color:"rgba(128, 128, 128, 0.2)"}},show:true, gridIndex: 0, min: -10, max: 20,axisLabel:{show:false} }],
            yAxis: [{ axisTick:{show:false},axisLine:{lineStyle:{color:"rgba(128, 128, 128, 0.2)"}},gridIndex: 0, min: -10, max: 15 ,axisLabel:{show:false}}],
            tooltip: {
                trigger: 'item',
                backgroundColor:"rgba(9, 10, 42, 0.56)",
                confine: true,
                enterable:true,
                textStyle:{
                    color:"#fff",
                    fontSize:fontSizeWidth(18),
                },
                position :'top',
            },
           
            series: [{
                type: 'graph',
                coordinateSystem:null,
                layout:opts.layout|| 'force',
                force: {
                    repulsion: 300,
                    edgeLength: 50,
                    ...opts.force
                },
                zoom:1,
                roam: true,
                autoCurveness:true,
                label: {
                    show: true,
                    position: 'inside',
                    formatter: '{b}',
                    fontSize: fontSizeWidth(14),
                    fontStyle: '600',
                },
                lineStyle:{
                    color:"transparent"
                },
                data: opts.data || [],
                links: opts.links ||[],
            }]
        }
        myChart.setOption(options)
    }
</script>
<style lang="scss" scope>
    .comm-chart{
        display:flex;
        align-items: center;
        justify-content: center;
        color: var(--el-text-color-secondary);
        font-size: 14px;
        .noData{
            margin-top:-10*$bs;
            display:flex;
            justify-content:center;
            flex-direction: column;
            align-items: center;
            img{
                width:70*$bs;
                height:70*$bs;
            }
            .noDataText{
                line-height:50*$bs;
                padding-left: 10*$bs;
                font-size:16*$bs;
            }
        }
    }
</style>