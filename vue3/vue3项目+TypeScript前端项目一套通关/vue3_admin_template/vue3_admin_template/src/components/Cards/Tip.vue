<template>
    <el-popover popper-class="cards-tip" trigger="hover" v-if="tip"  >
        <template #reference>
            <div class="help" :class="class">?</div>
        </template>
        <div :style="{
            width:tip.replace(/[^<br>]/gi,'').replace(/<br>/gi,1).length?'auto':(Math.ceil(Math.sqrt(tip.length)*1.45)+ 'em'),
            height:'auto',
            marginLeft:(Math.ceil(Math.sqrt(tip.length))*0.1)/2 + 'em',
            background:'rgba(0,0,0,0.6)',
            padding:`${fontSizeWidth(15)}px ${fontSizeWidth(10)}px ${fontSizeWidth(15)}px ${fontSizeWidth(10)}px`,
            borderRadius:'4px'
        }" v-html='tip'></div>
    </el-popover>
</template>
<script setup>
    import {fontSizeWidth} from "@/utils/rem"
    defineProps(["tip","class"])
</script>
