<template>
    <view class="page">
        <view class="card">
            <image class="avatar" :src="imgs.img1"></image>
            <view class="card_info">
                <view class="shop_label">商户名称</view>
                <view class="shop_name">南昌花样年华</view>
            </view>
            <view class="register_satus red">入职中</view>
        </view>
        <view class="form">
            <view class="item">
                <div class="item_label">场所艺名</div>
                <input type="text" class="input" placeholder="请输入您的场所艺名">
            </view>
            <!--由于编译原因根目录只能用div不能用view-->
            <FormItem label="场所组别" placeholder="请选择您的组别" @click="(e) => { pickerTrigger('group', e) }"
                :iconClass="state.group.iconClass">
                <div>{{ state.group.value }}</div>
            </FormItem>
            <FormItem label="场所等级" placeholder="请选择您的场所等级" @click="(e) => { pickerTrigger('level', e) }"
                :iconClass="state.level.iconClass">
                <div>{{ state.level.value }}</div>
            </FormItem>
            <FormItem label="身份核验" placeholder="请您进行身份核验" @click="toCheckAuth"></FormItem>
            <FormItem label="人脸采集" placeholder="请您进行人脸采集" @click="toGetPortrait"></FormItem>
            <FormItem label="入职签名" placeholder="请您进行入职签名" @click="snameTrigger" :iconClass="state.sname.iconClass">
            </FormItem>
            <up-button class="form_button" disabled>提交</up-button>

        </view>
        <!--组别-->
        <Picker :showClass="state.group.pickerClass" :list="state.group.list" valueKey="name"
            :currentIndex="state.group.currentIndex" @confirm="(e) => { pickerConfirm('group', e) }"
            @cancel="(e) => { pickerCancel('group', e) }" @change="(e) => { pickerOnchange('group', e) }">
        </Picker>
        <!--等级-->
        <Picker :showClass="state.level.pickerClass" :list="state.level.list" valueKey="name"
            :currentIndex="state.level.currentIndex" @confirm="(e) => { pickerConfirm('level', e) }"
            @cancel="(e) => { pickerCancel('level', e) }" @change="(e) => { pickerOnchange('level', e) }">
        </Picker>
        <!--签名-->
        <Popup mode="bottom" :showClass="state.sname.moduleClass" @maskClick="snameMaskClick">
            <section class="writeName">
                <view class="writeName_header">
                    <view>
                        入职签名<text>(剩3次)</text>
                    </view>
                    <view class="writeName_header_right">
                        <view class="circle" :class="{ active: state.sname.checkedClass }" @click="
                            state.sname.checkedClass = !state.sname.checkedClass
                            ">
                            <u-icon name="checkmark" class="circle_icon"></u-icon>
                        </view>
                        严禁黄赌毒责任书
                    </view>
                </view>
                <canvas id="writeName" @touchstart="onTouchstart" @touchmove="onTouchmove" @touchend="onTouchend"></canvas>

                <view class="button_group">
                    <up-button class="clear" @click="clearCanvas">清除</up-button>
                    <up-button class="writeNameConfirm">确定</up-button>
                </view>
            </section>
        </Popup>

    </view>
</template>
<script setup>

import { ref, inject, reactive, onMounted } from 'vue'

const test = ref(false);
setTimeout(() => {
    test.value = true
}, 1000)



const __pageData = inject('__pageData')
const { imgs } = __pageData;
const state = reactive({
    //组别
    group: {
        pickerClass: '',
        iconClass: '',
        currentIndex: [0],
        value: '',
        list: [[{ name: '欢欢组' }, { name: '花样1组' }, { name: '欢欢2组' }, { name: '欢欢组' }, { name: '花样1组' }, { name: '欢欢2组' }]]
    },
    //等级
    level: {
        pickerClass: '',
        iconClass: '',
        currentIndex: [0],
        value: '',
        list: [[{ name: '1200' }, { name: '800' }, { name: '1500p' }, { name: '1000' }]]
    },
    //签名
    sname: {
        moduleClass: '',
        iconClass: '',
        checkedClass: false,
        value: '',
        canvas: null,
    }
})
onMounted(() => {
    state.sname.canvas = document.querySelector("#writeName canvas")
})

//交互
const pickerOnchange = (currentString, e) => {
    const __object = state[currentString];
    __object.currentIndex = e;
}
const pickerCancel = (currentString) => {
    const __object = state[currentString];
    //关闭picker和转动图标 
    __object.pickerClass = 'outer';
    __object.iconClass = 'outer';
}
const pickerConfirm = (currentString) => {
    const __object = state[currentString];
    const index = __object.currentIndex;
    const value = __object.list[0][index].name;
    __object.value = value;
    //关闭picker和转动图标
    __object.pickerClass = 'outer';
    __object.iconClass = 'outer';
}
const pickerTrigger = (currentString) => {
    const __object = state[currentString];
    //打开picker和转动图标
    __object.pickerClass = 'inner';
    __object.iconClass = 'inner';
}


//跳转身份核验
const toCheckAuth = () => {
    console.log('跳转身份');
}
//跳转获取人像
const toGetPortrait = () => {
    console.log('跳转人像');
}
//签名
const snameTrigger = () => {
    state.sname.moduleClass = 'inner';
    state.sname.iconClass = 'inner';
}
const snameMaskClick = () => {
    state.sname.moduleClass = 'outer'
    state.sname.iconClass = 'outer';
}
//画布操作
function onTouchstart(e) {
    const ctx = state.sname.canvas.getContext("2d");
    const x = e.touches[0].x;
    const y = e.touches[0].y;
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.moveTo(x, y);
}
function onTouchmove(e) {
    const ctx = state.sname.canvas.getContext("2d");
    const x = e.touches[0].x;
    const y = e.touches[0].y;
    ctx.lineTo(x, y);
    ctx.stroke();
}
function onTouchend(e) {
    const ctx = state.sname.canvas.getContext("2d");
    ctx.closePath();
}
//清空画布
function clearCanvas() {
    const canvas = state.sname.canvas;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
</script>
<style lang="scss">
@import './resources.scss';
</style>