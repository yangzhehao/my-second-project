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
                <div class="item_label">员工姓名</div>
                <input type="text" class="input" placeholder="请输入您的真实姓名">
            </view>
            <!--由于编译原因根目录只能用div不能用view-->
            <FormItem label="员工部门" placeholder="请选择您的部门" @click="formItemHandler('department')"
                :iconClass="state.department.iconClass">
                {{ state.department.value }}
            </FormItem>
            <FormItem label="部门角色" placeholder="请选择您的部门角色" @click="formItemHandler('role')"
                :iconClass="state.role.iconClass">
                {{ state.role.value }}
            </FormItem>

            <!--员工部门-->
            <Picker :showClass="state.department.pickerClass" :list="state.department.list" valueKey="name"
                :currentIndex="state.department.currentIndex" @confirm="pickerConfirm('department')"
                @cancel="pickerCancel('department')" @change="((e) => { pickerChange('department', e) })">
            </Picker>
            <!--部门角色-->
            <Picker :showClass="state.role.pickerClass" :list="state.role.list" valueKey="name"
                :currentIndex="state.role.currentIndex" @confirm="pickerConfirm('role')" @cancel="pickerCancel('role')"
                @change="((e) => { pickerChange('role', e) })">
            </Picker>



            <up-button class="form_button" disabled>提交</up-button>

        </view>
    </view>
</template>

<script setup>
import { ref, inject, reactive, onMounted } from 'vue'
const __pageData = inject('__pageData')
const { imgs } = __pageData;

const state = reactive({
    department: {
        value: '',
        iconClass: '',
        pickerClass: '',
        list: [[{ name: '营销部' }, { name: '运营部' }, { name: '研发一部' }, { name: '剪辑组' }]],
        currentIndex: [0],
    },
    role: {
        value: '',
        iconClass: '',
        pickerClass: '',
        list: [[{ name: '扫地' }, { name: '倒水' }, { name: '做饭' }]],
        currentIndex: [0],
    }
})


const pickerChange = (currentString, e) => {
    const _object = state[currentString];
    _object.currentIndex = e;

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
    const index = _object.currentIndex[0]
    const value = _object.list[0][index].name;
    _object.value = value;
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

</script>
<style  lang="scss">
@import './employees.scss';
</style>