<template>
    <view class="page">
        <view class="header">
            商家注册<text class="status red">（注册中）</text>
        </view>
        <view class="form">
            <view class="item">
                <div class="item_label">商家名称</div>
                <input type="text" class="input" placeholder="请输入商家名称">
            </view>
            <!--由于编译原因根目录只能用div不能用view-->
            <FormItem label="行业类型" placeholder="请选择您的行业类型" @click="formItemHandler('worktype')"
                :iconClass="state.worktype.iconClass">
                {{ state.worktype.value }}
            </FormItem>
            <view class="item">
                <div class="item_label">联系人</div>
                <input type="text" class="input" placeholder="请输入门店联系人">
            </view>
            <view class="item">
                <div class="item_label">联系电话</div>
                <input type="text" class="input" placeholder="请输入门店联系人的手机号">
            </view>
            <FormItem label="门店地址" placeholder="请选择门店的省市区" @click="formItemHandler('address')"
                :iconClass="state.address.iconClass">
                {{ state.address.value }}
            </FormItem>
            <view class="item">
                <div class="item_label"></div>
                <input type="text" class="input" placeholder="请输入街道门牌号">
            </view>
            <up-button class="form_button" disabled>提交</up-button>
            <!--行业类型-->
            <Picker :showClass="state.worktype.pickerClass" :list="state.worktype.list" valueKey="name"
                :currentIndex="state.worktype.currentIndex" @confirm="pickerConfirm('worktype')"
                @cancel="pickerCancel('worktype')" @change="(e) => { pickerChange('worktype', e) }">
            </Picker>
            <!--门店地址-->
            <Picker :showClass="state.address.pickerClass" :list="state.address.list" valueKey="name"
                :currentIndex="state.address.currentIndex" @confirm="pickerConfirm('address')"
                @cancel="pickerCancel('address')" @change="(e) => { pickerChange('address', e) }">
            </Picker>
        </view>
    </view>
</template>

<script setup>
import { ref, inject, reactive, onMounted, nextTick } from 'vue'
import { country } from '@/pages/index/country'

const __pageData = inject('__pageData')
const { imgs } = __pageData;

//默认显示哪个省市区的索引数组  默认为0 北京市 
const defaultIndex = [0, 0];
//默认跳转到选择器对应的位置
const pickerIndex = [0, 0, 0]
//获取所有省份数组
const provinceArr = [];
for (let i = 0; i < country.length; i++) {
    provinceArr.push({
        name: country[i].name
    });
}
const addressPickerList = [provinceArr, ...setPickerList(defaultIndex)]
const state = reactive({
    worktype: {
        value: '',
        iconClass: '',
        pickerClass: '',
        list: [
            [{ name: '开挖掘机' }, { name: '自媒体' }, { name: '电竞选手' }, { name: '医生' }],
        ],
        //动态索引
        currentIndex: [0],
    },
    address: {
        value: '',
        iconClass: '',
        pickerClass: '',
        list: addressPickerList,
        currentIndex: pickerIndex,
    }
})

const pickerChange = (currentString, e) => {
    if (currentString === 'worktype') {
        const _object = state[currentString];
        _object.currentIndex = e;
    } else if (currentString === 'address') {
        //比对索引列，到底是哪列的改变 返回一个数字
        const oldIndexArr = state.address.currentIndex;
        const diffIndex = diffIndexArr(oldIndexArr, e);
        if (diffIndex == 2 || diffIndex == null) {
            state.address.currentIndex = e;
            return
        };
        let updateParamsList = [];
        updateParamsList = diffIndex == 0 ? [e[0], 0, 0] : [...e.slice(0, 2), 0];
        //如果是触发第2列的时候有一种情况,就是先触发第二列,再触发第一列,
        //这时候需要判断第一列的数组索引对应的数据长度和第二列的索引的对等关系
        // if (diffIndex == 1) {
        //     const cityLen = country[updateParamsList[0]].city.length - 1;
        //     if (cityLen < updateParamsList[1]) {
        //         updateParamsList[1] = 0;
        //         console.log('触发');
        //     }
        // }
        //重置picker索引，第一列改变的时候重置第二列和第三列   第二列改变的时候重置第三列
        state.address.currentIndex = updateParamsList;
        //改变picker数据
        const newList = [provinceArr, ...setPickerList(updateParamsList)];
        state.address.list = newList;
    }
}
function diffIndexArr(oldIndexArr, e) {
    for (let i = 0; i < e.length; i++) {
        if (oldIndexArr[i] !== e[i]) {
            return i;
        }
    }
    return null;
}

//表单项点击
const formItemHandler = (currentString) => {
    const _object = state[currentString];
    _object.pickerClass = 'inner';
    _object.iconClass = 'inner';
}
//picker确定事件
const pickerConfirm = (currentString) => {
    const _object = state[currentString];
    const index = _object.currentIndex;
    if (currentString === 'worktype') {
        const value = _object.list[0][index[0]].name;
        _object.value = value
    } else {
        const value = index.map((i, index) => {
            return _object.list[index][i]?.name || '';
        }).join(',').replace(/,+(?=$)/g, '');
        _object.value = value;
    }

    //关闭picker和转动图标
    _object.pickerClass = 'outer';
    _object.iconClass = 'outer';
}
//picker取消事件
const pickerCancel = (currentString) => {
    const _object = state[currentString];
    //关闭picker和转动图标
    _object.pickerClass = 'outer';
    _object.iconClass = 'outer';
}

function setPickerList(defaultIndex) {
    const provinceIndex = defaultIndex[0];
    const cityIndex = defaultIndex[1];

    //获取省份对应的市数组
    const __cityArr = country[provinceIndex].city;
    let cityArr = [];
    let districtArr = [];
    if (__cityArr.length == 0) {
        districtArr = cityArr = [{ name: '' }]
        return [cityArr, districtArr];
    }
    cityArr = country[provinceIndex].city

    //获取市对应的区数组
    const tempArr = cityArr[cityIndex].county;
    for (let i = 0; i < tempArr.length; i++) {
        districtArr.push({
            name: tempArr[i]
        })
    }
    return [cityArr, districtArr]


}


</script>
<style  lang="scss">
@import './merchants.scss';
</style>