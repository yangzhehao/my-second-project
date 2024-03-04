<template>
    <Popup :showClass="showClass" mode="bottom">
        <view class="picker_body">
            <picker-view indicator-style="height:100rpx;" :immediate-change="true" @change="pickerOnchange"
                class="picker-view" :value="currentIndex">
                <picker-view-column v-for="(item, index) in list" :key="index">
                    <view class="picker-view-item" v-for="(itemList, itenmindex) in item" :key="itenmindex"> {{
        itemList[valueKey]
    }}
                    </view>
                </picker-view-column>
            </picker-view>
            <view class="picker_footer">
                <u-button class="btn cancel" @click="pickerCancel">取消</u-button>
                <u-button class="btn confirm" @click="pickerConfirm">确定</u-button>
            </view>
        </view>
    </Popup>
</template>

<script setup>
import { ref, watch } from 'vue';
import { debounce } from '@/utils/common'
const props = defineProps({
    list: {
        type: Array,
        default: []
    },
    //当前定位第几个
    currentIndex: {
        type: Array,
        default: [0]
    },
    //将对象中的哪个属性作为picker的值
    valueKey: {
        type: String,
        default: 'id'
    },
    showClass: {
        type: String,
        default: ''
    }
})

const emits = defineEmits(['change', 'confirm', 'cancel'])
//点击过快BUG
let isClick = false;
let tempIndexArr = [...props.currentIndex];
let timer = Date.now();
function pickerOnchange(e) {
    if (props.list.length > 1 && Date.now() - timer < 300) {
        //多列的情况下滑动太频繁了
        emits('change', [...tempIndexArr]);
        timer = Date.now();
        return;
    }
    timer = Date.now();
    //如果提前点击了确定
    if (isClick) {
        emits('change', [...tempIndexArr]);
        return;
    }
    emits('change', e.detail.value)
    tempIndexArr = e.detail.value;
}

const pickerCancel = (e) => (emits('cancel', e))
const pickerConfirm = (e) => {
    isClick = true
    setTimeout(() => {
        isClick = false
    }, 500)
    emits('confirm', e)

}


</script>

<style lang="scss">
@import './picker.scss';
</style>